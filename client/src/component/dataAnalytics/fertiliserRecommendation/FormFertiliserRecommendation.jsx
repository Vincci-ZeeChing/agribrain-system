import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import vegeDataset from './vege_fertiliser.csv';

const FormFertiliserRecommendation = () => {
    const [cropOptions, setCropOptions] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState('');
    const [nutrientData, setNutrientData] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [result, setResult] = useState({
        nitrogenStatus: '',
        phosphorusStatus: '',
        potassiumStatus: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(vegeDataset);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const { data } = Papa.parse(csv, { header: true });

            setCropOptions(data.map((row) => row.Crop));
            setNutrientData(data.reduce((acc, row) => ({ ...acc, [row.Crop]: row }), {}));
        };

        fetchData();
    }, []);

    const handleCropChange = (event) => {
        const { value } = event.target;
        setSelectedCrop(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Get the user input values
        const { nitrogen, phosphorus, potassium } = event.target.elements;

        // Get the nutrient values for the selected crop
        const cropNutrientData = nutrientData[selectedCrop];

        // Define the range (+/- 10) for optimal values
        const optimalRange = 10;

        // Compare the user input values with the nutrient values from the dataset
        const nitrogenValue = parseFloat(nitrogen.value);
        const phosphorusValue = parseFloat(phosphorus.value);
        const potassiumValue = parseFloat(potassium.value);

        const isNitrogenOptimal =
            nitrogenValue >= cropNutrientData['Nitrogen (N)'] - optimalRange &&
            nitrogenValue <= cropNutrientData['Nitrogen (N)'] + optimalRange;
        const isPhosphorusOptimal =
            phosphorusValue >= cropNutrientData['Phosphorus (P)'] - optimalRange &&
            phosphorusValue <= cropNutrientData['Phosphorus (P)'] + optimalRange;
        const isPotassiumOptimal =
            potassiumValue >= cropNutrientData['Potassium (K)'] - optimalRange &&
            potassiumValue <= cropNutrientData['Potassium (K)'] + optimalRange;

        const nitrogenStatus = isNitrogenOptimal ? 'optimal' : nitrogenValue > cropNutrientData['Nitrogen (N)'] ? 'high' : 'low';
        const phosphorusStatus = isPhosphorusOptimal ? 'optimal' : phosphorusValue > cropNutrientData['Phosphorus (P)'] ? 'high' : 'low';
        const potassiumStatus = isPotassiumOptimal ? 'optimal' : potassiumValue > cropNutrientData['Potassium (K)'] ? 'high' : 'low';

        console.log('Nitrogen status:', nitrogenStatus);
        console.log('Phosphorus status:', phosphorusStatus);
        console.log('Potassium status:', potassiumStatus);

        setResult({
            nitrogenStatus,
            phosphorusStatus,
            potassiumStatus,
        });

        setModalIsOpen(true); // Corrected function call
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    useEffect(() => {
        console.log('Result:', result);
    }, [result]);

    return (
        <div>
            <h1 className="title">Fertiliser Recommendation</h1>
            <h1 className="subtitle">Input the details below</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content is-flex is-justify-content-center is-align-items-center">
                        <form onSubmit={handleFormSubmit}>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Crop</label>
                                        <div className="control">
                                            <div className="select">
                                                <select name="crop" style={{ width: '50vw' }} onChange={handleCropChange}>
                                                    <option value="">Select a crop</option>
                                                    {cropOptions.map((crop) => (
                                                        <option key={crop} value={crop}>
                                                            {crop}
                                                        </option>
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
                                                style={{ width: '50vw' }}
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
                                                style={{ width: '50vw' }}
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
                                                style={{ width: '50vw' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control mb-3">
                                            <button type="submit" className="button" style={{ backgroundColor: '#71AF9D', color: 'white' }}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {modalIsOpen && (
                        <div className="modal is-active">
                            <div className="modal-background" onClick={closeModal}></div>
                            <div className="modal-content">
                                <header className="modal-card-head" style={{ backgroundColor: "#71AF9D" }}>
                                    <p className="modal-card-title" style={{ color: "white", textAlign: "center", margin: "0 auto" }}>
                                        Fertiliser Recommendation
                                    </p>
                                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                                </header>
                                <section className="modal-card-body">
                                    {result.nitrogenStatus === "low" && (
                                        <div>
                                            <strong>Nitrogen (N): Too Low</strong>
                                            <br />
                                            <p>
                                                Nitrogen deficiency can lead to stunted growth, yellowing of leaves, and reduced yield. If nitrogen levels are too low, a crop may require additional nitrogen fertilization.
                                            </p>
                                            <p>
                                                Method:
                                                If nitrogen levels are low, consider applying nitrogen-rich fertilizers such as ammonium nitrate or urea. Follow the recommended application rates based on your crop type and growth stage. Splitting nitrogen applications during the growing season can also help provide a continuous supply.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                    {result.nitrogenStatus === "high" && (
                                        <div>
                                            <strong>Nitrogen (N): Too High</strong>
                                            <br />
                                            <p>
                                                Excessive nitrogen can result in lush vegetative growth but can also lead to decreased fruiting and increased susceptibility to diseases. High nitrogen levels may indicate the need for adjustments in fertilization practices.
                                            </p>
                                            <p>
                                                Method:
                                                If nitrogen levels are excessively high, reduce nitrogen fertilization. Adjust the application rates and timing to match the crop's requirements without overloading the soil with excess nitrogen.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                    {result.phosphorusStatus === "low" && (
                                        <div>
                                            <strong>Phosphorus (P): Too Low</strong>
                                            <br />
                                            <p>
                                                Phosphorus deficiency can cause slow growth, poor root development, and delayed maturity. If phosphorus levels are too low, applying phosphorus-based fertilizers may be necessary.
                                            </p>
                                            <p>
                                                Method:
                                                If phosphorus levels are low, apply phosphorus-based fertilizers such as triple superphosphate or rock phosphate. Again, follow the recommended application rates and consider incorporating the fertilizer into the soil during planting.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                    {result.phosphorusStatus === "high" && (
                                        <div>
                                            <strong>Phosphorus (P): Too High</strong>
                                            <br />
                                            <p>
                                                Phosphorus toxicity is less common but can occur in situations of excessive phosphorus application. It may lead to nutrient imbalances and can negatively impact other nutrients' uptake by the crop.
                                            </p>
                                            <p>
                                                Method:
                                                If phosphorus levels are too high, avoid applying additional phosphorus-based fertilizers. Instead, focus on maintaining proper nutrient balance through soil testing and adjusting fertilizer practices accordingly.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                    {result.potassiumStatus === "low" && (
                                        <div>
                                            <strong>Potassium (K): Too Low</strong>
                                            <br />
                                            <p>
                                                Potassium deficiency can result in weak stems, reduced disease resistance, and poor fruit quality. If potassium levels are too low, applying potassium-rich fertilizers may be needed.
                                            </p>

                                            <p>
                                                Method:
                                                For low potassium levels, use potassium-rich fertilizers like potassium chloride or potassium sulfate. Apply according to recommended rates, considering the crop's specific needs.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                    {result.potassiumStatus === "high" && (
                                        <div>
                                            <strong>Potassium (K): Too High</strong>
                                            <br />
                                            <p>
                                                Excessive potassium levels are less common, but they can disrupt the balance of other nutrients and lead to nutrient imbalances or affect the availability of other elements.
                                            </p>

                                            <p>
                                                Excess potassium levels can be challenging to address directly. In such cases, focus on maintaining balanced nutrient management practices overall. Limiting potassium inputs and adjusting other nutrient applications can help restore nutrient equilibrium.
                                            </p>
                                            <br/>
                                        </div>
                                    )}
                                </section>
                                <footer className="modal-card-foot" />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default FormFertiliserRecommendation;
