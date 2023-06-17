import React, { useState } from 'react';

const FormCropRecommendation = () => {
    return (
        <div>
            <h1 className="title">Crop Recommendation</h1>
            <h1 className="subtitle">Input the details below</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Nitrogen</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nitrogen"
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Phosphorus</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Phosphorus"
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Potassium</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Potassium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="field">
                                        <label className="label">Rainfall</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Rainfall"
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">pH Value</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="pH Value"
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Temperature</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Temperature"
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Humidity</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Humidity"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button
                                        className="button"
                                        style={{ backgroundColor: '#71AF9D', color: 'white' }}
                                    >
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
