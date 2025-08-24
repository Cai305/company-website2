/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CompanyFilter } from './components/CompanyFilter';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { Job, RawJob } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://shop-x0zr.onrender.com/";
  const JOBS_ENDPOINT = "api/jobs";
  const API_TOKEN = "YOUR_STRAPI_API_TOKEN"; // Replace with your actual token

  // Fetch jobs from Strapi API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
       `${API_URL}${JOBS_ENDPOINT}`,
          // {
          //   // headers: {
          //   //   'Authorization': `Bearer ${API_TOKEN}`,
          //   //   'Content-Type': 'application/json'
          //   // }
          // }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { data } = await response.json();
        

        console.log(data)
        // Transform Strapi response to match Job type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        const transformedJobs: Job[] = data.map((item: RawJob) => ({
            id: item.id,
            title: item.title,
            company: item.company,
            companyLogo: '🚀',
            location: item.location,
            type: item.type,
            salary: item.salary,
            description: item.description,
            requirements: item.requirements ? item.requirements.split(',').map(req => req.trim()) : [],
            benefits: item.benefits ? item.benefits.split(',').map(benefit => benefit.trim()) : [],
            posted: item.postedDate,
            category: 'General',
            experience: item.experienceLevel,
        }));

        
        setJobs(transformedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCompany = selectedCompany === '' || job.company === selectedCompany;
      
      return matchesSearch && matchesCompany;
    });
  }, [jobs, searchTerm, selectedCompany]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Get unique companies for filter dropdown
  const companies = useMemo(() => {
    return [...new Set(jobs.map(job => job.company))].sort();
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <CompanyFilter 
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading job opportunities</h3>
            <p className="text-gray-600">Please wait while we fetch the latest listings</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="text-gray-600">
                {selectedCompany && `Showing jobs from ${selectedCompany}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onClick={handleJobClick}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all available positions.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <JobModal 
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;