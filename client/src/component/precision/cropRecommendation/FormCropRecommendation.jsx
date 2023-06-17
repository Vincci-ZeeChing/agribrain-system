import React, { useState } from 'react';

const FormCropRecommendation = () => {
    const [prediction, setPrediction] = useState('');
    const [data, setData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        rainfall: '',
        phValue: '',
        temperature: '',
        humidity: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePrediction = (event) => {
        event.preventDefault(); // Prevent form submission

        const inputData = [
            [
                parseFloat(data.nitrogen),
                parseFloat(data.phosphorus),
                parseFloat(data.potassium),
                parseFloat(data.rainfall),
                parseFloat(data.phValue),
                parseFloat(data.temperature),
                parseFloat(data.humidity),
            ],
        ];

        fetch('http://localhost:8000/predictCrop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputData }),
        })
            .then((response) => response.json())
            .then((data) => {
                setPrediction(data.prediction);
                setIsModalOpen(true); // Open the modal
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1 className="title">Crop Recommendation</h1>
            <h1 className="subtitle">Input the details below</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handlePrediction}>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Nitrogen</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nitrogen"
                                                name="nitrogen"
                                                value={data.nitrogen}
                                                onChange={handleInputChange}
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
                                                name="phosphorus"
                                                value={data.phosphorus}
                                                onChange={handleInputChange}
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
                                                name="potassium"
                                                value={data.potassium}
                                                onChange={handleInputChange}
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
                                                name="rainfall"
                                                value={data.rainfall}
                                                onChange={handleInputChange}
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
                                                name="phValue"
                                                value={data.phValue}
                                                onChange={handleInputChange}
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
                                                name="temperature"
                                                value={data.temperature}
                                                onChange={handleInputChange}
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
                                                name="humidity"
                                                value={data.humidity}
                                                onChange={handleInputChange}
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
                                        onClick={handlePrediction}
                                    >
                                        Predict
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Prediction Result</h2>
                            <p>{prediction}</p>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                </div>
            )}
        </div>
    );
};

export default FormCropRecommendation;
