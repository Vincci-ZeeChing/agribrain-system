import React from 'react';

const Report = () => {
    const crops = [
        {
            id: 1,
            list: 'Crop',
            apiEndpoint: 'http://localhost:5000/api/v1/cropReport',
            filename: 'cropReport.pdf',
        },
        {
            id: 2,
            list: 'Crop Management',
            apiEndpoint: 'http://localhost:5000/api/v1/cropManagementReport',
            filename: 'cropManagementReport.pdf',
        },
        {
            id: 3,
            list: 'Farming Record',
            apiEndpoint: 'http://localhost:5000/api/v1/farmingReport',
            filename: 'farmingReport.pdf',
        },
        // Add more crop data here...
    ];

    const handleDownload = async (apiEndpoint,filename) => {
        try {
            // Make a request to the specific API endpoint to initiate the download
            const response = await fetch(apiEndpoint);
            const blob = await response.blob();

            // Create a URL for the downloaded file
            const url = URL.createObjectURL(blob);

            // Create a temporary link and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();

            // Clean up the URL object
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    return (
        <div>
            <h1 className="title">Report</h1>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <table className="table is-hoverable is-fullwidth is-small">
                    <thead className="is-bordered">
                    <tr>
                        <th className="has-text-centered" style={{ width: '10%' }}>
                            No
                        </th>
                        <th className="has-text-centered" style={{ width: '50%' }}>
                            List
                        </th>
                        <th className="has-text-centered" style={{ width: '40%' }}>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {crops.map((crop) => (
                        <tr key={crop.id}>
                            <td className="has-text-centered">{crop.id}</td>
                            <td className="has-text-centered">{crop.list}</td>
                            <td className="has-text-centered">
                  <span
                      style={{
                          cursor: 'pointer',
                          color: '#000000',
                      }}
                      onMouseOver={(e) => {
                          e.target.style.color = '#ff0000';
                      }}
                      onMouseOut={(e) => {
                          e.target.style.color = '#000000';
                      }}
                      onClick={() => handleDownload(crop.apiEndpoint, crop.filename)}
                      // Call handleDownload with the specific API endpoint when clicked
                  >
                    Download
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;
