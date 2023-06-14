import React, {useEffect, useState} from 'react';
import axios from "axios";

const PrecisionFarming = () => {

    const [crop, setCrop] = useState([]);
    const [farming, setFarming] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    useEffect(() => {
        getCrops();
        getFarming();
    }, []);

    const getCrops = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/crop");
        setCrop(response.data);
    };


    const getFarming = async () => {
        // const response = await axios.get("http://localhost:5000/api/v1/farming");
        // const sortedFarming = response.data.sort((a, b) =>
        //     a.farming_date > b.farming_date ? -1 : 1
        // );
        // setFarming(sortedFarming);
    };


    // Pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = farming.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const emptyRows = recordsPerPage - currentRecords.length;

    const renderTableRow = (record, index) => {
        const rowIndex = (currentPage - 1) * recordsPerPage + index + 1;
        return (
            <tr key={record.farming_uuid}>
                <td className="has-text-centered">{rowIndex}</td>
                <td>{record.farming_name}</td>
                <td className="has-text-centered">{record.farming_date}</td>
                <td className="has-text-centered">{record.CROP_T.crop_name}</td>
                <td className="has-text-centered">{record.USER_T.user_fullname}</td>
            </tr>
        );
    };



    return (
        <div>
            <h1 className="title" style={{marginBottom:"8vh"}}>Precision Farming</h1>

            <h1 className="subtitle is-underlined">
                Summary Table
            </h1>
            <table className="table is-bordered is-hoverable is-fullwidth mb-6">
                <thread>
                    <tr style={{ backgroundColor: '#E1F6F0' }}>
                        <th className="has-text-centered">No</th>
                        <th className="has-text-centered">Crop Name</th>
                        <th className="has-text-centered">Planting Date</th>
                        <th className="has-text-centered">Estimate Harvest Date</th>
                        <th className="has-text-centered">Estimate Crop Yield</th>
                        <th className="has-text-centered">Crop Diseases</th>
                        <th className="has-text-centered">Last Irrigation Date</th>
                        <th className="has-text-centered">Last Fertiliser Date</th>
                    </tr>
                </thread>
            </table>

        {/*    Crop Table */}
            <h1 className="subtitle is-underlined">Crop Listing</h1>
            <table className="table is-bordered is-hoverable is-fullwidth mb-6">
                <thead>
                <tr style={{ backgroundColor: '#E1F6F0' }}>
                    <th className="has-text-centered">No</th>
                    <th className="has-text-centered">Crop Name</th>
                    <th className="has-text-centered">Created By</th>
                </tr>
                </thead>
                <tbody>
                {crop.map((crop, index) => (
                    <tr key={crop.crop_uuid}>
                        <td className="has-text-centered">{index + 1}</td>
                        <td>{crop.crop_name}</td>
                        <td className="has-text-centered">{crop.USER_T.user_fullname}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*/!* Farming Table *!/*/}
            {/*<h1 className="subtitle is-underlined">Farming Listing</h1>*/}
            {/*<table className="table is-bordered is-hoverable is-fullwidth">*/}
            {/*    <thead>*/}
            {/*    <tr  style={{ backgroundColor: '#E1F6F0' }}>*/}
            {/*        <th className="has-text-centered">No</th>*/}
            {/*        <th className="has-text-centered">Farming Name</th>*/}
            {/*        <th className="has-text-centered">Date</th>*/}
            {/*        <th className="has-text-centered">Crop Name</th>*/}
            {/*        <th className="has-text-centered">Created By</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {currentRecords.map((farming, index) =>*/}
            {/*        renderTableRow(farming, index)*/}
            {/*    )}*/}
            {/*    {emptyRows > 0 && (*/}
            {/*        Array.from({ length: emptyRows }, (_, index) => (*/}
            {/*            <tr key={`empty-${index}`} className="empty-row">*/}
            {/*                <td>&nbsp;</td>*/}
            {/*                <td>&nbsp;</td>*/}
            {/*                <td>&nbsp;</td>*/}
            {/*                <td>&nbsp;</td>*/}
            {/*                <td>&nbsp;</td>*/}
            {/*            </tr>*/}
            {/*        ))*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            {/* Pagination */}
            <div className="pagination" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
                {farming.length > recordsPerPage && (
                    <div className="buttons">
                        {Array.from(
                            { length: Math.ceil(farming.length / recordsPerPage) },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`button ${
                                        currentPage === index + 1 ? 'is-primary' : ''
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrecisionFarming;
