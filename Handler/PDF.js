const path = require('path');
const puppeteer = require('puppeteer');
const viewerPath = path.join(__dirname, '..', 'public');
const pdfDownloadPath = path.join(__dirname);

let data = {
    fname: 'abc', lname: 'xyz', email: 'abc@gmail.com',
    role: 'backendDeveloper', work: 'Nodejs', duration: '5 months',
    from: '15-nov-2023', to: '16-nov-2024'
};








const pdfViewer = (req, res) => {
    res.render(`${viewerPath}/pdfMaker.ejs`, { data });
};

const ejs = require('ejs');
const fs = require('fs');

async function generatePdf(req,res) {
    const templatePath = path.join(__dirname, '..', 'public', 'pdfMaker.ejs');
    const outputPath = 'offerLetter.pdf';

    const ejsTemplate = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = ejs.compile(ejsTemplate);
    const html = compiledTemplate({ data });

    const browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();

    await page.setContent(html);

    await page.pdf({
        path: outputPath,
        format: 'A4',
    });

    await browser.close();

    res.send(`PDF generated and saved as ${outputPath}`);
}

module.exports = { pdfViewer, generatePdf };