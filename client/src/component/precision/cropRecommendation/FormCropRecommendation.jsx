import React, {useState} from 'react';

// Import crop images
import beansImage from '../../../image/crop/beans.jpg';
import bellPepperImage from '../../../image/crop/bellpeppers.jpg';
import bokChoyImage from '../../../image/crop/bokchoy.jpg';
import broccoliImage from '../../../image/crop/broccoli.jpg';
import brusselsSproutsImage from '../../../image/crop/brusselssprouts.jpg';
import cabbageImage from '../../../image/crop/cabbage.jpg';
import carrotImage from '../../../image/crop/carrots.jpg';
import cauliflowerImage from '../../../image/crop/cauliflower.jpg';
import celeryImage from '../../../image/crop/celery.jpg';
import chineseCabbageImage from '../../../image/crop/chinesecabbage.jpg';
import cucumberImage from '../../../image/crop/cucumber.jpg';
import eggplantImage from '../../../image/crop/eggplant.jpg';
import kaleImage from '../../../image/crop/kale.jpg';
import lettuceImage from '../../../image/crop/lettuce.jpg';
import mustardGreensImage from '../../../image/crop/mustardgreens.jpg';
import peasImage from '../../../image/crop/peas.jpg';
import radishImage from '../../../image/crop/radish.jpg';
import spinachImage from '../../../image/crop/spinach.jpg';
import tomatoImage from '../../../image/crop/tomato.jpg';
import zucchiniImage from '../../../image/crop/zucchini.jpg';


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

    const [fieldErrors, setFieldErrors] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        rainfall: '',
        phValue: '',
        temperature: '',
        humidity: '',
    });

    const handlePrediction = (event) => {
        event.preventDefault(); // Prevent form submission

        // Check if any field is empty
        const isEmpty = Object.entries(data).some(([key, value]) => {
            if (value === '') {
                setFieldErrors((prevState) => ({
                    ...prevState,
                    [key]: 'Please enter a value',
                }));
                return true;
            }
            return false;
        });

        if (isEmpty) {
            return;
        }

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

        // Clear field errors if no empty fields
        setFieldErrors({
            nitrogen: '',
            phosphorus: '',
            potassium: '',
            rainfall: '',
            phValue: '',
            temperature: '',
            humidity: '',
        });
    };

    const cropImageMap = {
        Beans: beansImage,
        'Bell peppers': bellPepperImage,
        'Bok choy': bokChoyImage,
        Broccoli: broccoliImage,
        'Brussels sprouts': brusselsSproutsImage,
        Cabbage: cabbageImage,
        Carrots: carrotImage,
        Cauliflower: cauliflowerImage,
        Celery: celeryImage,
        'Chinese cabbage': chineseCabbageImage,
        Cucumbers: cucumberImage,
        Eggplant: eggplantImage,
        Kale: kaleImage,
        Lettuce: lettuceImage,
        'Mustard greens': mustardGreensImage,
        Peas: peasImage,
        Radishes: radishImage,
        Spinach: spinachImage,
        Tomatoes: tomatoImage,
        Zucchini: zucchiniImage,
    };

    const cropImage = cropImageMap[prediction];


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
                                        <label className="label">Nitrogen (mg/kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nitrogen"
                                                name="nitrogen"
                                                value={data.nitrogen}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.nitrogen}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Phosphorus (mg/kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Phosphorus"
                                                name="phosphorus"
                                                value={data.phosphorus}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.phosphorus}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Potassium (mg/kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Potassium"
                                                name="potassium"
                                                value={data.potassium}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.potassium}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="field">
                                        <label className="label">Rainfall (mm)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Rainfall"
                                                name="rainfall"
                                                value={data.rainfall}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.rainfall}</p>
                                            )}
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
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.phValue}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Temperature (°C)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Temperature"
                                                name="temperature"
                                                value={data.temperature}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.temperature}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Humidity (%)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Humidity"
                                                name="humidity"
                                                value={data.humidity}
                                                onChange={handleInputChange}
                                            />
                                            {fieldErrors.nitrogen && (
                                                <p className="help is-danger">{fieldErrors.humidity}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-primary">
                                        Submit
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        type="button"
                                        className="button is-link"
                                        onClick={() =>
                                            setData({
                                                nitrogen: '',
                                                phosphorus: '',
                                                potassium: '',
                                                rainfall: '',
                                                phValue: '',
                                                temperature: '',
                                                humidity: '',
                                            })
                                        }
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h1 className="title">Crop Recommendation:</h1>
                            <p>{prediction}</p>
                            {cropImage ? (
                                <img src={cropImage} alt={prediction} />
                            ) : (
                                <p>Image not found</p>
                            )}
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={closeModal}
                    ></button>
                </div>
            )}
        </div>
    );
};

export default FormCropRecommendation;