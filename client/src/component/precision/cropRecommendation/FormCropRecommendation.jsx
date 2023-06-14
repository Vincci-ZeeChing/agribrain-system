import React, {useEffect, useState} from 'react';
import axios from "axios";

const FormCropRecommendation = () => {
    const [cropRecommendation, setCropRecommendation] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/CropRecommendation', {
                    credentials: 'include',
                });
                const data = await response.json();
                setCropRecommendation(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/cropRecommendation');
                const data = await response.json();
                setCropRecommendation(data.crop_recommendation);
                console.log(cropRecommendation)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="title">Crop Recommendation</h1>
            <h1 className="subtitle">Input the details to below</h1>

            <h1>Crop Recommendation: {cropRecommendation}</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field">
                                <label className="label">Nitrogen</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Nitrogen'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Phosphorus</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Phosphorus'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Phosphorus</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Phosphorus'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Potassium</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Potassium'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Rainfall </label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Rainfall '
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">pH Value</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='pH Value'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">pH Value</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='pH Value'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Temperature </label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Temperature'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Humidity </label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder='Humidity'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button" style={{backgroundColor:'#71AF9D',color:"white"}}>
                                        Predict
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

export default FormCropRecommendation;
