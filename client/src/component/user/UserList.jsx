import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [user, setUser] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/user");
        setUser(response.data);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteConfirmation(id);
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation(null);
    };


    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/user/${userId}`);
            getUsers();
            closeDeleteConfirmation();
        } catch (error) {
            console.error(error);
        }
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
                            <td className="has-text-centered">{index + 1}</td>
                            <td>{user.user_fullname}</td>
                            <td>{user.user_email}</td>
                            <td className="has-text-centered">{user.user_role}</td>
                            <td className="has-text-centered">{user.user_phone}</td>
                            <td>
                                <div className="has-text-centered">
                                    <Link
                                        to={`/user/edit/${user.user_uuid}`}
                                        lassName="is-small is-info"
                                    >
                                        <span className="is-underlined">Edit</span>
                                    </Link>
                                    <span
                                        onClick={() => handleDeleteConfirmation(user.user_uuid)}
                                        className="is-small is-info"
                                    >
                                        <span className="is-underlined ml-2" style={{ color: "red" }}>Delete</span>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head" style={{ backgroundColor: "#71AF9D" }}>
                            <p className="modal-card-title" style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                                Confirm Deletion
                            </p>
                            <button className="delete" aria-label="close" onClick={closeDeleteConfirmation}></button>
                        </header>
                        <section className="modal-card-body is-flex is-justify-content-center">
                            <p style={{ margin: "2vh" }}>Are you sure you want to delete this user?</p>
                        </section>
                        <footer className="modal-card-foot is-justify-content-end">
                            <button className="button is-danger is-small" onClick={() => deleteUser(deleteConfirmation)}>
                                Delete
                            </button>
                            <button className="button is-small" onClick={closeDeleteConfirmation}>
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;