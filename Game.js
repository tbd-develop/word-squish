var Game = function( ) { 
    this._vowels = "AEIOU";
    this._consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    this._wordBank = new WordBank();
};

Game.prototype.start = function(container) {
    this._wordBank.load('data/wordlist.txt').then(() => {
        var letters = [];              
        var vowelCount = Game.randomInt(1,3);
        var remainder = 6 - vowelCount;
        var consonantCount = Game.randomInt(remainder, remainder);

        var vowels = this.getCharacters(vowelCount, this._vowels);
        var consonants = this.getCharacters(consonantCount, this._consonants);

        var characters = vowels.concat(consonants);

        for(var index in characters) {
            container.appendChild(this.getCharacterAsTile(characters[index]));
        }
    });
};            

Game.prototype.getCharacters = function(numberOfCharacters, set) { 
    var result = [];

    for(var idx = 0; idx < numberOfCharacters; idx++) { 
        var characterIndex = Game.randomInt(0, set.length - 1);

        result.push(set[characterIndex]);
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

Game.randomInt = (min, max) => { 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
};