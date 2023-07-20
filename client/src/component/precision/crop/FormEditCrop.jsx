import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import pluralize from "pluralize";

const FormEditCrop = () => {
    const [name,setName] = useState("");
    const [message,setMessage] = useState("");
    const [originalName, setOriginalName] = useState(""); // Add state for the original crop name

    const {id} = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        const getCropById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/crop/${id}`);
                setName(response.data.crop_name);
                setOriginalName(response.data.name); // Store the original crop name
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                }
            }
        };
        getCropById();
    }, [id]);

    const handleUpdateCrop = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setMessage('Crop Name cannot be empty.');
            return;
        }

        const singularCropName = pluralize.singular(name.trim());
        const capitalizedCropName = singularCropName.charAt(0).toUpperCase() + singularCropName.slice(1);

        try {
            await axios.patch(`http://localhost:5000/api/v1/crop/${id}`,{
                crop_name:capitalizedCropName,
            })
            navigate("/precision-farming/crop");
        }catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setMessage(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <h1 className="title">Crop</h1>
            <h2 className="subtitle">Edit Crop</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleUpdateCrop}>
                            {message && (
                                <p className="has-text-centered has-text-danger">{message}</p>
                            )}
                            <div className="field">
                                <label className="label"> Crop Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Crop Name'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button" style={{ backgroundColor: "#71AF9D", color: "white" }}>
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

export default FormEditCrop;
