var game = new Game();
var timer = new Timer(120);

function load() { 
    game.prepare(
        document.getElementById('tileset'), 
        document.getElementById('game'), 
        document.getElementById('wordlist')
    ).then(() => { 
        game.onScoreUpdated(function(score) { 
            document.getElementById('scorecard').innerText = score;
        });
    });
};

function submitWord() { 
    game.submitSelected();
}

function giveUp() { 
    game.giveUp();

    document.getElementById('submit-word').setAttribute('disabled', 'disabled');
    document.getElementById('give-up').setAttribute('disabled', 'disabled');
    document.getElementById('new-game').removeAttribute('disabled');

    timer.stop();
}

function start() {
    game.start();                

    timer.start(function(remaining) { 
        document.getElementById('gametime').innerText = remaining + 's remaining'; 
    }, function() { 
        giveUp();
    });

    document.getElementById('submit-word').removeAttribute('disabled');
    document.getElementById('give-up').removeAttribute('disabled');
    document.getElementById('new-game').setAttribute('disabled', 'disabled');
}

window.onload = load;