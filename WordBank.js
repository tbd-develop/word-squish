var WordBank = function() { this._data = [] };

WordBank.prototype.load = function(filepath) {
    var self = this;
    
    return new Promise((resolve, reject) => {
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

                        self._data.push(word);
                    }

                    resolve(true);
                }
            } 
        };

        client.send();
    });
};

WordBank.prototype.pickRandomWord = function() { 
    var index = Math.floor(Math.random() * Math.floor(this._data.length));

    return this._data[index];
};