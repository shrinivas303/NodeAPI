'use strict';
module.exports = function (app) {
    var pubmethods = require('../Controller/CharityController');

    // todoList Routes
    app.route('/Donners')
        .get(pubmethods.list_all_donner);
    app.route('/Expenses')
        .get(pubmethods.list_all_expenses);
    app.route('/DashboardData')
        .get(pubmethods.getDashboardData);
};