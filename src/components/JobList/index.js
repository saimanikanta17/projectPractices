import React, { useState } from 'react';
import "./index.css"
import { BsPinMap, BsCalendar, BsBookmark, BsBookmarkFill, BsSearch, BsSortAlphaDown, BsSortAlphaDownAlt, BsChevronExpand, BsChevronContract, BsFilter } from 'react-icons/bs';
const jobData = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    datePosted: '2023-09-20',
    employmentType: 'Full-time',
    saved: false
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Solutions Ltd.',
    location: 'New York, NY',
    datePosted: '2023-10-05',
    employmentType: 'Contract',
    saved: true
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'CodeCrafters Inc.',
    location: 'Austin, TX',
    datePosted: '2023-10-10',
    employmentType: 'Full-time',
    saved: false
  },
  {
    id: 4,
    title: 'Project Manager',
    company: 'InnovateNow',
    location: 'Chicago, IL',
    datePosted: '2023-10-15',
    employmentType: 'Part-time',
    saved: false
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Datawise',
    location: 'Boston, MA',
    datePosted: '2023-10-20',
    employmentType: 'Contract',
    saved: false
  }
];


const faqsData = [
  {
    question: 'How do I apply to a job?',
    answer: 'Click on the apply now button and follow the instructions on the company website.'
  },
  {
    question: 'How do I create an account?',
    answer: 'Go to the sign-up page and follow the instructions to create an account.'
  },
  {
    question: 'Can I manage my profile?',
    answer: 'Yes, once logged in, you can manage your profile through the dashboard.'
  }
];

function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='border-b-2 last:border-none py-4'>
      <button className='flex justify-between items-center w-full text-left' onClick={() => setIsOpen(!isOpen)}>
        <span className='font-semibold text-lg'>{question}</span>
        {isOpen ? <BsChevronContract className='text-lg' /> : <BsChevronExpand className='text-lg' />}
      </button>
      {isOpen && <div className='mt-2'>{answer}</div>}
    </div>
  );
}

function FAQSection() {
  return (
    <div className='my-12'>
      <h2 className='text-2xl font-bold mb-6'>Frequently Asked Questions</h2>
      {faqsData.map((faq, index) => (
        <FAQ key={index} {...faq} />
      ))}
    </div>
  );
}

function JobList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [filterType, setFilterType] = useState('All');

  const sortJobs = () => {
    jobData.sort((a, b) => {
      const jobA = a.title.toUpperCase();
      const jobB = b.title.toUpperCase();
      if (jobA < jobB) {
        return sortAscending ? -1 : 1;
      }
      if (jobA > jobB) {
        return sortAscending ? 1 : -1;
      }
      return 0;
    });
    setSortAscending(!sortAscending);
  };

  return (
    <div className='p-4 bg-gray-800 text-white'>
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex items-center bg-gray-700 shadow rounded-lg p-2'>
          <BsSearch className='text-gray-400 mr-2' />
          <input
            className='w-full text-sm text-white placeholder-gray-500 border-none focus:ring-0 bg-gray-700 '
            type='text'
            placeholder='Search for jobs...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex'>
          <button className='mx-1 text-gray-400 hover:text-gray-200 focus:outline-none' onClick={sortJobs}>
            {sortAscending ? <BsSortAlphaDownAlt /> : <BsSortAlphaDown />}
          </button>
          <button className='mx-1 text-gray-400 hover:text-gray-200 focus:outline-none' onClick={() => setFilterType(filterType === 'All' ? 'Full-time' : 'All')}>
            <BsFilter />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobData.filter(job => (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase())) && (filterType === 'All' || job.employmentType === filterType)).map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <FAQSection/>
    </div>
  );
}

function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(job.saved);
  return (
    <div className='border border-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out bg-gray-700'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='font-bold text-xl mb-2'>{job.title}</h3>
          <p className='text-gray-300'>{job.company}</p>
          <div className='flex items-center text-gray-500 text-sm my-2'>
            <BsPinMap className='mr-2' />
            <span>{job.location}</span>
          </div>
          <div className='flex items-center text-sm text-gray-500'>
            <BsCalendar className='mr-2' />
            <span>Posted on {job.datePosted}</span>
          </div>
        </div>
        <button onClick={() => setIsSaved(!isSaved)} className='text-xl'>
          {isSaved ? <BsBookmarkFill className='text-blue-400' /> : <BsBookmark className='text-gray-500' />}
        </button>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <span className='bg-blue-900 text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded'>{job.employmentType}</span>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobList;