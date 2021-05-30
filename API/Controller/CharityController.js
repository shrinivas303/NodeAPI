const sheetmethods = require('../../SpreadSheet');
exports.list_all_donner = function(req, res) {

    var sheetdata = sheetmethods.loadsheetdata('Donor List');
    var donnerlist = [];
    sheetdata.then(function(result) {

        result.forEach(elem => {
            if (toString(elem.Date).trim() != '' && elem.Name != '') {
                donnerlist.push({ 'Date': elem.Date, 'Name': elem.Name, 'Amount': elem.Amount_Received, 'Amountwith': elem.Amount_with, 'References': elem.References });
            }
            //console.log(elem.Date);
        });
        res.send(donnerlist);
    });

};

exports.list_all_expenses = function(req, res) {

    var sheetdata = sheetmethods.loadsheetdata('Expenses Incurred');
    var expenselist = [];
    sheetdata.then(function(result) {

        result.forEach(elem => {
            if (elem != undefined && elem != null && elem.Date != '')
                expenselist.push({ 'Date': elem.Date, 'Expense': elem.Expense, 'Details': elem.Details, 'PaidBy': elem.PaidBy });
            //console.log(elem.Date);
        });
        res.send(expenselist);
    });

};

exports.getDashboardData = function(req, res) {

    var sheetdata = sheetmethods.loadsheetdatawithcell('Data for dashboard');
    sheetdata.then(function(result) {
        res.send(result);
    });

};

// exports.list_all_workdone = function (req, res) {

//     var sheetdata = sheetmethods.loadsheetdata('Donor List');
//     var donnerlist=[];
//     sheetdata.then(function(result){

//         result.forEach(elem=>{
//             if(elem!=undefined && elem!=null  && elem.Date!='')
//             donnerlist.push({'Date':elem.Date,'Name':elem.Name,'Amount':elem.AmountReceived,'Amountwith':elem.Amountwith,'References':elem.References});
//             //console.log(elem.Date);
//         });
//         res.send(donnerlist);
//     });

// };