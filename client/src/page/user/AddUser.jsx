import React, {useEffect} from 'react';
import Layout from '../layout/Layout'
import FormAddUser from "../../component/user/FormAddUser";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../features/authSlice";
import {Helmet} from "react-helmet";

const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError,user} =useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
        if (user) {
            const userRole = user.user.user_role;
            if (userRole !== "Farmer" && userRole !== "Admin") {
                navigate("/dashboard");
            }
        }
    }, [isError,user,navigate]);

    return (
        <Layout>
            <Helmet>
                <title>AgriBrain | User</title>
            </Helmet>
            <FormAddUser/>
        </Layout>
    );
};

export default AddUser;
