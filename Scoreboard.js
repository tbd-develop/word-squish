var ScoreBoard = function() { 
    this._card = [];

    if( localStorage.getItem('scoreboard')) { 
        this._card = JSON.parse(localStorage.getItem('scoreboard'));
    }
};

ScoreBoard.prototype.addScore = function(name, score) { 
    this._card.push({'name': name, 'score': score});

    this._card = this._card.sort((a,b) => {
        return b.score > a.score;
    }).slice(0,10);

    localStorage.setItem('scoreboard', JSON.stringify(this._card));
};

ScoreBoard.prototype.checkScore = function(score) { 
    return this._card.length < 10 || this._card.map((value) => { return score > value.score; } ).length > 0;
};

ScoreBoard.prototype.getScoreCard = function() { 
    return this._card;
}