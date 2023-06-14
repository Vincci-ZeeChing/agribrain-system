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
            <Link to="/user/add" className="button is-primary mb-2">
                Add New
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {user.map((user, index) => (
                    <tr key={user.user_uuid}>
                        <td>{index + 1}</td>
                        <td>{user.user_fullname}</td>
                        <td>{user.user_email}</td>
                        <td>{user.user_role}</td>
                        <td>{user.user_phone}</td>
                        <td>
                            <Link
                                to={`/user/edit/${user.user_uuid}`}
                                className="button is-small is-info"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteUser(user.user_uuid)}
                                className="button is-small is-danger"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;