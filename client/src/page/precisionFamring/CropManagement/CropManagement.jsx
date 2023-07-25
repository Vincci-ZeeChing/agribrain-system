import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import Layout from "../../layout/Layout";
import CropManagementList from "../../../component/precision/cropManagement/CropManagementList";
import { Helmet } from "react-helmet";

const ManagementCropDashboard = () => {
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
                <title>AgriBrain | Crop Management</title>
            </Helmet>
            <CropManagementList />
        </Layout>
    );
};

export default ManagementCropDashboard;
