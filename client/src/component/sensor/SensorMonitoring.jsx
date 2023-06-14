import React from 'react';

const SensorMonitoring = () => {
    return (
        <div>
            <h1 className="title">Sensor Monitoring</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                            <p className="card-header-title is-centered" >Soil Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px' , fontWeight:"bold"}}>
                                80.0 %
                            </div>
                            <div className="content has-text-centered">
                                Soil is in good condition
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/soil" className="card-footer-item">
                                Read More
                            </a>
                        </footer>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                            <p className="card-header-title is-centered">Surrounding Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px' , fontWeight:"bold"}}>
                                30.0 °C
                            </div>
                            <div className="content has-text-centered">
                                Temperature is in good condition
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/surrounding" className="card-footer-item">Read More</a>
                        </footer>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none' , backgroundColor:"#E1F6F0"}}>
                            <p className="card-header-title is-centered">Surrounding Humidity</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px' , fontWeight:"bold"}}>
                                80.0 %
                            </div>
                            <div className="content has-text-centered">
                                Humidity is in good condition
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/surrounding" className="card-footer-item">Read More</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorMonitoring;
