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
console.log(data)
    console.log(data , 111111111111111111);
    res.render(`${viewerPath}/pdfMaker.ejs`, { data:data });
};


const ejs = require('ejs');
const fs = require('fs');
const offerLetterPath = path.join(__dirname,'..','offerLetter.pdf');




module.exports =  {pdfViewer};