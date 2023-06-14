import React, {useEffect} from 'react';
import Layout from '../layout/Layout';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../features/authSlice"
import logo from "../../image/AgribrainLogo.png"
import {Helmet} from "react-helmet";

const Agribrain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} =useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
    }, [isError,navigate]);

    return (
        <Layout>
            <Helmet>
                <title>AgriBrain | Welcome</title>
            </Helmet>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{ height: "auto", maxWidth: "60%" }} src={logo} alt="logo" />
            </div>


            <p className="has-text-centered ">
                AgriBrain is a cutting-edge Smart Farming and Agriculture system that utilizes IoT and Data Analytics to revolutionize the agriculture industry. Our system collects real-time data from sensors and devices installed on farms, which is then processed and analyzed using advanced machine learning algorithms. This allows farmers to make informed decisions based on insights gained from the data, such as optimizing crop yields, reducing water and fertilizer usage, and detecting plant diseases early. AgriBrain is a user-friendly and cost-effective solution that is designed to meet the needs of farmers, agribusinesses, and research institutions alike.
            </p>
        </Layout>
    );
};

export default Agribrain;
