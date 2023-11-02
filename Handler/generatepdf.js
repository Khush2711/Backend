const path = require('path');
const puppeteer = require('puppeteer');
const viewerPath = path.join(__dirname, '..', 'public');
const pdfDownloadPath = path.join(__dirname);
const ejs = require('ejs');
const fs = require('fs');
const generatePDF=async(data)=>{
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

}
module.exports=generatePDF;