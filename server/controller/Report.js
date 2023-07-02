const PDFDocument = require('pdfkit');

function generateCropReport() {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.text('This is a crop report.');
        doc.end();
    });
}

function generateCropManagementReport() {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.text('This is a crop management report.');
        doc.end();
    });
}

function generateFarmingRecordReport() {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.text('This is a farming record report.');
        doc.end();
    });
}

module.exports = {
    generateCropReport,
    generateCropManagementReport,
    generateFarmingRecordReport
};
