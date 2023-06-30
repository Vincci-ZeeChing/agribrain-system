import React from 'react';

const FormFertiliserRecommendation = () => {

    const cropOptions = [
        'Beetroot', 'Bitter gourd', 'Bottle gourd', 'Brinjal', 'Cabbage',
        'Capsicum', 'Carrot', 'Cauliflower', 'Chilli', 'Coriander leaves',
        'Corn', 'Cucumber', 'Fava beans', 'French beans', 'Green peas',
        'Ladyfinger', 'Lima beans', 'Pumpkin', 'Radish', 'Ridge gourd',
        'Spinach', 'Sweet potato', 'Tapioca', 'Tomato', 'Lettuce',
        'Bok choy', 'Broccoli', 'Celery', 'Chinese cabbage', 'Kale',
        'Mustard greens', 'Zucchini'
    ];

    return (
        <div>
            <h1 className="title">Fertiliser Recommendation</h1>
            <h1 className="subtitle">Input the details below</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content is-flex is-justify-content-center is-align-items-center">
                        <form>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Crop</label>
                                        <div className="control">
                                            <div className="select">
                                                <select name="crop" style={{width:"50vw"}}>
                                                    {cropOptions.map((crop) => (
                                                        <option key={crop} value={crop}>{crop}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Nitrogen (mg/kg)</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nitrogen"
                                                name="nitrogen"
                                                style={{ width: "50vw" }}
                                            />
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
                                                style={{ width: "50vw" }}
                                            />
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
                                                style={{ width: "50vw" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormFertiliserRecommendation;
