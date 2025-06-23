import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center mb-6">
          <Briefcase className="w-12 h-12 mr-4" />
          <h1 className="text-4xl font-bold">JobBoard Pro</h1>
        </div>
        <div className="text-center">
          <p className="text-xl mb-4 opacity-90">
            Discover Your Next Career Opportunity
          </p>
          <div className="flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>500+ Active Jobs</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              <span>Top Companies</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};