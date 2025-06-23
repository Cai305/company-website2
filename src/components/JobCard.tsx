import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800';
      case 'Part-time': return 'bg-blue-100 text-blue-800';
      case 'Contract': return 'bg-purple-100 text-purple-800';
      case 'Remote': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={() => onClick(job)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              {job.companyLogo}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
            {job.type}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{job.experience} • {job.category}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{job.posted}</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};