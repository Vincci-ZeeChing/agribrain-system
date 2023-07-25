import React, { useState } from 'react';
import { ShakeLittle } from "reshake";

import allVege from '../../image/crop/allVege.jpg';
import fertiliser from '../../image/crop/fertiliser.jpg';
import report from '../../image/crop/report.jpg';
import visualization from "../../image/crop/visualization.jpg";
import { useSelector } from "react-redux";


const DataAnalytics = () => {
    const { user } = useSelector((state) => state.auth);

    const handleCardClick = (endpoint) => {
        window.location.href = endpoint;
    };

    return (
        <div>
            <h1 className="title">Data Analytics</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-4" onClick={() => handleCardClick('/data-analytics/crop-recommendation')}>
                            <div style={{ position: 'relative', height: "40vh" }}>
                                <img
                                    src={allVege}
                                    alt="allVege"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                />
                                <div className="card-content"
                                    style={{
                                        position: 'relative',
                                        zIndex: 2,
                                        backgroundColor: "white",
                                        width: "95%",
                                        left: "2%",
                                        top: "50%",
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        opacity: 0.9,
                                        minHeight: "24vh"
                                    }}>
                                    <div className="content has-text-centered">
                                        <div className="subtitle" style={{ fontWeight: "bold" }}>Crop Recommendation</div>
                                        <div>Recommendation about the type of crops to be cultivated which is best suited for the respective conditions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>


                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-4" onClick={() => handleCardClick('/data-analytics/fertiliser-recommendation')}>
                            <div style={{ position: 'relative', height: "40vh" }}>
                                <img
                                    src={fertiliser}
                                    alt="fertiliser"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                />
                                <div className="card-content"
                                    style={{
                                        position: 'relative',
                                        zIndex: 2,
                                        backgroundColor: "white",
                                        width: "95%",
                                        left: "2%",
                                        top: "50%",
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        opacity: 0.9,
                                        minHeight: "24vh"
                                    }}>
                                    <div className="content has-text-centered">
                                        <div className="subtitle" style={{ fontWeight: "bold" }}>Fertiliser Recommendation</div>
                                        <div>Recommendation about the type of fertilizer best suited for the particular soil and the recommended crop</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ShakeLittle>
                </div>

                {user && (user.user.user_role === 'Farmer' || user.user.user_role === 'Admin') && (
                    <div className="column is-4">
                        <ShakeLittle>
                            <div className="card mt-5 mb-4" onClick={() => handleCardClick('/data-analytics/report')}>
                                <div style={{ position: 'relative', height: "40vh" }}>
                                    <img
                                        src={report}
                                        alt="report"
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                    />
                                    <div className="card-content"
                                        style={{
                                            position: 'relative',
                                            zIndex: 2,
                                            backgroundColor: "white",
                                            width: "95%",
                                            left: "2%",
                                            top: "50%",
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            opacity: 0.9,
                                            minHeight: "24vh"
                                        }}>
                                        <div className="content has-text-centered">
                                            <div className="subtitle" style={{ fontWeight: "bold" }}>Report</div>
                                            <div>Summary of the user-inserted crop data, crop management and farming records</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ShakeLittle>
                    </div>
                )}


                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card mt-5 mb-6" onClick={() => handleCardClick('/data-analytics/visualization')}>
                            <div style={{ position: 'relative', height: "40vh" }}>
                                <img
                                    src={visualization}
                                    alt="visualization"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                />
                                <div className="card-content"
                                    style={{
                                        position: 'relative',
                                        zIndex: 2,
                                        backgroundColor: "white",
                                        width: "95%",
                                        left: "2%",
                                        top: "50%",
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        opacity: 0.9,
                                        minHeight: "24vh"
                                    }}>
                                    <div className="content has-text-centered">
                                        <div className="subtitle" style={{ fontWeight: "bold" }}>Visualization</div>
                                        <div>Interactive charts and graphs displaying real-time and historical data of soil and surrounding parameters</div>
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

export default DataAnalytics;
