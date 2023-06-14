import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LogoutUser, reset} from "../../features/authSlice";

import {IoHome, IoLogOut, IoPerson} from 'react-icons/io5'
import {MdDataSaverOn} from 'react-icons/md'
import {TiWeatherPartlySunny} from 'react-icons/ti'
import {GiFarmTractor} from 'react-icons/gi'
import {FaChartPie} from 'react-icons/fa'

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);


    const [isSensorSubMenuOpen, setIsSensorSubMenuOpen] = useState(false);
    const [isClimateSubMenuOpen, setIsClimateSubMenuOpen] = useState(false);
    const [isPrecisionSubMenuOpen, setIsPrecisionSubMenuOpen] = useState(false);
    const [isAnalyticsSubMenuOpen, setIsAnalyticsSubMenuOpen] = useState(false);

    const toggleSensorSubMenu = () => {
        setIsSensorSubMenuOpen(!isSensorSubMenuOpen);
    }

    const toggleClimateSubMenu = () => {
        setIsClimateSubMenuOpen(!isClimateSubMenuOpen);
    }

    const togglePrecisionSubMenu = () => {
        setIsPrecisionSubMenuOpen(!isPrecisionSubMenuOpen);
    }

    const toggleAnalyticsSubMenu = () => {
        setIsAnalyticsSubMenuOpen(!isAnalyticsSubMenuOpen);
    }

    const logout = () => {
        dispatch(LogoutUser());
        dispatch(reset());
        navigate("/");
    }



    return (
        <div>
            <aside className="menu pl-2 custom-sidebar">
                <p className="menu-label mt-5">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}> <IoHome/> Dashboard</NavLink></li>
                    <li>
                        <a onClick={toggleSensorSubMenu}><MdDataSaverOn/> Sensor Monitoring </a>
                        {isSensorSubMenuOpen &&
                            <ul>
                                <li className="ml-1"><NavLink to="/sensor-monitoring/soil">Soil</NavLink></li>
                                <li className="ml-1"><NavLink to="/sensor-monitoring/surrounding">Surrounding</NavLink></li>
                            </ul>
                        }
                    </li>
                    <li>
                        <a onClick={toggleClimateSubMenu}><TiWeatherPartlySunny/> Climate Condition</a>
                        {isClimateSubMenuOpen &&
                            <ul>
                                <li className="ml-1"><NavLink to="/climate-condition/historical">Historical</NavLink></li>
                                <li className="ml-1"><NavLink to="/climate-condition/forecast">Forecast</NavLink></li>
                            </ul>
                        }
                    </li>
                    <li>
                        <a onClick={togglePrecisionSubMenu}><GiFarmTractor/> Precision Farming</a>
                        {isPrecisionSubMenuOpen &&
                            <ul>
                                <li className="ml-1"><NavLink to="/precision-farming/crop">Crops</NavLink></li>
                                <li className="ml-1"><NavLink to="/precision-farming/crop-recommendation">Crop Recommendation</NavLink></li>
                                <li className="ml-1"><NavLink to="/precision-farming/crop-management">Crops Management</NavLink></li>
                                <li className="ml-1"><NavLink to="/precision-farming/farming-record">Farming Records</NavLink></li>
                            </ul>
                        }
                    </li>
                    <li>
                        <a onClick={toggleAnalyticsSubMenu}><FaChartPie/> Data Analytics</a>
                        {isAnalyticsSubMenuOpen &&
                            <ul>
                                <li className="ml-1"><NavLink to="/data-analytics/visualization">Visualization</NavLink>
                                </li>
                                <li className="ml-1"><NavLink to="/data-analytics/report">Report</NavLink></li>
                            </ul>
                        }
                    </li>


                </ul>
                {user && user.user.user_role === 'Farmer' && (
                    <div>
                        <p className="menu-label mt-5">
                            Administration
                        </p>
                        <ul className="menu-list">
                            <li>
                                <li><NavLink to={"/user"}><IoPerson/> User</NavLink></li>
                            </li>
                            <li>

                            </li>
                        </ul>
                    </div>
                )}
                <p className="menu-label mt-5">
                    Settings
                </p>
                <ul className="menu-list">
                    <li onClick={logout}>
                        <a> <IoLogOut/>
                            Logout
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
