const Cards = require('../models/Cards');
const ObjectId = require('mongoose').Types.ObjectId; 
const path = require('path');
const fs = require('fs')


var AllCards = [];
fs.readFile(path.join(__dirname, '..', 'static', 'Cards.json'), 'utf8', function (err, data) {
    if (err) throw err;
    AllCards = JSON.parse(data);
	AllCards.sort(function(a, b){
	    if(a.id < b.id) { return -1; }
	    if(a.id > b.id) { return 1; }
	    return 0;
	});
});

/**
 * GET /api/
 * List of API examples.
 */
exports.getApi = (req, res) => {
   res.json({ message: 'API is reporting.' });
};


/**
 * GET /api/cards
 * List of all cards.
 */
exports.getAllCards = (req, res) => {
   res.json({ success: true, data: AllCards});
};
