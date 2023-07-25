import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import Layout from "../../layout/Layout";
import FarmingRecord from "../../../component/precision/farmingRecord/FarmingRecord";
import { Helmet } from "react-helmet";

const FarmingRecordDashboard = () => {
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
                <title>AgriBrain | Farming Record</title>
            </Helmet>
            <FarmingRecord />
        </Layout>
    );
};

export default FarmingRecordDashboard;
