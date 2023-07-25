import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../component/layout/Navbar";
import Sidebar from "../../component/layout/Sidebar";
import { useSelector } from "react-redux";
import { IoPerson } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const params = location.pathname.split('/').filter(param => param !== '');

    const capitalize = (text) => {
        const words = text.split('-');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    };

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="columns mt-6" style={{ minHeight: "90vh", overflowX: "auto" }}>
                {sidebarVisible && (
                    <div className="column is-2">
                        <Sidebar />
                    </div>
                )}
                <div className="column has-background-light">
                    <div className="is-flex">
                        <button className="button mt-3 ml-0" style={{ border: "none", backgroundColor: "transparent" }} onClick={toggleSidebar}>
                            <FaBars />
                        </button>
                        <nav className="breadcrumb ml-0" aria-label="breadcrumbs">
                            <div className="columns" style={{ width: "97vw" }}>
                                <div className="column">
                                    <ul className="is-active" style={{ marginTop: "3vh", marginLeft: "3vh", fontWeight: "bold" }}>
                                        <li>
                                            <a style={{ pointerEvents: "none", color: "inherit" }}>Agribrain</a>
                                        </li>
                                        {params.map((param, index) => (
                                            <li key={index}>
                                                <a style={{ pointerEvents: "none", color: "inherit" }}>{capitalize(param)}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="column is-narrow">
                                    <p style={{ marginTop: "3vh", textAlign: "right", marginRight: "3vh" }}>
                                        {user && user.user.user_fullname}
                                        <IoPerson style={{ marginLeft: "1vw" }} />
                                    </p>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <main>
                        <div style={{ marginTop: "1vh", marginRight: "2vw", marginLeft: "2vw", marginBottom: "3vh", minHeight: "85vh", backgroundColor: "white", padding: "3vh" }}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
