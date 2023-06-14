import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./component/authentication/Login";
import Agribrain from "./page/agribrain/Agribrain";
import Dashboard from "./page/dashboard/Dashboard";
import SensorDashboard from "./page/sensorMonitoring/SensorDashboard";
import SoilDashboard from "./page/sensorMonitoring/SoilDashboard";
import SurroundingDashboard from "./page/sensorMonitoring/SurroundingDashboard";
import ClimateDashboard from "./page/climateCondition/ClimateDashboard";
import HistoricalDashboard from "./page/climateCondition/HistoricalDashboard";
import ForecastDashboard from "./page/climateCondition/ForecastDashboard";
import PrecisionDashboard from "./page/precisionFamring/PrecisionDashboard";
import CropRecommendation from "./page/precisionFamring/CropRecommendation/CropRecommendation";
import ManagementCropDashboard from "./page/precisionFamring/CropManagement/CropManagement";
import FarmingRecordDashboard from "./page/precisionFamring/FarmingRecord/FarmRecordDashboard";
import AddFarming from "./page/precisionFamring/FarmingRecord/AddFarming";
import Crop from "./page/precisionFamring/Crop/Crop";
import AddCrop from "./page/precisionFamring/Crop/AddCrop";
import EditCrop from "./page/precisionFamring/Crop/EditCrop";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>

                {/*Main Page*/}
                <Route path="/agribrain" element={<Agribrain/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/sensor-monitoring" element={<SensorDashboard/>}/>
                <Route path="/climate-condition" element={<ClimateDashboard/>} />
                <Route path="/precision-farming" element={<PrecisionDashboard/>}/>

                {/*Subpage - Sensor*/}
                <Route path="/sensor-monitoring/soil" element={<SoilDashboard/>} />
                <Route path="/sensor-monitoring/surrounding" element={<SurroundingDashboard/>} />

                {/*Subpage - Climate*/}
                <Route path="/climate-condition/historical" element={<HistoricalDashboard/>}/>
                <Route path="/climate-condition/forecast" element={<ForecastDashboard/>}/>

                {/*Subpage - Precision Farming*/}
                <Route path="/precision-farming/crop-recommendation" element={<CropRecommendation/>}/>
                <Route path="/precision-farming/crop-management" element={<ManagementCropDashboard/>}/>
                <Route path="/precision-farming/farming-record" element={<FarmingRecordDashboard/>}/>
                <Route path="/precision-farming/farming-record/add" element={<AddFarming/>}/>
                <Route path="/precision-farming/crop" element={<Crop/>}/>
                <Route path="/precision-farming/crop/add" element={<AddCrop/>}/>
                <Route path="/precision-farming/crop/edit/:id" element={<EditCrop/>}/>


            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
