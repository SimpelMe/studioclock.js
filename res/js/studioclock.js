// A js SVG Studioclock
// Based on https://github.com/wout/svg.clock.js

SVG.Studioclock = function (size, options) {

	this.settings= {
		bgcolor:  "#000000",
		sleds:    "#ff0000",
		mleds:    "#ff0000",
		time:     "#ff0000",
        tshaddow: 0.10,
        timeMode: 1
	}

	if (typeof options === 'object') {
		for (var i in options) {
			if (i in this.settings) this.settings[i] = options[i];
		}
	}

    this.sdots=[];
	this.time = {
        ms: 0,
		s: 0,
		m: 0,
		h: 0,
		day: 0,
		month: 0,
		year: 0
	}
    this.tick = 0;

	this.constructor.call(this, SVG.create('svg'));
	this.viewbox(0, 0, 100, 100);
	this.size('100%','100%');
    this.attr("preserveAspectRatio", "xMaxYMax meet");

    //drwa background
	this.rect(100,100).fill(this.settings.bgcolor);
	
    //draw second dots
    for (var i=0; i<60; i++) {
        var sdot = this.circle(2)
        .fill(this.settings.sleds)
        .attr({ cx: 50, cy: 5 })
        .rotate(i*6, 50, 50);
        this.sdots.push(sdot);
    }
    //draw 5minute dots
    for (var i=0; i<12; i++) {
        var mdot = this.circle(2)
        .fill(this.settings.mleds)
        .attr({ cx: 50, cy: 2 })
        .rotate(i*30, 50, 50);
    }
    if (this.settings.timeMode == 0) {
        //shaddow
        this.text('88:88:88')
        .move(50, 46)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '12px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
        //, weight: '300'
        }).opacity(this.settings.tshaddow);
        //time
        var dtime = this.dtime = this.text('00:00:00')
        .move(50, 46)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '12px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
        //, weight: '300'
        })
        .click(function() {
          window.location.href = 'https://www.isystems.at'
        });
    } else if (this.settings.timeMode == 1) {
        //shaddow
        this.text('88:88')
        .move(50, 27)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '18px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' 
        })
        .opacity(this.settings.tshaddow);
        var stime = this.stime = this.text('88')
        .move(50, 55)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '24px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
        //, weight: '300'
        })
        .opacity(this.settings.tshaddow);
        //times
        var dtime = this.dtime = this.text('00:00')
        .move(50, 27)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '18px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
        //, weight: '300'
        })
        .click(function() {
          window.location.href = 'https://www.isystems.at'
        });
        var stime = this.stime = this.text('00')
        .move(50, 55)
        .fill(this.settings.time)
        .attr('style', 'cursor:pointer;')
        .font({
          anchor: 'middle'
        , size:   '24px'
        , family: 'D7MBI, Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
        //, weight: '300'
        })
        .click(function() {
          window.location.href = 'https://www.isystems.at'
        });
    };
}

SVG.Studioclock.prototype = new SVG.Container

// Add time management methods to clock
SVG.extend(SVG.Studioclock, {
    // Start ticking
    start: function() {
        var self = this;
        
        self.update();
        setTimeout(function() {
            setInterval(function() {
                self.update()
            }, 1000);
        }, 1000 - self.time.ms);
    
        return this;
    }
    // Update time
    , update: function(duration) {
        /* get current time */
        var t = new Date();
        var h = this.time.h = t.getHours();
        var m = this.time.m = t.getMinutes();
        var s = this.time.s = t.getSeconds(); 
        var ms= this.time.ms = t.getMilliseconds();
        this.tick = s%2;
        
        for (var i=1; i<60; i++) {
            if (i > s) {
                this.sdots[i].opacity(0.15);
            } else {
                this.sdots[i].opacity(1.0);
            }
        }
        var sp = this.tick ? ' ':':';
        if (this.settings.timeMode == 0) {
            this.dtime.text(("00" + h).slice(-2) + sp + ("00" + m).slice(-2) + sp + ("00" + s).slice(-2));
        } else if (this.settings.timeMode == 1) {
            this.dtime.text(("00" + h).slice(-2) + ':' + ("00" + m).slice(-2));
            this.stime.text(("00" + s).slice(-2));
        }
        console.log(ms);
        return this;
    }
});

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method 
  studioclock: function(size, options) {
    return this.put(new SVG.Studioclock(size, options));
}

});