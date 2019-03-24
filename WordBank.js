var WordBank = function() { this._data = [] };

WordBank.prototype.load = function(filepath) {
    var self = this;
    
    return new Promise((resolve, reject) => {
        if( localStorage.getItem('word-data')) { 
            self._data = JSON.parse(localStorage.getItem('word-data'));
            resolve(true);

            return;
        }

        var client = new XMLHttpRequest();

        client.open('GET', filepath);
        client.onreadystatechange = function() { 
            if( client.readyState == 4 ) { 
                if( client.status == 200) {
                    var contents = client.responseText.split(/\s+/);
                    var container = document.getElementById('wordlist');
                    
                    for(var index in contents) { 
                        var word = contents[index];

                        // Exclude short and too long words
                        if( word.length < 3 || word.length > 6) { 
                            continue;
                        }

                        // If we remove characters that aren't A-Z and the length is changed, throw it out
                        if( word.replace(/[^A-Za-z]/gi, '').length < word.length) { 
                            continue;
                        }

                        self._data.push(word.toUpperCase());                    
                    }

                    localStorage.setItem('word-data', JSON.stringify(self._data));

                    resolve(true);
                }
            } 
        };

        client.send();
    });
};

WordBank.prototype.getAvailableWords = function(characters) { 
    var results = [];

    for(var index in this._data) 
    { 
        var x = characters.slice();
        var word = this._data[index];
        var wordIsAvailable = true;

        for(var c in word) 
        { 
            var letter = x.indexOf(word[c]);

            if( letter == -1 ) { 
                wordIsAvailable = false;
                break;
            }

            x.splice(letter,1);
        }

        if( wordIsAvailable) { 
            results.push(word);
        }
    }

    results = results.sort((a,b) => { 
        return a.length - b.length || a > b;
    });

    return results;
};