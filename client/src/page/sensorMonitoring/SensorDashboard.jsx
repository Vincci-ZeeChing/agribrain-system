import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import SensorMonitoring from "../../component/sensor/SensorMonitoring";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";

const SensorDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <Helmet>
                <title>AgriBrain | Sensor Monitoring</title>
            </Helmet>
            <SensorMonitoring />
        </Layout>
    );
};

export default SensorDashboard;
