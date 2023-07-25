import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../layout/Layout";
import ClimateCondition from "../../component/climate/ClimateCondition";
import { Helmet } from "react-helmet";

const ClimateDashboard = () => {
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
                <title>AgriBrain | Climate Condition</title>
            </Helmet>
            <ClimateCondition />
        </Layout>
    );
};

export default ClimateDashboard;
