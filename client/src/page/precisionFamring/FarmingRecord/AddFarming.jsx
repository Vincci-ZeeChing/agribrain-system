import React, {useEffect} from 'react';
import Layout from '../../layout/Layout'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../../features/authSlice";
import {Helmet} from "react-helmet";
import FormAddFarming from "../../../component/precision/farmingRecord/FormAddFarming";

const AddFarming = () => {
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
                <title>AgriBrain | Crop</title>
            </Helmet>
            <FormAddFarming/>
        </Layout>
    );
};

export default AddFarming;
