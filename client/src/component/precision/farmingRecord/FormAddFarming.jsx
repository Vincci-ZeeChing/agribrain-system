import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormAddFarming = () => {
    const [name, setName] = useState('');
    const [otherName, setOtherName] = useState('');
    const [date, setDate] = useState(null); // Set initial date to current date
    const [cropId, setCropId] = useState('');
    const [message, setMessage] = useState('');
    const [crops, setCrops] = useState([]); // State to hold the fetched crops

    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    useEffect(() => {
        getCrops();
    }, []);

    const getCrops = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/crop');
            setCrops(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveFarming = async (e) => {
        e.preventDefault();

        if (date === null) {
            setMessage('Date cannot be empty.');
            return;
        }

        const formattedDate = date.toISOString().split('T')[0];
        let farmingName = name === 'Other' ? otherName : name;
        farmingName = farmingName.charAt(0).toUpperCase() + farmingName.slice(1).toLowerCase();

        if (farmingName.trim() === '') {
            setMessage('Farming Name cannot be empty.');
            return;
        }

        if (cropId.trim() === '') {
            setMessage('Crop Name cannot be empty.');
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/v1/farming", {
                cropId: cropId,
                farming_name: farmingName,
                farming_date: formattedDate,
            });
            navigate("/precision-farming/farming-record");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            }
        }
    };


    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value !== 'Other') {
            setOtherName('');
        }
    };

    return (
        <div>
            <h1 className="title">Farming Record</h1>
            <h2 className="subtitle">Add New Farming Record</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSaveFarming}>
                            <p className="has-text-centered has-text-danger">{message}</p>
                            <div className="field">
                                <label className="label">Farming Name</label>
                                <div className="control mb-3">
                                    <div className="select is-fullwidth">
                                        <select value={name} onChange={handleNameChange}>
                                            <option value="">Select Farming</option>
                                            <option value="Irrigation">Irrigation</option>
                                            <option value="Fertiliser">Fertiliser</option>
                                            <option value="Sowing Seeds">Sowing Seeds</option>
                                            <option value="Harvest">Harvest</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                {name === 'Other' && (
                                    <div className="control mb-3">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Enter Farming Name"
                                            value={otherName}
                                            onChange={(e) => setOtherName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <label className="label">Date</label>
                                <div className="control mb-3">
                                    <DatePicker
                                        className="input"
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        maxDate={currentDate}
                                    />
                                </div>
                                <label className="label">Crop</label>
                                <div className="control mb-3">
                                    <div className="select is-fullwidth">
                                        <select value={cropId} onChange={(e) => setCropId(e.target.value)}>
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
                                <div className="control mb-3">
                                    <button type="submit" className="button" style={{backgroundColor:'#71AF9D',color:"white"}}>
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

export default FormAddFarming;
