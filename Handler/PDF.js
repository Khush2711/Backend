const path = require('path');
const puppeteer = require('puppeteer');
const viewerPath = path.join(__dirname, '..', 'public');
const pdfDownloadPath = path.join(__dirname);

function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();

    // Ensure day and month have two digits
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


const currentDate = getCurrentDate();

const pdfViewer = (req, res) => {
    let data = {...req.body , currentDate};
    res.render(`${viewerPath}/pdfMaker.ejs`, { data });
};


const ejs = require('ejs');
const fs = require('fs');
const offerLetterPath = path.join(__dirname,'..','offerLetter.pdf');

async function generatePdf(url) {
    // const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    try {
        const browser = await puppeteer.launch({ headless: 'new' });

        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.screenshot({ path: 'screenshot.png', fullPage: true });

        await page.pdf({ path: offerLetterPath, format: 'A4' });

        await browser.close();

        res.send(`PDF generated`);
    } catch (error) {
        res.send('PDF generation failed:', error);
    } finally {
        res.send('PDF generation completed');
    }
}


module.exports = { pdfViewer, generatePdf };