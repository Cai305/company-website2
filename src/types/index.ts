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

export type RawJob = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  responsibilities: string;
  postedDate: string;
  applicationDeadline: string;
  contactEmail: string;
  applicationLink: string;
  experienceLevel: string;
  remote: boolean;
  benefits: string;
  tags: string[];
  // Optional fields
  companyLogo?: string;
  posted?: string;
  category?: string;
  experience?: string;
};

