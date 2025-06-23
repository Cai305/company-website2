export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  category: string;
  experience: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  description: string;
}