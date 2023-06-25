import React from 'react';
import {Link} from "react-router-dom";

const CropManagementList = () => {
    return (
        <div>
            <h1 className="title">Crop Management</h1>

            <Link
                to="/precision-farming/crop-management"
                className="button mb-2"
                style={{ backgroundColor: '#71AF9D', color: 'white' }}
            >
                Add New
            </Link>

            <table className="table is-bordered is-hoverable is-fullwidth mt-3">
                <thead>
                    <tr style={{ backgroundColor: '#E1F6F0' }}>
                        <th className="has-text-centered">No</th>
                        <th className="has-text-centered">Date</th>
                        <th className="has-text-centered">Crop Name</th>
                        <th className="has-text-centered">Harvest (kg)</th>
                        <th className="has-text-centered">Stored (kg)</th>
                        <th className="has-text-centered">Sold (kg)</th>
                        <th className="has-text-centered">Price (RM)</th>
                        <th className="has-text-centered">Created By</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="has-text-centered">1</td>
                        <td className="has-text-centered">2021-08-01</td>
                        <td className="has-text-centered">Paddy</td>
                        <td className="has-text-centered">100</td>
                        <td className="has-text-centered">-</td>
                        <td className="has-text-centered">100</td>
                        <td className="has-text-centered">100</td>
                        <td className="has-text-centered">Farmer 1</td>

                    </tr>
                </tbody>

            </table>


        </div>
    );
};

export default CropManagementList;
