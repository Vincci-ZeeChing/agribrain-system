import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Welcome from '../../component/layout/Welcome';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice"
import { Helmet } from "react-helmet";
import DashboardComponent from "../../component/dashboard/Dashboard";

const Dashboard = () => {
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
                <title>AgriBrain | Dashboard</title>
            </Helmet>
            <Welcome />

            <DashboardComponent />
        </Layout>
    );
};

export default Dashboard;
