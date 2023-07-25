import React, { useEffect } from 'react';
import Layout from '../../layout/Layout'
import FormEditCrop from "../../../component/precision/crop/FormEditCrop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { Helmet } from "react-helmet";

const EditCrop = () => {
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
                <title>AgriBrain | Crop</title>
            </Helmet>
            <FormEditCrop />
        </Layout>
    );
};

export default EditCrop;
