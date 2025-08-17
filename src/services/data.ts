import { Job } from '../types';

const API_URL = 'https://shop-x0zr.onrender.com/api/jobs';

/**
 * Fetches job listings from the backend API.
 * @returns A promise that resolves to a list of Job items.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchJobs(p0: {
    max_age: number; exclude_expired: string; page_size //localhost:1337/api/jobs';
      : number;
  }): Promise<Job[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch jobs`);
    }

    const result = await response.json();

    // Assuming Strapi-style response structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobs: Job[] = result.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      company: item.attributes.company,
      companyLogo: item.attributes.companyLogo,
      location: item.attributes.location,
      type: item.attributes.type,
      salary: item.attributes.salary,
      description: item.attributes.description,
      requirements: item.attributes.requirements,
      benefits: item.attributes.benefits,
      posted: item.attributes.posted,
      category: item.attributes.category,
      experience: item.attributes.experience,
    }));

    return jobs;
  } catch (error) {
    console.error('fetchJobs failed:', error);
    return [];
  }
}
