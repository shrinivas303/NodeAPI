const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');
const { json } = require('express');
var functions = {};


functions.loadsheetdata = async function(sheetname) {
    let doc = new GoogleSpreadsheet('1SL_Z0mIFZtLI-RAvy1wWjfYDhO490SNSwPims5Plx0I');
    doc.useServiceAccountAuth(creds, function(err) {});
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetname];
    var rows = await sheet.getRows();
    return rows;
}

functions.loadsheetdatawithcell = async function(sheetname) {
    let doc = new GoogleSpreadsheet('1SL_Z0mIFZtLI-RAvy1wWjfYDhO490SNSwPims5Plx0I');
    doc.useServiceAccountAuth(creds, function(err) {});
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetname];
    await sheet.loadCells('A2:G2')
    var dashboarddata = { 'TotalRecived': kFormatter(sheet.getCell(1, 0).value), 'NoOfContribution': sheet.getCell(1, 1).value, 'AvgPerPerson': Math.round(sheet.getCell(1, 2).value), 'TotalFood': sheet.getCell(1, 3).value, 'TotalLiquid': sheet.getCell(1, 4).value, 'TotalDrive': sheet.getCell(1, 6).value, 'RationkitsGiven': sheet.getCell(1, 5).value };
    return dashboarddata;
}

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

// functions.getdonnerdata=function (sheetname){
//     var donners=loadsheetdata(sheetname);
//     var donnerlist=[];
//     donners.then(function(res){

//         res.forEach(elem=>{
//             donnerlist.push({'Date':elem.Date,'Name':elem.Name,'Amount':elem.AmountReceived,'Amountwith':elem.Amountwith,'References':elem.References});
//             //console.log(elem.Date);
//         });
//         return donnerlist;
//     });
// }

module.exports = functions;