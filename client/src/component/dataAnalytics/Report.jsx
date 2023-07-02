import React from 'react';

const Report = () => {
    const reports = [
        { id: 1, list: 'Crop' },
        { id: 2, list: 'Crop Management' },
        { id: 3, list: 'Farming' },
        { id: 4, list: 'User' }
    ];

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
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td className="has-text-centered">{report.id}</td>
                            <td className="has-text-centered">{report.list}</td>
                            <td className="has-text-centered">
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        color: '#000000'
                                }}
                                    onMouseOver={(e) => {
                                        e.target.style.color = '#ff0000';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.color = '#000000';
                                    }}
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
