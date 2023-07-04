import React from 'react';

import {ShakeLittle} from "reshake";
import allVege from "../../image/crop/allVege2.jpg";
import cropManagement from "../../image/crop/cropManagement.jpeg";
import farmingRecord from "../../image/crop/farmingRecord.jpg";
import {useSelector} from "react-redux";

const PrecisionFarming = () => {

    const {user} = useSelector((state) => state.auth);

    const handleCardClick = (endpoint) => {
        window.location.href = endpoint;
    };


    return (
        <div>
            <h1 className="title" style={{marginBottom:"4vh"}}>Precision Farming</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-4" onClick={() => handleCardClick('/precision-farming/crop/add')}>
                            <div style={{ position: 'relative', height:"40vh"}}>
                                <img
                                    src={allVege}
                                    alt="allVege"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                />
                                <div className="card-content"
                                     style={{
                                         position: 'relative',
                                         zIndex: 2,
                                         backgroundColor:"white",
                                         width:"95%",
                                         left:"2%",
                                         top:"50%",
                                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                         opacity: 0.9,
                                         minHeight:"24vh"
                                     }}>
                                    <div className="content has-text-centered">
                                        <div className="subtitle" style={{fontWeight:"bold"}}>Add Crop</div>
                                        <div>hahahaha</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>


                {user && (user.user.user_role === 'Farmer' || user.user.user_role === 'Admin') && (
                    <div className="column is-4">
                        <ShakeLittle>
                            <div className="card mt-5 mb-4" onClick={() => handleCardClick('/precision-farming/crop-management/add')}>
                                <div style={{ position: 'relative', height:"40vh"}}>
                                    <img
                                        src={cropManagement}
                                        alt="cropManagement"
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                    />
                                    <div className="card-content"
                                         style={{
                                             position: 'relative',
                                             zIndex: 2,
                                             backgroundColor:"white",
                                             width:"95%",
                                             left:"2%",
                                             top:"50%",
                                             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                             opacity: 0.9,
                                             minHeight:"24vh"
                                         }}>
                                        <div className="content has-text-centered">
                                            <div className="subtitle" style={{fontWeight:"bold"}}>Add Crop Management</div>
                                            <div>hahahaha</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ShakeLittle>
                    </div>
                )}




                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-4" onClick={() => handleCardClick('/precision-farming/farming-record/add')}>
                            <div style={{ position: 'relative', height:"40vh"}}>
                                <img
                                    src={farmingRecord}
                                    alt="farmingRecord"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                />
                                <div className="card-content"
                                     style={{
                                         position: 'relative',
                                         zIndex: 2,
                                         backgroundColor:"white",
                                         width:"95%",
                                         left:"2%",
                                         top:"50%",
                                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                         opacity: 0.9,
                                         minHeight:"24vh"
                                     }}>
                                    <div className="content has-text-centered">
                                        <div className="subtitle" style={{fontWeight:"bold"}}>Add Farming Record</div>
                                        <div>hahahaha</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>

            </div>





            {/*/!* Farming Table *!/*/}
            {/*<Link to="/precision-farming/farming-record" className="subtitle is-underlined">Farming Listing</Link>*/}
            {/*<table className="table is-bordered is-hoverable is-fullwidth mt-3">*/}
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

            {/*/!* Pagination *!/*/}
            {/*<div className="pagination" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>*/}
            {/*    {farming.length > recordsPerPage && (*/}
            {/*        <div className="buttons">*/}
            {/*            {Array.from(*/}
            {/*                { length: Math.ceil(farming.length / recordsPerPage) },*/}
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

            {/*/!* Crop Table *!/*/}
            {/*<Link to="/precision-farming/crop" className="subtitle is-underlined">Crop Listing</Link>*/}
            {/*<table className="table is-bordered is-hoverable is-fullwidth mb-6 mt-3">*/}
            {/*    <thead>*/}
            {/*    <tr style={{ backgroundColor: '#E1F6F0' }}>*/}
            {/*        <th className="has-text-centered">No</th>*/}
            {/*        <th className="has-text-centered">Crop Name</th>*/}
            {/*        <th className="has-text-centered">Created By</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {crop.map((crop, index) => (*/}
            {/*        <tr key={crop.crop_uuid}>*/}
            {/*            <td className="has-text-centered">{index + 1}</td>*/}
            {/*            <td>{crop.crop_name}</td>*/}
            {/*            <td className="has-text-centered">{crop.USER_T.user_fullname}</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    );
};

export default PrecisionFarming;
