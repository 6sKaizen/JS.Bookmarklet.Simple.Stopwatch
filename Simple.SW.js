    var SW = function(elem, options) {
        var timer = createTimer(),
            startButton = createButton("start", start),
            stopButton = createButton("stop", stop),
            resetButton = createButton("reset", reset),
            offset, clock, interval;
        options = options || {};
        options.delay = options.delay || 1;
        elem.appendChild(timer);
        elem.appendChild(startButton);
        elem.appendChild(stopButton);
        elem.appendChild(resetButton);
        reset();

        function createTimer() {
            return document.createElement("span");
        }

        function createButton(action, handler) {
            var a = document.createElement("a");
            a.href = "#" + action;
            a.innerHTML = action;
            a.addEventListener("click", function(event) {
                handler();
                event.preventDefault();
            });
            return a;
        }

        function start() {
            if (!interval) {
                offset = Date.now();
                interval = setInterval(update, options.delay);
            }
        }

        function stop() {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        function reset() {
            clock = 0;
            render(0);
        }

        function update() {
            clock += delta();
            render();
        }

        function render() {
            timer.innerHTML = (clock / 1000).toFixed(3)
        }

        function delta() {
            var now = Date.now(),
                d = now - offset;
            offset = now;
            return d;
        }
        this.start = start;
        this.stop = stop;
        this.reset = reset;
    };
    var SWmodal = document.createElement('div');
    SWmodal.style.cssText = 'position: fixed;display: flex;justify-content: space-around;align-items: center;left: 0;top: 0;width: 100%;height: 100%;z-index: 2147483646;background:black;opacity:90%';
    SWmodal.id = 'SWmodal';
    SWmodal.onclick = function() {
        this.parentElement.removeChild(this);
    };
    document.body.appendChild(SWmodal);
    var SWdiv = document.createElement('div');
    SWdiv.style.cssText = 'position: absolute; display: inline-block;background-color: white;border: 1px solid #eee;padding: 5px;margin: 5px;text-align:center;z-index: 2147483647';
    SWdiv.id = 'SWdiv';
    SWdiv.onclick = function(event) {
        event.cancelBubble = true;
    };
    document.getElementById('SWmodal').appendChild(SWdiv);
    var SWobj = new SW(SWdiv);
    SWobj.start();
    SWdiv.querySelector("span").style.cssText = 'background-color:inherit;font-weight: bold;display: block; color:black;font-family: monospace;';
    [...SWdiv.querySelectorAll("a")].forEach((lnk) => {
        lnk.style.cssText = 'background-color:inherit;padding-right: 5px;text-decoration: none;color:blue;font-family: monospace;';
    });
