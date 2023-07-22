const express = require('express');
const {
    generateCropReport,
    generateCropManagementReportForOtherMonth,
    generateCropManagementReportCurrentMonth,
    generateFarmingRecordReportForCurrentMonth,
    generateFarmingRecordReportForOtherMonth
} = require('../controller/Report.js');

const router = express.Router();

router.get('/api/v1/cropReport', async (req, res) => {
    try {
        // Generate the report PDF
        const pdfData = await generateCropReport();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="crop-report.pdf"');

        // Send the PDF as response
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});


router.get('/api/v1/cropManagementReport', async (req, res) => {
    try {
        // Generate the report PDF
        const pdfData = await generateCropManagementReportCurrentMonth();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="cropManagement-report.pdf"');

        // Send the PDF as response
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});

router.get('/api/v1/farmingReport', async (req, res) => {
    try {
        // Generate the report PDF
        const pdfData = await generateFarmingRecordReportForCurrentMonth();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="farmingRecord-report.pdf"');

        // Send the PDF as response
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});


router.get('/api/v1/cropManagementReportOtherMonth', async (req, res) => {
    try {
        const year = req.query.year; // Replace with the desired year
        const month = req.query.month;    // Replace with the desired month

        // Generate the report PDF
        const pdfData = await generateCropManagementReportForOtherMonth(year, month);

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="cropManagement-report.pdf"');

        // Send the PDF as response
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});

router.get('/api/v1/farmingReportOtherMonth', async (req, res) => {
    try {
        // const year = parseInt(req.query.year) || 2023; // Extract the year from the request query
        // const month = parseInt(req.query.month) || 7; // Extract the month from the request query

        const year = req.query.year; // Replace with the desired year
        const month = req.query.month;    // Replace with the desired month
        if (isNaN(year) || isNaN(month)) {
            return res.status(400).json({ error: 'Invalid year or month' });
        }

        // Generate the report PDF
        const pdfData = await generateFarmingRecordReportForOtherMonth(year, month);

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="farmingRecord-report.pdf"');

        // Send the PDF as response
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});

module.exports = router;
