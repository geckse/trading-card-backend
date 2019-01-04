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

var AllCategories = [];
fs.readFile(path.join(__dirname, '..', 'static', 'Categories.json'), 'utf8', function (err, data) {
    if (err) throw err;
    AllCategories = JSON.parse(data);
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

/**
 * GET /api/cards/dynamiccategory/:value
 * List of all cards in one category.
 */
exports.getCardsByCategory = (req, res) => {
	
   var value = req.params.catvalue;
   if(value){
	 value = value.toLowerCase();  
   } else {
	 return res.status(400).json({ success: false, data: [], message: 'Please provide any value.'});   	   
   }
   var cat = "";
   AllCategories.forEach((category) => {
 	 if(req.path.indexOf('cards/'+category.toLowerCase()+'/') != -1){
	 	cat = category;
 	 }
   });
   
   if(cat == ""){
	   return res.status(404).json({ success: true, data: [], message: 'Category not found.'});   
   }
   var selectedCards = [];
   AllCards.forEach((card) => {
   		if(card[cat] && card[cat].toLowerCase() == value.toLowerCase()) selectedCards.push(card);
   });

   return res.json({ success: true, data: selectedCards });
};

/**
 * GET /api/card/:cardid
 * Get a Specific Card.
 */
exports.getCardById = (req, res) => {
   
   var cardId = req.params.cardid;

   AllCards.forEach((card) => {
	   if(cardId == card.id){
		   return res.json({ success: true, data: card});	   
	   }
   });
   
   return res.status(404).json({ success: true, data: [], message: 'card not found.' });	   
};
