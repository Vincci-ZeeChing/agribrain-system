import React from 'react';
import {useSelector} from "react-redux";

const Welcome = () => {
    const {user} = useSelector((state) => state.auth);
    return (
        <div>
            <h1 className="title">Dashboard</h1>
            <h2 className="subtitle">Welcome <strong>{user && user.user.user_fullname},</strong></h2>
        </div>
    );
};

export default Welcome;
