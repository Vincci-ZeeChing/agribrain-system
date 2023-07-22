import React, { useEffect, useState } from 'react';

const Report = () => {
    const [selectedMonth, setSelectedMonth] = useState(''); // Default value for May
    const [selectedYear, setSelectedYear] = useState(''); // Default value for 2023


    const reports = [
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
    ];

    const otherReports = [
        {
            id: 1,
            list: 'Crop Management',
            apiEndpoint: 'http://localhost:5000/api/v1/cropManagementReportOtherMonth',
            filename: 'cropManagementReport.pdf',
        },
        {
            id: 2,
            list: 'Farming Record',
            apiEndpoint: 'http://localhost:5000/api/v1/farmingReportOtherMonth',
            filename: 'farmingReport.pdf',
        },

    ]

    const handleDownload = async (apiEndpoint, filename) => {
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

    const [currentMonth, setCurrentMonth] = React.useState(new Date().toLocaleString('en-US', { month: 'long' }));

    // const handleDownloadOtherMonth = () => {
    //     if (!selectedMonth || !selectedYear) {
    //         alert('Please select a month and year before downloading the report.');
    //         return;
    //     }
    //
    //     try {
    //         // Construct the API endpoint with the selected month and year as query parameters
    //         const apiEndpoint = `http://localhost:5000/api/v1/cropManagementReportOtherMonth?year=${selectedYear}&month=${selectedMonth}`;
    //
    //         // Make a request to the specific API endpoint to initiate the download
    //         fetch(apiEndpoint)
    //             .then((response) => response.blob())
    //             .then((blob) => {
    //                 // Create a URL for the downloaded file
    //                 const url = URL.createObjectURL(blob);
    //
    //                 // Create a temporary link and click it to trigger the download
    //                 const link = document.createElement('a');
    //                 link.href = url;
    //                 link.download = `cropManagementReport_${selectedMonth}_${selectedYear}.pdf`;
    //                 link.click();
    //
    //                 // Clean up the URL object
    //                 URL.revokeObjectURL(url);
    //             })
    //             .catch((error) => {
    //                 console.error('Error downloading report:', error);
    //             });
    //     } catch (error) {
    //         console.error('Error downloading report:', error);
    //     }
    // };

    const handleDownloadOtherMonth = (reportType) => {
        if (!selectedMonth || !selectedYear) {
            alert('Please select a month and year before downloading the report.');
            return;
        }

        try {
            // Find the report details based on the reportType
            const selectedReport = otherReports.find((report) => report.list === reportType);

            if (!selectedReport) {
                console.error('Invalid report type:', reportType);
                return;
            }

            // Construct the API endpoint with the selected month and year as query parameters
            const apiEndpoint = `${selectedReport.apiEndpoint}?year=${selectedYear}&month=${selectedMonth}`;

            // Make a request to the specific API endpoint to initiate the download
            fetch(apiEndpoint)
                .then((response) => response.blob())
                .then((blob) => {
                    // Create a URL for the downloaded file
                    const url = URL.createObjectURL(blob);

                    // Create a temporary link and click it to trigger the download
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${selectedReport.filename}_${selectedMonth}_${selectedYear}.pdf`;
                    link.click();

                    // Clean up the URL object
                    URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error('Error downloading report:', error);
                });
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };




    return (
        <div>
            <h1 className="title">Report</h1>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <div className="subtitle is-underlined">{currentMonth} Report</div>
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
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td className="has-text-centered">{report.id}</td>
                                <td className="has-text-centered">{report.list}</td>
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
                                        onClick={() => handleDownload(report.apiEndpoint, report.filename)}
                                    // Call handleDownload with the specific API endpoint when clicked
                                    >
                                        Download
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <div className="subtitle is-underlined">Other Month Reports</div>
                <form style={{ display: 'flex', alignContent: 'center', justifyContent: 'left' }}>
                    <div className="field m-2">
                        <label className="label">Select Month</label>
                        <div className="control">
                            <div className="select">
                                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    <option value="">Select Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field m-2">
                        <label className="label">Select Year</label>
                        <div className="control">
                            <div className="select">
                                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                    <option value="">Select Month</option>
                                    <option value="2023">2023</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
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
                        {otherReports.map((report) => (
                            <tr key={report.id}>
                                <td className="has-text-centered">{report.id}</td>
                                <td className="has-text-centered">{report.list}</td>
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
                                        onClick={() => handleDownloadOtherMonth(report.list)}
                                    // Pass the report type as a parameter to the handleDownloadOtherMonth function
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
