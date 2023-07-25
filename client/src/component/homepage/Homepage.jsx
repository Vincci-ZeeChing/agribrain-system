import React from 'react';
import logo from "../../image/AgribrainLogo.png";
import author from "../../image/ChyeZeeChing.jpg";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';


const Homepage = () => {
    return (
        <div className="columns is-multiline">
            <div className="column" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <img style={{ height: "auto", maxWidth: "70%" }} src={logo} alt="logo" />
            </div>
            <div className="column is-7">
                <div className="is-flex">
                    <div>
                        <div className="title">
                            AgriBrain
                        </div>
                        <div style={{ textAlign: "justify" }}>
                            AgriBrain is a cutting-edge Smart Farming and Agriculture system that utilizes IoT and Data Analytics to revolutionize the agriculture industry.
                            Our system collects real-time data from sensors and devices installed on farms, which is then processed and analyzed using advanced machine learning algorithms.
                            This allows farmers to make informed decisions based on insights gained from the data, such as optimizing crop yields, crop or fertiliser recommendation, and climate condition.
                            AgriBrain is a user-friendly and cost-effective solution that is designed to meet the needs of farmers, agribusinesses, and research institutions alike.
                        </div>
                    </div>

                </div>
            </div>

            <div className="column is-7">
                <div className="is-flex" style={{ justifyContent: "center", marginTop: "10vh" }}>
                    <div>
                        <div className="title">
                            About Me
                        </div>
                        <div style={{ textAlign: "justify" }}>
                            Welcome to my project, AgriBrain! As a passionate and motivated student pursuing a Bachelor of Computer Science (Data Analytics) at Asia Pacific University of Technology & Innovation (APU), I present AgriBrain, a cutting-edge Smart Farming and Agriculture system.

                            AgriBrain is the culmination of my hard work, dedication, and curiosity in exploring the intersection of technology and agriculture. It is my individual project that showcases my skills in IoT, Data Analytics, and machine learning.

                            The main goal of AgriBrain is to revolutionize the agriculture industry by empowering farmers with real-time data insights. By collecting and analyzing data from sensors and devices installed on farms, AgriBrain offers valuable information for optimizing crop yields, recommending suitable crops and fertilizers, and monitoring climate conditions.

                            Through this project, I aim to demonstrate how technology can play a crucial role in transforming traditional agriculture practices into data-driven, sustainable, and efficient systems.

                            I am excited to share my journey with you as I present AgriBrain, and I hope it inspires others to explore innovative solutions in their respective fields.

                            Thank you for joining me on this individual project adventure! Your support and interest in AgriBrain mean a lot to me.
                        </div>
                    </div>
                </div>
            </div>

            <div className="column is-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10vh" }}>
                <img
                    style={{
                        height: "70%",
                        maxWidth: "70%",
                        borderRadius: "50%", // Apply circular border radius
                        marginBottom: "1rem",
                    }}
                    src={author}
                    alt="author"
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="columns">
                        <div className="column">
                            <a href="https://wa.me/60105650214" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size={36} color="#71AF9D" />
                            </a>
                        </div>
                        <div className="column">
                            <a href="https://www.linkedin.com/in/vincci-zee-ching" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={36} color="#71AF9D" />
                            </a>
                        </div>
                        <div className="column">
                            <a href="https://www.instagram.com/iamzeeching" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={36} color="#71AF9D" />
                            </a>
                        </div>
                        <div className="column">
                            <a href="mailto:vincci-zeeching@outlook.com">
                                <FaEnvelope size={36} color="#71AF9D" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Homepage;
