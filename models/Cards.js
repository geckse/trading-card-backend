const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
    
const cardSchema = new mongoose.Schema({	
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
  cardId: String, /* our static ID, defined in static / game backend */
}, { timestamps: true });

const Cards = mongoose.model('Cards', cardSchema);
module.exports = Cards;