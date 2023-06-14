import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const UserList = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/user");
        setUser(response.data);
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/api/v1/user/${userId}`);
        getUsers();
    };

    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">List of Users</h2>
            <Link to="/user/add" className="button mb-2"
                  style={{ backgroundColor: "#71AF9D", color: "white" }}>
                Add New
            </Link>
            <table className="table is-bordered is-hoverable is-fullwidth">
                <thead>
                <tr style={{ backgroundColor: "#E1F6F0" }}>
                    <th className="has-text-centered">No</th>
                    <th className="has-text-centered">Name</th>
                    <th className="has-text-centered">Email</th>
                    <th className="has-text-centered">Role</th>
                    <th className="has-text-centered">Phone</th>
                    <th className="has-text-centered">Actions</th>
                </tr>
                </thead>
                <tbody>
                {user.map((user, index) => (
                    <tr key={user.user_uuid}>
                        <td>{index + 1}</td>
                        <td>{user.user_fullname}</td>
                        <td>{user.user_email}</td>
                        <td className="has-text-centered">{user.user_role}</td>
                        <td className="has-text-centered">{user.user_phone}</td>
                        <td>
                            <div className="has-text-centered">
                                <Link
                                    to={`/user/edit/${user.user_uuid}`}
                                    lassName="is-small is-info mr-3"
                                >
                                    <span className="is-underlined">Edit</span>
                                </Link>
                                <span
                                    onClick={() => deleteUser(user.user_uuid)}
                                    className="is-small is-info mr-3"
                                >
                                <span className="is-underlined" style={{color:"red"}}>Delete</span>
                            </span>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;