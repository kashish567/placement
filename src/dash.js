import React, { useState, useEffect } from 'react';
import './dash.css';

function CompanyJobRolesPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [notification, setNotification] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Assuming you have access to the user's email

  useEffect(() => {
    const fetchCompaniesAndJobRoles = async () => {
      try {
        const companiesResponse = await fetch('http://localhost:8000/companies');
        const companiesData = await companiesResponse.json();
        console.log("Company Data:", companiesData);
        setCompanies(companiesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchCompaniesAndJobRoles();
  }, []);

  const toggleCompanySelection = (companyName) => {
    if (selectedCompanies.includes(companyName)) {
      setSelectedCompanies(selectedCompanies.filter(company => company !== companyName));
    } else {
      setSelectedCompanies([...selectedCompanies, companyName]);
    }
  };

  const handleSubmit = async () => {
    if (selectedCompanies.length === 0) {
      alert('Please select at least one company.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail, companies: selectedCompanies })
      });
      
      if (response.ok) {
        alert('Applied successfully!');
      } else {
        alert('Failed to apply. Please try again.');
      }
    } catch (error) {
      console.error('Error applying:', error);
      alert('Failed to apply. Please try again.');
    }
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
              <td>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.name)}
                  onChange={() => toggleCompanySelection(company.name)}
                />
                {company.name}
              </td>
              <td>{company.description}</td>
              <td>
                {company.jobRoles.map(jobRole => (
                  <div key={jobRole._id}>
                    <p><strong>{jobRole.title}</strong></p>
                  </div>
                ))}
              </td>
              <td>
                {company.jobRoles.map(jobRole => (
                  <div key={jobRole._id}>
                    <p>{jobRole.description}</p>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>Apply</button>
      {notification && <p>{notification}</p>}
    </div>
  );
}

export default CompanyJobRolesPage;
