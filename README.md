# Trading Card Backend

Simple Node.js Express App, which is basically a RESTful API for something like a trading card game.

Everything is build around one simple JSON, where you can define the cards and all nesessary value of your cards to shape your game.
After this, you are ready to go: Retrieve your cards, create / or allow register of new user, manage the inventory of users and users cards decks.

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