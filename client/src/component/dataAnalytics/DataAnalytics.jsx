import React, { useState } from 'react';
import {ShakeLittle } from "reshake";

const DataAnalytics = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleCardHover = () => {
        setIsHovered(!isHovered);
    };

    const handleCardClick = (endpoint) => {
        window.location.href = endpoint;
    };

    return (
        <div>
            <h1 className="title">Data Analytics</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card"
                             onClick={() => handleCardClick('/data-analytics/crop-recommendation')}
                             style={{ margin: '2vw' }}
                        >
                            <div className="card-content">
                                <div className="content has-text-centered">
                                    Soil is in good condition
                                </div>
                            </div>
                            <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                                <p className="card-header-title is-centered">Crop Recommendation</p>
                            </header>
                        </div>
                    </ShakeLittle>
                </div>


                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card"
                             onClick={() => handleCardClick('/data-analytics/fertiliser-recommendation')}
                             style={{ margin: '2vw' }}
                        >
                            <div className="card-content">
                                <div className="content has-text-centered">
                                    Soil is in good condition
                                </div>
                            </div>
                            <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                                <p className="card-header-title is-centered" >Fertiliser Recommendation</p>
                            </header>
                        </div>
                    </ShakeLittle>
                </div>

                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card"
                             onClick={() => handleCardClick('/data-analytics/report')}
                             style={{ margin: '2vw' }}>
                            <div className="card-content">
                                <div className="content has-text-centered">
                                    Soil is in good condition
                                </div>
                            </div>
                            <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                                <p className="card-header-title is-centered" >Report</p>
                            </header>
                        </div>
                    </ShakeLittle>
                </div>

                <div className="column is-4">
                    <ShakeLittle>
                        <div className="card"
                             onClick={() => handleCardClick('/data-analytics/visualization')}
                             style={{ margin: '2vw' }}>
                            <div className="card-content">
                                <div className="content has-text-centered">
                                    Soil is in good condition
                                </div>
                            </div>
                            <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                                <p className="card-header-title is-centered" >Visualization</p>
                            </header>
                        </div>
                    </ShakeLittle>
                </div>
            </div>

        </div>
    );
};

export default DataAnalytics;
