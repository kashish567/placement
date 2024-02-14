import React, { useState, useEffect } from 'react';
import './dash.css';

function CompanyJobRolesPage() {
  const [companies, setCompanies] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8000/companies');
        const data = await response.json();
        console.log("Company Data:", data);
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchJobRoles = async () => {
      try {
        const response = await fetch('http://localhost:8000/job-roles');
        const data = await response.json();
        setJobRoles(data);
      } catch (error) {
        console.error('Failed to fetch job roles:', error);
      }
    };

    fetchCompanies();
    fetchJobRoles();
  }, []);

  const handleCompanySelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCompanies(selectedOptions);
  };

  const getJobRolesForCompany = (companyName) => {
    return jobRoles.filter(jobRole => jobRole.company === companyName);
  };

  const handleSubmit = () => {
    // Handle submission of selected companies
    console.log("Selected Companies:", selectedCompanies);
  };

  return (
    <div>
      <h1>Companies and Job Roles</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Description</th>
            <th>Job Role Title</th>
            <th>Job Role Description</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.description}</td>
              {getJobRolesForCompany(company.name).map(jobRole => (
                <React.Fragment key={jobRole.title}>
                  <td>{jobRole.title}</td>
                  <td>{jobRole.description}</td>
                </React.Fragment>
              ))}
              <td colSpan={jobRoles.length === 0 ? 2 : 0}></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Selected Companies</h2>
      <select multiple onChange={handleCompanySelection}>
        {companies.map(company => (
          <option key={company._id} value={company.name}>{company.name}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>Apply</button>
    </div>
  );
}

export default CompanyJobRolesPage;
