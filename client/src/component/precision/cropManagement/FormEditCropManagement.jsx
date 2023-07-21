import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditCropManagement = () => {
    const [crops, setCrops] = useState("");
    const [cropId, setCropId] = useState("");
    const [dates, setDates] = useState(null);
    const [harvest, setHarvest] = useState("");
    const [store, setStore] = useState("");
    const [sold, setSold] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const getCropsManagementById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/cropManagement/${id}`);
                const cropManagement = response.data;
                setCropId(cropManagement.CROP_T.id);
                setCrops(cropManagement.CROP_T.crop_name);
                setDates(cropManagement.c_management_date);
                setHarvest(cropManagement.c_management_harvest);
                setStore(cropManagement.c_management_stored);
                setSold(cropManagement.c_management_sold);
                setPrice(cropManagement.c_management_price);
            } catch (error) {
                console.log(error);
            }
        };
        getCropsManagementById();
    }, [id]);

    useEffect(() => {
        const calculatedStore = (parseFloat(harvest) - parseFloat(sold)).toFixed(2);
        setStore(calculatedStore);
    }, [harvest, sold]);

    const handleUpdateCropManagement = async (e) => {
        e.preventDefault();

        if (store < 0) {
            setMessage('Stored cannot be less than 0.');
            return;
        }

        if (harvest === '') {
            setMessage('Harvest cannot be empty.');
            return;
        }

        if (sold === '') {
            setMessage('Sold cannot be empty.');
            return;
        }

        if (price === '') {
            setMessage('Price cannot be empty.');
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/api/v1/cropManagement/${id}`, {
                c_management_date: dates,
                c_management_harvest: harvest,
                c_management_stored: store,
                c_management_sold: sold,
                c_management_price: price,
                cropId: cropId,
            });
            navigate("/precision-farming/crop-management");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Crop Management</h1>
            <h2 className="subtitle">Update Crop Management</h2>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleUpdateCropManagement}>
                            <p className="has-text-centered has-text-danger">{message}</p>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Date</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Select a date"
                                            name="date"
                                            disabled={true}
                                            value={dates || ""}
                                            onChange={(e) => setDates(e.target.value)}
                                        />
                                    </div>

                                    <div className="field">
                                        <label className="label">Harvest (kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="100"
                                                name="harvest"
                                                value={harvest}
                                                onChange={(e) => setHarvest(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Sold (kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="100"
                                                name="sold"
                                                value={sold}
                                                onChange={(e) => setSold(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="field">
                                        <label className="label">Crop</label>
                                        <div className="control">
                                            <input
                                                type="text"
                                                className="input"
                                                name="crops"
                                                disabled={true}
                                                value={crops}
                                                onChange={(e) => setCrops(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Stored (kg)</label>
                                        <div className="control">
                                            <input
                                                type="text"
                                                className="input"
                                                disabled={true}
                                                value={store}
                                                onChange={(e) => setStore(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Price (RM)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="10"
                                                name="price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control mt-6">
                                    <button
                                        type="submit"
                                        className="button"
                                        style={{ backgroundColor: "#71AF9D", color: "white" }}
                                    >
                                        Save
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

export default FormEditCropManagement;

