var Timer = function(secondsToTime) { 
    this._seconds = secondsToTime;
    this._timer = null;
};

Timer.prototype.start = function(report, complete) { 
    var self = this;
    var remaining = this._seconds;

    this._timer = setInterval(function() { 
        remaining = remaining - 1;
        
        if( remaining < 0) 
        { 
            clearInterval(self._timer);

            complete();
        } 
        else 
        {
            if( report) 
            { 
                report(remaining);
            }
        }
    }, 1000);
}

Timer.prototype.stop = function() { 
    clearInterval(this._timer);
}