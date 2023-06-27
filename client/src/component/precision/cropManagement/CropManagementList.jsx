import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const CropManagementList = () => {

    const [cropManagement, setCropManagement] = useState([]);
    const getCropsManagement = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/cropManagement");
        setCropManagement(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getCropsManagement();
    }, []);


    return (
        <div>
            <h1 className="title">Crop Management</h1>

            <Link
                to="/precision-farming/crop-management"
                className="button mb-2"
                style={{backgroundColor: '#71AF9D', color: 'white'}}
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
                        <th className="has-text-centered">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {cropManagement.map((crop, index) => (
                    <tr key={crop.c_management_uuid}>
                        <td className="has-text-centered">{index + 1}</td>
                        <td className="has-text-centered">{crop.c_management_date}</td>
                        <td className="has-text-centered">{crop.CROP_T.crop_name}</td>
                        <td className="has-text-centered">{crop.c_management_harvest}</td>
                        <td className="has-text-centered">{crop.c_management_stored}</td>
                        <td className="has-text-centered">{crop.c_management_sold}</td>
                        <td className="has-text-centered">{crop.c_management_price}</td>
                        <td className="has-text-centered">{crop.USER_T.user_fullname}</td>
                        <td>
                            <div className="has-text-centered">
                                <Link
                                    to={`/precision-farming/crop-management${crop.crop_uuid}`}
                                    className="is-small is-info mr-3"
                                >
                                    <span className="is-underlined">Edit</span>
                                </Link>
                                <span className="is-hoverable is-small  delete-text">
                                    <span className="is-underlined" style={{color: "red"}}>
                                        Delete
                                    </span>
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>


        </div>
    );
};

export default CropManagementList;
