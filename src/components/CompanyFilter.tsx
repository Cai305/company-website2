import React from 'react';
import { Building2 } from 'lucide-react';
import { companies } from '../data/companies';

interface CompanyFilterProps {
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
}

export const CompanyFilter: React.FC<CompanyFilterProps> = ({ selectedCompany, onCompanyChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <Building2 className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filter by Company</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCompanyChange('')}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            selectedCompany === ''
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Companies
        </button>
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => onCompanyChange(company.name)}
            className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 ${
              selectedCompany === company.name
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{company.logo}</span>
            <span>{company.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};