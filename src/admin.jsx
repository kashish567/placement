import React, { useState } from 'react';
import './AdminPanel.css';

// Define getJobRolesForCompany function
const getJobRolesForCompany = (jobRoles, companyName) => {
  return jobRoles.filter(jobRole => jobRole.company.name === companyName);
};

function AdminPanel() {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleCompanySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/admin/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: companyName, description: companyDescription })
      });

      if (!response.ok) {
        throw new Error('Failed to add company');
      }

      alert('Company added successfully');
      console.log(response);
      setCompanyName('');
      setCompanyDescription('');
    } catch (error) {
      console.error(error);
      alert('Failed to add company');
    }
  };

  const handleJobRoleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/admin/job-roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: jobTitle, description: jobDescription })
      });

      if (!response.ok) {
        throw new Error('Failed to add job role');
      }

      alert('Job role added successfully');
      setJobTitle('');
      setJobDescription('');
    } catch (error) {
      console.error(error);
      alert('Failed to add job role');
    }
  };

  return (
    <div className="admin-panel">
      <div className="company-container">
        <h1>Add Company</h1>
        <form onSubmit={handleCompanySubmit}>
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          <label htmlFor="companyDescription">Description:</label>
          <textarea id="companyDescription" name="companyDescription" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}></textarea>
          <button type="submit">Add Company</button>
        </form>
      </div>

      <div className="job-role-container">
        <h1>Add Job Role</h1>
        <form onSubmit={handleJobRoleSubmit}>
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          <label htmlFor="jobDescription">Description:</label>
          <textarea id="jobDescription" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
          <button type="submit">Add Job Role</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
