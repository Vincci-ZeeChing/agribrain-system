import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../layout/Layout";
import HourlyForecast from "../../component/climate/HourlyForecast";
import { Helmet } from "react-helmet";

const HourForecastDashboard = () => {
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
                <title>AgriBrain | Forecast Climate</title>
            </Helmet>
            <HourlyForecast />
        </Layout>
    );
};

export default HourForecastDashboard;
