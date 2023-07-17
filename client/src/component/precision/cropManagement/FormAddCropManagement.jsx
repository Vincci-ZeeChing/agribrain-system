import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FormAddCropManagement = () => {
    const [crops, setCrops] = useState([]);
    const [cropId, setCropId] = useState('');
    const [date, setDate] = useState(null);
    const [harvest, setHarvest] = useState('');
    const [sold, setSold] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        getCrops();
    }, []);

    const getCrops = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/crop');
            const activeCrops = response.data.filter(crop => crop.crop_active === true);
            setCrops(activeCrops);
        } catch (error) {
            console.log(error);
        }
    };



    const calculateStored = () => {
        if (harvest.trim() !== '' && sold.trim() !== '') {
            return (parseFloat(harvest) - parseFloat(sold)).toFixed(2);
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (date === null) {
            setMessage('Date cannot be empty.');
            return;
        }

        if (harvest.trim() === '') {
            setMessage('Harvest cannot be empty.');
            return;
        }

        if (sold.trim() === '') {
            setMessage('Sold cannot be empty.');
            return;
        }

        if (price.trim() === '') {
            setMessage('Price cannot be empty.');
            return;
        }

        if (cropId.trim() === '') {
            setMessage('Crop Name cannot be empty.');
            return;
        }

        if(calculateStored() < 0){
            setMessage('Stored cannot be less than 0.');
            return;
        }

        try {
            // Format the date to YYYY-MM-DD format
            const formattedDate = date.toISOString().slice(0, 10);

            await axios.post("http://localhost:5000/api/v1/cropManagement", {
                c_management_date: formattedDate,
                c_management_harvest: harvest,
                c_management_stored: calculateStored(),
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
            <h1 className="title">Add Crop Management</h1>
            <h1 className="subtitle">Input the details below</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <p className="has-text-centered has-text-danger">{message}</p>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Date</label>
                                        <div className="control">
                                            <DatePicker
                                                className="input"
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="Select a date"
                                                selected={date} // Set the selected date
                                                onChange={date => setDate(date)} // Update the selected date
                                            />
                                        </div>
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
                                            <div className="select is-fullwidth">
                                                <select
                                                    value={cropId}
                                                    onChange={(e) => setCropId(e.target.value)}
                                                >
                                                    <option value="">Select Crop</option>
                                                    {crops.map((crop) => (
                                                        <option key={crop.id} value={crop.id}>
                                                            {crop.crop_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Stored (kg)</label>
                                        <div className="control">
                                            <input
                                                type="text"
                                                className="input"
                                                disabled
                                                value={calculateStored()}
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
                                        style={{ backgroundColor: '#71AF9D', color: 'white' }}
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

export default FormAddCropManagement;
