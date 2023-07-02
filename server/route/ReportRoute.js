const express = require('express');
const { generateCropReport, generateCropManagementReport, generateFarmingRecordReport } = require('../controller/Report.js');

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
        const pdfData = await generateCropManagementReport();

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
        const pdfData = await generateFarmingRecordReport();

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
