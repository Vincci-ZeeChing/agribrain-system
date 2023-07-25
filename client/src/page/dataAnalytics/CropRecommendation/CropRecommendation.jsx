import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import Layout from "../../layout/Layout";
import { Helmet } from "react-helmet";
import FormCropRecommendation from "../../../component/dataAnalytics/cropRecommendation/FormCropRecommendation";

const CropRecommendation = () => {
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
                <title>AgriBrain | Crop Recommendation</title>
            </Helmet>
            <FormCropRecommendation />
        </Layout>
    );
};

export default CropRecommendation;
