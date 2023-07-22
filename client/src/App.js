import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./component/authentication/Login";
import Agribrain from "./page/agribrain/Agribrain";
import Dashboard from "./page/dashboard/Dashboard";
import SensorDashboard from "./page/sensorMonitoring/SensorDashboard";
import SoilDashboard from "./page/sensorMonitoring/SoilDashboard";
import SurroundingDashboard from "./page/sensorMonitoring/SurroundingDashboard";
import ClimateDashboard from "./page/climateCondition/ClimateDashboard";
import HourForecastDashboard from "./page/climateCondition/HourForecastDashboard";
import PrecisionDashboard from "./page/precisionFamring/PrecisionDashboard";
import CropRecommendation from "./page/dataAnalytics/CropRecommendation/CropRecommendation";
import ManagementCropDashboard from "./page/precisionFamring/CropManagement/CropManagement";
import FarmingRecordDashboard from "./page/precisionFamring/FarmingRecord/FarmRecordDashboard";
import AddFarming from "./page/precisionFamring/FarmingRecord/AddFarming";
import Crop from "./page/precisionFamring/Crop/Crop";
import AddCrop from "./page/precisionFamring/Crop/AddCrop";
import EditCrop from "./page/precisionFamring/Crop/EditCrop";
import VisualizationDashboard from "./page/dataAnalytics/VisualizationDashboard";
import ReportDashboard from "./page/dataAnalytics/ReportDashboard";
import DataAnalyticsDashboard from "./page/dataAnalytics/DataAnalyticsDashboard";
import User from "./page/user/User";
import AddUser from "./page/user/AddUser";
import EditUser from "./page/user/EditUser";
import AddCManagement from "./page/precisionFamring/CropManagement/AddCManagement";
import EditCManagement from "./page/precisionFamring/CropManagement/EditCManagement";
import FertiliserRecommendation from "./page/dataAnalytics/FertiliserRecommendation/FertiliserRecommendation";
import DailyForecastDashboard from "./page/climateCondition/DailyForecastDashboard";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>

                {/*Main Page*/}
                <Route path="/homepage" element={<Agribrain/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/sensor-monitoring" element={<SensorDashboard/>}/>
                <Route path="/climate-condition" element={<ClimateDashboard/>} />
                <Route path="/precision-farming" element={<PrecisionDashboard/>}/>
                <Route path="/data-analytics" element={<DataAnalyticsDashboard/>}/>

                {/*Subpage - Sensor*/}
                <Route path="/sensor-monitoring/soil" element={<SoilDashboard/>} />
                <Route path="/sensor-monitoring/surrounding" element={<SurroundingDashboard/>} />

                {/*Subpage - Climate*/}
                <Route path="/climate-condition/forecast-hour" element={<HourForecastDashboard/>}/>
                <Route path="/climate-condition/forecast-daily" element={<DailyForecastDashboard/>}/>

                {/*Subpage - Precision Farming*/}
                <Route path="/precision-farming/crop-management" element={<ManagementCropDashboard/>}/>
                <Route path="/precision-farming/crop-management/add" element={<AddCManagement/>}/>
                <Route path="/precision-farming/crop-management/edit/:id" element={<EditCManagement/>}/>
                <Route path="/precision-farming/farming-record" element={<FarmingRecordDashboard/>}/>
                <Route path="/precision-farming/farming-record/add" element={<AddFarming/>}/>
                <Route path="/precision-farming/crop" element={<Crop/>}/>
                <Route path="/precision-farming/crop/add" element={<AddCrop/>}/>
                <Route path="/precision-farming/crop/edit/:id" element={<EditCrop/>}/>

                {/*Subpage - Data Analytics*/}
                <Route path="/data-analytics/crop-recommendation" element={<CropRecommendation/>}/>
                <Route path="/data-analytics/fertiliser-recommendation" element={<FertiliserRecommendation/>}/>
                <Route path="/data-analytics/visualization" element={<VisualizationDashboard/>}/>
                <Route path="/data-analytics/report" element={<ReportDashboard/>}/>

                {/*Subpage - User*/}
                <Route path="/user" element={<User/>}/>
                <Route path="/user/add" element={<AddUser/>}/>
                <Route path="/user/edit/:id" element={<EditUser/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
