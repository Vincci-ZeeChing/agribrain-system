import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FormEditUser = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [role,setRole] = useState("");
    const [message,setMessage] = useState("");

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        const getUserById = async() => {
            try{
                const response = await axios.get(`http://localhost:5000/api/v1/user/${id}`)
                console.log(response.data)
                const userData = response.data[0];
                setName(userData.user_fullname);
                setEmail(userData.user_email);
                setPhone(userData.user_phone);
                setRole(userData.user_role);

            }catch (error){
                if(error.response){
                    setMessage(error.response.data.message);
                }
            }
        }
        getUserById();
    },[id])

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/v1/user/${id}`,{
                user_fullname:name,
                user_email:email,
                user_password:password,
                user_confirmPassword:confirmPassword,
                user_phone:phone,
                user_role:role,
            })
            navigate("/user");
        }catch (error) {
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    }
    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Update User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleUpdateUser}>
                            <p className="has-text-centered">
                                {message}
                            </p>
                            <div className="field">
                                <label className="label"> Full Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        placeholder='Full Name'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder='Email'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        placeholder='*******'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Confirm Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={confirmPassword}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        placeholder='*******'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Phone Number</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                        placeholder='Phone Number'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                            <option value="Admin">Admin</option>
                                            <option value="Farmer">Farmer</option>
                                            <option value="Worker">Worker</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditUser;
