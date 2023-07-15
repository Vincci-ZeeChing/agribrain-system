import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

const FormAddCrop = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSaveCrop = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setMessage('Crop Name cannot be empty.');
            return;
        }

        try {
            const singularCropName = pluralize.singular(name.trim());
            const capitalizedCropName = singularCropName.charAt(0).toUpperCase() + singularCropName.slice(1);

            await axios.post('http://localhost:5000/api/v1/crop', {
                crop_name: capitalizedCropName,
            });

            navigate('/precision-farming/crop');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setMessage(error.response.data.msg);
            }
        }
    };


    return (
        <div>
            <h1 className="title">Crop</h1>
            <h2 className="subtitle">Add New Crop</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSaveCrop}>
                            {message && (
                                <p className="has-text-centered has-text-danger">{message}</p>
                            )}
                            <div className="field">
                                <label className="label">Crop Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Crop Name"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
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

export default FormAddCrop;
