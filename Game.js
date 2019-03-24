var Game = function( ) { 
    this._vowels = "AEIOU";
    this._consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    this._wordBank = new WordBank();
    this._tileSet = [];
    this._wordSet = [];
    this._resultsPanel = null;
    this._tilesPanel = null;
    this._selectedPanel = null;
    this._currentScore = 0;
    this._onScore = null;
};

Game.prototype.prepare = function(tiles, gamepanel, wordlist) {
    this._tilesPanel = tiles;
    this._resultsPanel = wordlist;
    this._selectedPanel = gamepanel;

    return this._wordBank.load('data/wordlist.txt');
}; 

Game.prototype.onScoreUpdated = function(callback) { 
    this._onScore = callback;
}

Game.prototype.start = function() { 
    Game.clearElement(this._resultsPanel);
    Game.clearElement(this._tilesPanel);
    Game.clearElement(this._selectedPanel);

    var vowelCount = Game.randomInt(1,3);
    var remainder = 6 - vowelCount;
    var consonantCount = Game.randomInt(remainder, remainder);

    var vowels = this.getCharacters(vowelCount, this._vowels);
    var consonants = this.getCharacters(consonantCount, this._consonants);

    this._tileSet = vowels.concat(consonants);
    this._wordSet = this._wordBank.getAvailableWords(this._tileSet );
    this._currentScore = 0;

    for(var index in this._tileSet ) {
        this._tilesPanel.appendChild(this.getCharacterAsTile(this._tileSet[index], this.selectCharacter.bind(this)));
    }
}

Game.prototype.selectCharacter = function(element) { 
    if( element.getAttribute('data-panel') === undefined || 
        element.getAttribute('data-panel') === 'selected') {
            element.setAttribute('data-panel', 'available');
            this._tilesPanel.appendChild(element);
    } else 
    {
        element.setAttribute('data-panel', 'selected');

        this._selectedPanel.appendChild(element);
    }
};

Game.prototype.getCharacters = function(numberOfCharacters, set) { 
    var result = [];

    for(var idx = 0; idx < numberOfCharacters; idx++) { 
        var characterIndex = Game.randomInt(0, set.length - 1);

        result.push(set[characterIndex]);
    }

    return result;
};

Game.prototype.getWordAsTileset = function(word, hidden) { 
    var result = document.createElement('div');
    result.setAttribute('class', hidden ? 'result' : '');

    for(var i in word) { 
        result.appendChild(this.getCharacterAsTile(word[i]));
    }

    return result;
};

Game.prototype.getCharacterAsTile = function ( letter, onclick ) { 
    var tile = document.createElement('div');
    tile.setAttribute('class', 'tile');
    tile.setAttribute('data', letter);
    
    if( onclick) {
        tile.onclick = (e) => { 
            onclick(e.currentTarget);
        };
    }

    tile.innerHTML = letter;

    return tile;
};

Game.prototype.submitSelected = function() { 
    var selectedTiles = Array.from(this._selectedPanel.getElementsByClassName('tile'));

    var selectedWord = selectedTiles.map((tile) => { 
        return tile.getAttribute('data');
    }).join('');

    var wordFound = this._wordSet.indexOf(selectedWord);

    if( wordFound >= 0 ) { 
        this._resultsPanel.appendChild(this.getWordAsTileset(selectedWord));

        this._wordSet.splice(wordFound,1);

        this.score(selectedWord.length * 5);
    }

    for(var tile in selectedTiles) { 
        var element = selectedTiles[tile];

        element.setAttribute('data-panel', 'available');
        
        this._tilesPanel.appendChild(element);
    }
};

Game.prototype.giveUp = function() { 
    for(var index in this._wordSet) { 
        this._resultsPanel.appendChild(this.getWordAsTileset(this._wordSet[index]));
    }
};

Game.prototype.score = function(value) { 
    this._currentScore += value;

    this._onScore(this._currentScore);
};

Game.randomInt = (min, max) => { 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}