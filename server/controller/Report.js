const PDFDocument = require('pdfkit');
const axios = require("axios");
const Crop = require("../model/CropModel");
const User = require("../model/UserModel");
const CropManagementModel = require("../model/CropManagementModel");
const FarmingModel = require("../model/FarmingModel");
const UserModel = require("../model/UserModel");
const CropModel = require("../model/CropModel");

// Report Format
function formatReport(doc, reportTitle) {
    doc.font('Times-Roman')
        .fontSize(30)
        .text('AgriBrain', 50, 50);

    doc.image('./Image/AgribrainLogo.png', doc.page.width - 150, 50, { width: 100 });

    doc.fontSize(10)
        .text('B-16-3, Endah Regal Condominium, Taman Sri Endah, Bandar Baru Sri Petaling, 57000, Kuala Lumpur, Malaysia', { align: 'left', width: 200 });

    const lineYa = 155; // Y-coordinate of the line
    const lineYb = 185;

    doc
        .moveTo(50, lineYa) // Starting point of the line
        .lineTo(doc.page.width - 50, lineYa) // Ending point of the line
        .lineWidth(1) // Set line width to 1
        .stroke(); // Draw the line

    doc.moveDown(1);

    doc
        .moveTo(50, lineYb) // Starting point of the line
        .lineTo(doc.page.width - 50, lineYb) // Ending point of the line
        .lineWidth(1) // Set line width to 1
        .stroke(); // Draw the line


    doc.fontSize(18)
        .text(reportTitle, { align: 'center' });

    doc.moveDown();
}

//End of content line
function drawEndLine(doc, y) {
    doc
        .moveTo(50, y)
        .lineTo(doc.page.width - 50, y)
        .lineWidth(1)
        .stroke();
}


// Get Crop Info
async function getCrop(callback) {
    try {
        const response = await Crop.findAll({
            attributes: ['id', 'crop_uuid', 'crop_name', 'crop_active'],
            include: [
                {
                    model: User,
                    attributes: ['user_fullname', 'user_email'],
                },
            ],
        });
        callback(response);
    } catch (error) {
        console.error(error);
        callback(null, error);
    }
}


// Generate Crop Report
async function generateCropReport() {
    const table = {
        title: 'Crop Report',
        headers: ['No', 'Crop', 'Active', 'User Name', 'Email'],
    };

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        formatReport(doc, table.title);

        const headerWidths = [53, 105, 190, 300, 450];
        const contentWidths = [57, 100, 195, 295, 420];

        // Display the header with aligned columns and font size 12px
        table.headers.forEach((header, index) => {
            doc.fontSize(12).text(header, headerWidths[index], doc.y, { width: headerWidths[index], align: 'left' });
            doc.moveUp();
        });

        doc.moveDown(2);

        getCrop((cropData, error) => {
            if (error) {
                console.error(error);
                doc.text('Error fetching crop data.');
            } else {
                cropData.forEach((crop, index) => {
                    const cropInfo = [
                        (index + 1).toString(), // Add the "No" value
                        crop.crop_name,
                        crop.crop_active.toString(),
                        crop.USER_T.user_fullname,
                        crop.USER_T.user_email,
                    ];

                    cropInfo.forEach((info, index) => {
                        doc.fontSize(12).text(info, contentWidths[index], doc.y, { width: contentWidths[index], align: 'left' });
                        doc.moveUp();
                    });

                    doc.moveDown(1.5); // Add space of 0.5 line between rows
                });
            }

            // Add a line after the content
            drawEndLine(doc, doc.y + 5);

            const currentDate = new Date().toLocaleString();
            const textWidth = doc.widthOfString(`Created Date and Time: ${currentDate}`);
            doc.fontSize(12).text(`Created Date and Time: \n ${currentDate}`, 50, doc.y + 50, { align: 'left', width: textWidth });

            doc.end();
        });
    });
}


//Get Crop Management Info
async function getCropManagement(callback) {
    try {
        const cropManagementData = await CropManagementModel.findAll({
            attributes: ["c_management_uuid","c_management_date", "c_management_harvest", "c_management_stored", "c_management_sold", "c_management_price"],
            include: [
                {
                    model: User,
                    as: 'USER_T',
                    attributes: ['user_fullname'],
                },
                {
                    model: Crop,
                    as: 'CROP_T',
                    attributes: ['id','crop_name'],
                },
            ],
        });
        callback(cropManagementData);
    } catch (error) {
        console.error(error);
        callback(null, error);
    }
}


// Generate Crop Management Report
function generateCropManagementReport() {
    const table = {
        title: 'Crop Report',
        headers: ['No', 'Date', 'Crop', 'Harvest(kg)', 'Stored(kg)', 'Sold(kg)', 'Price(RM)', 'User Name'],
    };
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        formatReport(doc, table.title);

        const headerWidths = [50, 90, 165, 220, 290, 360, 420, 510];
        const contentWidths = [50, 80, 155, 235, 310, 370, 435, 495];

        // Display the header with aligned columns and font size 12px
        table.headers.forEach((header, index) => {
            doc.fontSize(12).text(header, headerWidths[index], doc.y, { width: headerWidths[index], align: 'left' });
            doc.moveUp();
        });

        doc.moveDown(2);

        getCropManagement((cropManagementData, error) => {
            if (error) {
                console.error(error);
                doc.text('Error fetching crop data.');
            } else {
                cropManagementData.forEach((cManagement, index) => {
                    const cropInfo = [
                        (index + 1).toString(), // Add the "No" value
                        cManagement.c_management_date,
                        cManagement.CROP_T.crop_name,
                        cManagement.c_management_harvest,
                        cManagement.c_management_stored,
                        cManagement.c_management_sold,
                        cManagement.c_management_price,
                        cManagement.USER_T.user_fullname,
                    ];

                    cropInfo.forEach((info, index) => {
                        doc.fontSize(12).text(info, contentWidths[index], doc.y, { width: contentWidths[index], align: 'left' });
                        doc.moveUp();
                    });

                    doc.moveDown(1.5); // Add space of 0.5 line between rows
                });
            }

            // Add a line after the content
            drawEndLine(doc, doc.y + 5);

            const currentDate = new Date().toLocaleString();
            const textWidth = doc.widthOfString(`Created Date and Time: ${currentDate}`);
            doc.fontSize(12).text(`Created Date and Time: \n ${currentDate}`, 50, doc.y + 50, { align: 'left', width: textWidth });

            doc.end();
        });
    });
}

//Get Farming Record Info
async function getFarmingRecord(callback) {
    try {
        const farmingData = await FarmingModel.findAll({
            attributes: ['farming_uuid', 'farming_name', 'farming_date'],
            include: [
                {
                    model: User,
                    as: 'USER_T',
                    attributes: ['user_fullname'],
                },
                {
                    model: Crop,
                    as: 'CROP_T',
                    attributes: ['id','crop_name'],
                },
            ],
        });
        callback(farmingData);
    } catch (error) {
        console.error(error);
        callback(null, error);
    }
}

//Generate Farming Record Report
function generateFarmingRecordReport() {
    const table = {
        title: 'Farming Record Report',
        headers: ['No', 'Farming', 'Date', 'Crop', 'User Name'],
    };
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        formatReport(doc, table.title);
        const headerWidths = [50, 105, 230, 355, 450];
        const contentWidths = [50, 100, 220, 350, 440];

        // Display the header with aligned columns and font size 12px
        table.headers.forEach((header, index) => {
            doc.fontSize(12).text(header, headerWidths[index], doc.y, { width: headerWidths[index], align: 'left' });
            doc.moveUp();
        });

        doc.moveDown(2);

        getFarmingRecord((farmingData, error) => {
            if (error) {
                console.error(error);
                doc.text('Error fetching crop data.');
            } else {
                farmingData.forEach((farming, index) => {
                    const cropInfo = [
                        (index + 1).toString(), // Add the "No" value
                        farming.farming_name,
                        farming.farming_date,
                        farming.CROP_T.crop_name,
                        farming.USER_T.user_fullname,
                    ];

                    cropInfo.forEach((info, index) => {
                        doc.fontSize(12).text(info, contentWidths[index], doc.y, { width: contentWidths[index], align: 'left' });
                        doc.moveUp();
                    });

                    doc.moveDown(1.5); // Add space of 0.5 line between rows
                });
            }

            // Add a line after the content
            drawEndLine(doc, doc.y + 5);

            const currentDate = new Date().toLocaleString();
            const textWidth = doc.widthOfString(`Created Date and Time: ${currentDate}`);
            doc.fontSize(12).text(`Created Date and Time: \n ${currentDate}`, 50, doc.y + 50, { align: 'left', width: textWidth });

            doc.end();
    });
    });
}

module.exports = {
    generateCropReport,
    generateCropManagementReport,
    generateFarmingRecordReport,
};
