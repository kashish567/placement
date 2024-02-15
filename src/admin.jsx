import React, { useState } from 'react';
import './AdminPanel.css';

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
        body: JSON.stringify({ name: companyName, description: companyDescription, jobRoles: [{ title: jobTitle, description: jobDescription }] })
      });

      if (!response.ok) {
        throw new Error('Failed to add company');
      }

      alert('Company added successfully');
      console.log(response);
      setCompanyName('');
      setCompanyDescription('');
      setJobTitle('');
      setJobDescription('');
    } catch (error) {
      console.error(error);
      alert('Failed to add company');
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
          
          {/* Job Role Inputs */}
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          <label htmlFor="jobDescription">Description:</label>
          <textarea id="jobDescription" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
          
          <button type="submit">Add Company</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
