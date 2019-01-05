![Image Trading Card Demo](https://raw.githubusercontent.com/geckse/trading-card-backend/master/public/images/github-visual.png)

# Trading Card Backend

Simple Node.js Express App, which is basically a RESTful API for something like a trading card game.

Everything is build around one simple JSON, where you can define the cards and all nesessary value of your cards to shape your game.
After this, you are ready to go: Retrieve your cards, create / or allow register of new user, manage the inventory of users and users cards decks.

## Quickstart:

**Install**
```
$ npm install
```

**Define Cards (or outcomment .example.json for testing)**
```
static/Cards.json
```

**Start**
```
$ npm start
```

Play. Cards. With your Friends. 🃏

## Add your custom Cards

Simply define all your cards in ```static/Cards.json```

Something like should work for most Card Games:

```
[{
	"id": "spell.fireball",
	"category": "Spell",
	"title": "Mighty Fireball",
	"element": "Fire",
	"value": 100,
	"attack": 10,
	"mana": 5,
	"quality": "normal"
},{
	"id": "spell.icefist",
	"category": "Spell",
	"title": "Ice Fist",
	"element": "Ice",
	"value": 120,
	"attack": 15,
	"mana": 7,
	"quality": "normal"
}]
```

## Add categories / decks / groups to organize your cards

You can define categories, which will generate automatically new API Endpoints to organize your cards.
Define them in ```static/Categories.json```

In our case something like ```category``` and ```element``` works great.

```
["category","element"]
```

The related API endpoints would be: ``` /api/cards/element/fire  / /api/cards/category/spell```

## API-Endpoints

### GET ```/api/cards```

**Status**: 200
**Result.data**: `Array` of Cards, analogous to Cards.json

### GET ```/api/card/:cardid```

**Params (required)**: `:cardid` the ID of the card you want to query.

**Status**: 200
**Result.data**: `Object` with Values of the Card, as defined in Cards.json

When no Card is found by the given id:

**Status**: 404
**Result.data**: `null`  

When no CardId is delivered:

**Status**: 400
**Result.data**: `null`  

### GET ```/api/cards/:category/:value```

**Params (required)**: `:category` mostly dynamic, defined trough Categories.json
**Params (required)**: `:value` the value you want to query. 

### GET ```/api/categories```

**Status**: 200
**Result.data**: `Array` of Objects, with possible combinations
Objects looks like ```[{
name: 'category',
values: ['value1', 'value2']
}]```

## ToDo / Planed

- [ ] MongoDB Integration
- [ ] Usermanagement 
- [ ] Storing Inventories / possibillity to give Users cards
- [ ] trading Cards with other Users
- [ ] Card-Deck Management
