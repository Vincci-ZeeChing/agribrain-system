import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import Switch from "react-switch";

const CropList = () => {
    const [crop, setCrop] = useState([]);
    const [userFilterText, setUserFilterText] = useState("");
    const [cropFilterText, setCropFilterText] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        getCrops();
    }, []);

    const getCrops = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/crop");
        setCrop(response.data);
    };

    const deleteCrop = async (cropId) => {
        await axios.delete(`http://localhost:5000/api/v1/crop/${cropId}`);
        setDeleteConfirmation(null);
        getCrops();
    };

    const handleUserFilterChange = (e) => {
        setUserFilterText(e.target.value);
    };

    const handleCropFilterChange = (e) => {
        setCropFilterText(e.target.value);
    };

    const filteredCrops = crop.filter((crop) => {
        return (
            crop.USER_T.user_fullname.toLowerCase().includes(userFilterText.toLowerCase())
        );
    });

    const filteredCropsByCrop = filteredCrops.filter((crop) => {
        return (
            crop.crop_name.toLowerCase().includes(cropFilterText.toLowerCase())
        );
    });

    const showDeleteConfirmation = (cropId) => {
        setDeleteConfirmation(cropId);
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation(null);
    };

    const handleSwitchChange = async (cropId, newValue) => {
        try {
            const updatedCrop = crop.find((crop) => crop.crop_uuid === cropId);
            if (!updatedCrop) {
                return;
            }

            await axios.patch(`http://localhost:5000/api/v1/crop/${cropId}`, {
                crop_name: updatedCrop.crop_name,
                crop_active: newValue,
            });

            getCrops();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="title">Crops</h1>
            <h2 className="subtitle">List of Crops</h2>
            <div>
                <Link
                    to="/precision-farming/crop/add"
                    className="button mb-2"
                    style={{ backgroundColor: "#71AF9D", color: "white" }}
                >
                    Add New
                </Link>
            </div>

            <div className="field is-grouped mt-5">
                <div className="control">
                    <label className="label">Filter by User</label>
                    <div className="control has-icons-left">
                        <input
                            type="text"
                            className="input is-rounded"
                            value={userFilterText}
                            onChange={handleUserFilterChange}
                            placeholder="Enter Name"
                            style={{ minWidth: "20vw", maxWidth: "25vw" }}
                        />
                        <span className="icon is-small is-left">
                            <FaFilter className="filter-icon" />
                        </span>
                    </div>
                </div>

                <div className="control">
                    <label className="label">Filter by Crop</label>
                    <div className="control has-icons-left">
                        <input
                            type="text"
                            className="input is-rounded"
                            value={cropFilterText}
                            onChange={handleCropFilterChange}
                            placeholder="Enter Crop Name"
                            style={{ minWidth: "20vw", maxWidth: "25vw" }}
                        />
                        <span className="icon is-small is-left">
                            <FaFilter className="filter-icon" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table is-bordered is-hoverable is-fullwidth">
                    <thead>
                    <tr style={{ backgroundColor: "#E1F6F0" }}>
                        <th className="has-text-centered">No</th>
                        <th className="has-text-centered">Crop Name</th>
                        <th className="has-text-centered">Created By</th>
                        <th className="has-text-centered">Action</th>
                        {user && (user.user.user_role === "Farmer" || user.user.user_role === "Admin") && (
                            <th className="has-text-centered">Active</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCropsByCrop.length === 0 ? (
                        <tr>
                            <td colSpan="4">No data found.</td>
                        </tr>
                    ) : (
                        filteredCropsByCrop.map((crop, index) => (
                            <tr key={crop.crop_uuid}>
                                <td className="has-text-centered">{index + 1}</td>
                                <td>{crop.crop_name}</td>
                                <td className="has-text-centered">{crop.USER_T.user_fullname}</td>
                                {user && (user.user.user_role === "Farmer" || user.user.user_role === "Admin") && (
                                    <td>
                                        <div className="has-text-centered">
                                            <Link
                                                to={`/precision-farming/crop/edit/${crop.crop_uuid}`}
                                                className="is-small is-info mr-3"
                                            >
                                                <span className="is-underlined">Edit</span>
                                            </Link>
                                            <span
                                                onClick={() => showDeleteConfirmation(crop.crop_uuid)}
                                                className="is-hoverable is-small  delete-text"
                                            >
                                              <span className="is-underlined" style={{ color: "red" }}>
                                                Delete
                                              </span>
                                            </span>
                                        </div>
                                    </td>
                                )}
                                <td className="has-text-centered">
                                    <Switch
                                        onChange={(newValue) => handleSwitchChange(crop.crop_uuid, newValue)}
                                        checked={crop.crop_active}
                                        onColor="#71AF9D"
                                        offColor="#E1E1E1"
                                        handleDiameter={20}
                                        height={15}
                                        width={35}
                                        className="react-switch"
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

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
                            <p style={{ margin: "2vh" }}>Are you sure you want to delete this crop?</p>
                        </section>
                        <footer className="modal-card-foot  is-justify-content-end">
                            <button className="button is-danger is-small" onClick={() => deleteCrop(deleteConfirmation)}>
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

export default CropList;
