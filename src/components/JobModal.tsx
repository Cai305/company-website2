import React from 'react';
import { X, MapPin, DollarSign, Briefcase, Clock, CheckCircle, Award } from 'lucide-react';
import { Job } from '../types';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
  isJobSaved: boolean;
  isJobApplied: boolean;
}

export const JobModal: React.FC<JobModalProps> = ({ 
  job, 
  isOpen, 
  onClose, 
  onApply, 
  onSave, 
  isJobSaved, 
  isJobApplied 
}) => {
  if (!isOpen || !job) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              {job.companyLogo}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600 text-lg">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{job.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{job.salary}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{job.experience} • {job.category}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Posted {job.posted}</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                {job.type}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Benefits
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onApply(job.id)}
              disabled={isJobApplied}
              className={`flex-1 py-3 px-6 rounded-lg transition-colors duration-200 font-medium ${
                isJobApplied 
                  ? 'bg-green-600 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isJobApplied ? 'Applied ✓' : 'Apply Now'}
            </button>
            <button 
              onClick={() => onSave(job.id)}
              className={`flex-1 border py-3 px-6 rounded-lg transition-colors duration-200 font-medium ${
                isJobSaved
                  ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isJobSaved ? 'Saved ❤️' : 'Save Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};