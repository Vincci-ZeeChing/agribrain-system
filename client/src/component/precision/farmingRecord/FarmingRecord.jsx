import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';

const FarmingRecord = () => {
    // const [farming, setFarming] = useState([]);
    // const [filterText, setFilterText] = useState('');
    // const [filterUser, setFilterUser] = useState('');
    // const [filteredFarming, setFilteredFarming] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [recordsPerPage] = useState(5);
    //
    // useEffect(() => {
    //     getFarming();
    // }, []);
    //
    // const getFarming = async () => {
    //     const response = await axios.get("http://localhost:5000/api/v1/farming");
    //     const sortedFarming = response.data.sort((a, b) =>
    //         a.farming_date > b.farming_date ? -1 : 1
    //     );
    //     setFarming(sortedFarming);
    // };
    //
    // useEffect(() => {
    //     filterFarming();
    // }, [farming, filterText, filterUser]);
    //
    // const filterFarming = () => {
    //     const filtered = farming.filter((record) => {
    //         const farmingNameMatch =
    //             filterText.toLowerCase() === 'others'
    //                 ? record.farming_name.toLowerCase() !== 'fertiliser' &&
    //                 record.farming_name.toLowerCase() !== 'irrigation' &&
    //                 record.farming_name.toLowerCase() !== 'sowing seeds' &&
    //                 record.farming_name.toLowerCase() !== 'harvest'
    //                 : record.farming_name.toLowerCase().includes(filterText.toLowerCase());
    //
    //         const userNameMatch = record.USER_T.user_fullname
    //             .toLowerCase()
    //             .includes(filterUser.toLowerCase());
    //
    //         return farmingNameMatch && userNameMatch;
    //     });
    //     setFilteredFarming(filtered);
    // };
    //
    // const handleFilterChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'filterText') {
    //         setFilterText(value);
    //     } else if (name === 'filterUser') {
    //         setFilterUser(value);
    //     }
    // };
    //
    // const indexOfLastRecord = currentPage * recordsPerPage;
    // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // const currentRecords = filteredFarming.slice(
    //     indexOfFirstRecord,
    //     indexOfLastRecord
    // );
    //
    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };
    //
    // const emptyRow = (
    //     <tr>
    //         <td colSpan="5">No data found.</td>
    //     </tr>
    // );
    //
    // const renderTableRows = () => {
    //     if (currentRecords.length === 0) {
    //         return emptyRow;
    //     } else if (currentRecords.length < recordsPerPage) {
    //         const additionalRows = Array(recordsPerPage - currentRecords.length)
    //             .fill()
    //             .map((_, index) => (
    //                 <tr key={`empty-row-${index}`}>
    //                     <td>&nbsp;</td>
    //                     <td>&nbsp;</td>
    //                     <td>&nbsp;</td>
    //                     <td>&nbsp;</td>
    //                     <td>&nbsp;</td>
    //                 </tr>
    //             ));
    //         return [...currentRecords.map(renderTableRow), ...additionalRows];
    //     } else {
    //         return currentRecords.map(renderTableRow);
    //     }
    // };
    //
    // const renderTableRow = (record, index) => {
    //     const rowIndex = indexOfFirstRecord + index + 1;
    //     return (
    //         <tr key={record.farming_uuid}>
    //             <td className="has-text-centered">{rowIndex}</td>
    //             <td>{record.farming_name}</td>
    //             <td className="has-text-centered">{record.farming_date}</td>
    //             <td className="has-text-centered">{record.CROP_T.crop_name}</td>
    //             <td className="has-text-centered">{record.USER_T.user_fullname}</td>
    //         </tr>
    //     );
    // };

    return (
        <div>
            <h1 className="title">Farming Record</h1>
            <h2 className="subtitle">List of Farming Records</h2>
            {/*<Link*/}
            {/*    to="/precision-farming/farming-record/add"*/}
            {/*    className="button mb-2"*/}
            {/*    style={{ backgroundColor: '#71AF9D', color: 'white' }}*/}
            {/*>*/}
            {/*    Add New*/}
            {/*</Link>*/}

            {/*<div className="mt-5 mb-2">*/}
            {/*    <label className="label">Filter by: </label>*/}
            {/*</div>*/}

            {/*<div className="is-flex">*/}
            {/*    <div className="field mr-6">*/}
            {/*        <label className="label">Farming Name</label>*/}
            {/*        <div className="control">*/}
            {/*            <div className="select is-rounded">*/}
            {/*                <select*/}
            {/*                    name="filterText"*/}
            {/*                    value={filterText}*/}
            {/*                    onChange={handleFilterChange}*/}
            {/*                    style={{ minWidth: '20vw' }}*/}
            {/*                >*/}
            {/*                    <option value="">All</option>*/}
            {/*                    <option value="fertiliser">Fertiliser</option>*/}
            {/*                    <option value="irrigation">Irrigation</option>*/}
            {/*                    <option value="sowing seeds">Sowing Seeds</option>*/}
            {/*                    <option value="harvest">Harvest</option>*/}
            {/*                    <option value="others">Others</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="field">*/}
            {/*        <label className="label">User Name</label>*/}
            {/*        <div className="control has-icons-left">*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="input is-rounded"*/}
            {/*                name="filterUser"*/}
            {/*                value={filterUser}*/}
            {/*                onChange={handleFilterChange}*/}
            {/*                style={{ maxWidth: '20vw' }}*/}
            {/*            />*/}
            {/*            <span className="icon is-small is-left">*/}
            {/*                 <FaFilter className="filter-icon" />*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<table className="table is-bordered is-hoverable is-fullwidth">*/}
            {/*    <thead>*/}
            {/*    <tr style={{ backgroundColor: '#E1F6F0' }}>*/}
            {/*        <th className="has-text-centered">No</th>*/}
            {/*        <th className="has-text-centered">Farming Name</th>*/}
            {/*        <th className="has-text-centered">Date</th>*/}
            {/*        <th className="has-text-centered">Crop Name</th>*/}
            {/*        <th className="has-text-centered">Created By</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {renderTableRows()}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            {/*<div className="pagination" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>*/}
            {/*    {filteredFarming.length > recordsPerPage && (*/}
            {/*        <div className="buttons">*/}
            {/*            {Array.from(*/}
            {/*                { length: Math.ceil(filteredFarming.length / recordsPerPage) },*/}
            {/*                (_, index) => (*/}
            {/*                    <button*/}
            {/*                        key={index}*/}
            {/*                        onClick={() => paginate(index + 1)}*/}
            {/*                        className={`button ${*/}
            {/*                            currentPage === index + 1 ? 'is-primary' : ''*/}
            {/*                        }`}*/}
            {/*                    >*/}
            {/*                        {index + 1}*/}
            {/*                    </button>*/}
            {/*                )*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default FarmingRecord;
