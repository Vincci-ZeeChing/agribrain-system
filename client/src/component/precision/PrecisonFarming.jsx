import React from 'react';

import {ShakeLittle} from "reshake";
import allVege from "../../image/crop/allVege2.jpg";
import cropManagement from "../../image/crop/cropManagement.jpeg";
import farmingRecord from "../../image/crop/farmingRecord.jpg";
import cropList from "../../image/crop/cropList.jpg";
import cropManagementList from "../../image/crop/cropManagementList.jpg";
import farmingList from "../../image/crop/farmingList.jpg";

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
                                        <div>Add a new crop to your precision farming records.</div>
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
                                            <div>Record and manage crop-related activities and data.</div>
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
                                        <div>Keep track of essential farming records and activities.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>

                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-6" onClick={() => handleCardClick('/precision-farming/crop')}>
                            <div style={{ position: 'relative', height:"40vh"}}>
                                <img
                                    src={cropList}
                                    alt="cropList"
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
                                        <div className="subtitle" style={{fontWeight:"bold"}}>Crops List</div>
                                        <div>View a list of all the crops recorded in the system.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>

                {user && (user.user.user_role === 'Farmer' || user.user.user_role === 'Admin') && (
                    <div className="column is-4">
                        <ShakeLittle>
                            <div className="card mt-5 mb-4" onClick={() => handleCardClick('/precision-farming/crop-management')}>
                                <div style={{ position: 'relative', height:"40vh"}}>
                                    <img
                                        src={cropManagementList}
                                        alt="cropManagementList"
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
                                            <div className="subtitle" style={{fontWeight:"bold"}}>Crop Management List</div>
                                            <div>Browse the list of crop management records and actions.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ShakeLittle>
                    </div>
                )}

                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-4" onClick={() => handleCardClick('/precision-farming/farming-record')}>
                            <div style={{ position: 'relative', height:"40vh"}}>
                                <img
                                    src={farmingList}
                                    alt="farmingList"
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
                                        <div className="subtitle" style={{fontWeight:"bold"}}>Farming List</div>
                                        <div>Explore the comprehensive list of farming records and activities.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>
            </div>
        </div>
    );
};

export default PrecisionFarming;
