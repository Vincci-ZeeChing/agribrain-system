import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CropManagementList = () => {
    const [cropManagement, setCropManagement] = useState([]);
    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const getCropsManagement = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/cropManagement");
            setCropManagement(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCropsManagement();
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const filteredCropManagement = cropManagement.filter(crop =>
        crop.CROP_T.crop_name.toLowerCase().includes(filter.toLowerCase()) &&
        (startDate && endDate
            ? new Date(crop.c_management_date) >= startDate && new Date(crop.c_management_date) <= new Date(endDate.getTime() + 86399999)
            : true)
    );

    return (
        <div>
            <h1 className="title">Crop Management</h1>

            <Link
                to="/precision-farming/crop-management/add"
                className="button mb-2"
                style={{ backgroundColor: '#71AF9D', color: 'white' }}
            >
                Add New
            </Link>

            <div className="field is-grouped mt-5">
                <div className="control">
                    <label className="label">Filter by Crop</label>
                    <div className="control has-icons-left">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Enter crop name"
                            value={filter}
                            onChange={handleFilterChange}
                            style={{ minWidth: "20vw", maxWidth: "25vw" }}
                        />
                        <span className="icon is-small is-left">
                            <FaFilter className="filter-icon" />
                        </span>
                    </div>
                </div>

                <div className="control ml-3">
                    <label className="label">Filter by Date Range</label>
                    <div className="control has-icons-left is-flex">
                        <DatePicker
                            className="input is-rounded"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Start Date"
                            style={{ minWidth: "20vw", maxWidth: "25vw" }}
                        />
                        <span className="icon is-small is-left">
                            <FaFilter className="filter-icon" />
                        </span>
                        <DatePicker
                            className="input is-rounded"
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="End Date"
                            style={{ minWidth: "20vw", maxWidth: "25vw" }}
                        />
                    </div>
                </div>
            </div>

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
                {filteredCropManagement.length > 0 ? (
                    <tbody>
                    {filteredCropManagement.map((crop, index) => (
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
                                        to={`/precision-farming/crop-management/edit/${crop.c_management_uuid}`}
                                        className="is-small is-info mr-3"
                                    >
                                        <span className="is-underlined">Edit</span>
                                    </Link>
                                    <span className="is-hoverable is-small delete-text">
                                            <span className="is-underlined" style={{ color: "red" }}>
                                                Delete
                                            </span>
                                        </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                ) : (
                    <tbody>
                    <tr>
                        <td colSpan="9">No data found.</td>
                    </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default CropManagementList;
