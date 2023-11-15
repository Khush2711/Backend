const path = require('path');
const puppeteer = require('puppeteer');
const viewerPath = path.join(__dirname, '..', 'public');
const pdfDownloadPath = path.join(__dirname);
const ejs = require('ejs');
const fs = require('fs');
// const pdf = require('html-pdf');


//data,templatePath,outputPath

const generatePDF=async(data,url)=>{
    try {
        const browser = await puppeteer.launch({ headless: 'new' });   
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (interceptedRequest) => {
            interceptedRequest.continue({
                postData: JSON.stringify(data),
                headers: {
                    ...interceptedRequest.headers(),
                    'Content-Type': 'application/json',
                },
            });
        });
       await page.goto(url, { waitUntil: 'networkidle0' });
        console.log(123);
      // const html= await ejs.renderFile(`${viewerPath}/pdfMaker.ejs`, { data });
       //await page.setContent(html);
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
console.log(456)
        await page.pdf({ path: 'offerLetter.pdf', format: 'A4' , printBackground:true , margin:{
            top:"10px",
            bottom: "20px",
            left:"10px",
            right: "20px"
        } 
    });

        await browser.close();

        console.log(`PDF generated`);
    } catch (error) {
        console.error('PDF generation failed:', error);
    } finally {
        console.log('PDF generation completed');
    }
}

/*
async function generatePDF(data) {
    try {
        const ejsPath = path.join(__dirname,'..','public','pdfMaker.ejs');
        const outputPath = path.join(__dirname,'..','offerLetter.pdf');

        const html = await ejs.renderFile(ejsPath, { data });
        // console.log(html);

        const options = { format: 'Letter' };


        pdf.create(html, options).toFile(outputPath, (err, res) => {
            if (err) return console.log(err);
            console.log(`PDF created successfully.`);
        });
    } catch (error) { 
        console.error('Error generating PDF:', error);
    }
}
*/


module.exports = generatePDF;



// const path = require('path');
// const puppeteer = require('puppeteer');
// const viewerPath = path.join(__dirname, '..', 'public');
// const pdfDownloadPath = path.join(__dirname);
// const ejs = require('ejs');
// const fs = require('fs');

// const generatePDF = async (data,templatePath, outputPath) => {
//     try {
//         // Render the EJS template with data
//         const html = await ejs.renderFile(templatePath, { data });

//         // Launch Puppeteer
//         const browser = await puppeteer.launch({ headless: 'new' });
//         const page = await browser.newPage();

//         // Set the HTML content of the page
//         await page.setContent(html, { waitUntil: 'networkidle2' });

//         // Debugging: Take a screenshot before waiting for images
//         await page.screenshot({ path: 'screenshot-before.png', fullPage: true });

//         // Wait for images to load
//         await page.waitForSelector('img', { visible: true });

//         // Debugging: Take a screenshot after waiting for images
//         await page.screenshot({ path: 'screenshot-after.png', fullPage: true });

//         // Debugging: Log console messages
//         page.on('console', (msg) => console.log(msg.text()));

//         // Generate PDF
//         await page.pdf({ path: outputPath, format: 'A4' });

//         // Close the browser
//         await browser.close();

//         console.log(`PDF generated successfully at: ${outputPath}`);
//     } catch (error) {
//         console.error('PDF generation failed:', error);
//     }
// };


// module.exports = generatePDF;