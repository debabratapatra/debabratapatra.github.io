if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 17 /*~ 1000/60*/);
        }
    );
}

CanvasRenderingContext2D.prototype.dottedLine = function(x1, y1, x2, y2, dotLen) {

    this.beginPath();
    this.moveTo(x1, y1);

    var dX = x2 - x1;
    var dY = y2 - y1;
    var dots = Math.floor(Math.sqrt(dX * dX + dY * dY) / dotLen);
    var dotX = dX / dots;
    var dotY = dY / dots;

    var q = 0;
    while (q++ < dots) {
    x1 += dotX;
    y1 += dotY;
    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);

    this.stroke();
    this.closePath();
};

window.addEventListener("load",function(event) {
    home_module.launchSpaceExploration();
    home_module.launnchBilliard();
});

var home_module = function() {

    function launchSpaceExploration() {
        function Star () {
            this.x = 0;
            this.y = 0;
            this.xpos = 0;
            this.ypos = 0;
            this.zpos = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.color = "#ffffff";
            this.alpha = 1;
            this.lineWidth = 1;
            this.radius = 25;
            this.arms = 5;
            this.inset = 0.5;
        }
        
        Star.prototype.draw = function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x, this.y);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.moveTo(0, 0 - this.radius);
            for (var i = 0; i < this.arms; i++)
            {
                ctx.rotate(Math.PI / this.arms);
                ctx.lineTo(0, 0 - (this.radius * this.inset));
                ctx.rotate(Math.PI / this.arms);
                ctx.lineTo(0, 0 - this.radius);
            }
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.restore();
        };

        var canvas = document.getElementById('space-canvas');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        var context = canvas.getContext('2d'),
            stars = [],
            numStars = 100,
            fl = 250,
            vpX = canvas.width / 2,
            vpY = canvas.height / 2,
            ax = 0,
            ay = 0,
            az = 0,
            vx = 0,
            vy = 0,
            vz = 0,
            friction = 0.98;
    
        for (var star, i = 0; i < numStars; i++) {
            star = new Star();
            star.xpos = Math.random() * 9000 - 5000;
            star.ypos = Math.random() * 5000 - 2000;
            star.zpos = Math.random() * 10000000;
            stars.push(star);
        }
    
        window.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
            case 38:        //up
            az = -1;
            event.preventDefault();
            break;
            case 40:        //down
            az = 1;
            event.preventDefault();
            break;
            case 37:        //left
            ax = 1;
            break;
            case 39:        //right
            ax = -1;
            break;
            }
            
        }, false);
    
        window.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
            case 38:        //up
            case 40:        //down
            az = 0;
            break;
            case 37:        //left
            case 39:        //right
            ax = 0;
            break;
            }
        }, false);
    
        function move (star) {
            star.xpos += vx;
            star.ypos += vy;
            star.zpos += vz;
            if (star.xpos > 5000) {
            star.xpos += -9000;
            }
            if(star.xpos < -5000) {
                star.xpos += 9000;
            }
            if (star.zpos < -fl) {
            star.zpos += 10000;
            }
            if (star.zpos > 10000 - fl) {
            star.zpos -= 10000;
            }
            var scale = fl / (fl + star.zpos);
            star.scaleX = star.scaleY = scale;
            star.x = vpX + star.xpos * scale;
            star.y = vpY + star.ypos * scale;
            star.alpha = scale;
        }
    
        function zSort (a, b) {
            return (b.zpos - a.zpos);
        }
    
        function draw (star) {
            star.draw(context);
        }
    
        (function drawFrame () {
            window.requestAnimationFrame(drawFrame, canvas);
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            vx += ax;
            vy += ay;
            vz += az;
            stars.forEach(move);
            vx *= friction;
            vy *= friction;
            vz *= friction;
            stars.sort(zSort);
            stars.forEach(draw);
    
        }());
    }

    function launnchBilliard() {
        var canvas = document.getElementById("billiard-canvas");
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        var ctx = canvas.getContext("2d"),
            components = {},
            board = new Board(canvas),
            striker = new Striker(board, components),
            mouse = {
                x: canvas.width / 2, //Initial position
                y: canvas.height / 2
            },
            balls = [],
            cueBall,
            cueStick,
            predictionLine,
            ballRadius = 12;

            components.board = board;
            components.striker = striker;

        var maxBallsWidth = 4 * 2 * ballRadius,
            x = board.x + board.width / 2 - maxBallsWidth / 2 + ballRadius,
            y = board.height / 4,
            ballHeight = 2 * ballRadius - 2;
        
        //Position Balls
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 9, components));    
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 8, components));
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 7, components));
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 6, components));
        
        x = x - 3 * 2 * ballRadius + ballRadius;
        y += ballHeight;
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 5, components));
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 4, components));
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 3, components));
        
        x = x - 2 * 2 * ballRadius + ballRadius;
        y += ballHeight;
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 2, components));
        x += 2 * ballRadius; 
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 1, components));
        
        x = x - 2 * ballRadius + ballRadius;
        y += ballHeight;
        balls.push(new Ball(ballRadius, parseColor(Math.random() * 0xffffff), x, y, 0, components));
        
        components.balls = balls;

        cueBall = new CueBall(ballRadius, '#F7F7F7', board.x + board.width / 2,
            y+40, undefined, components);
        components.cueBall = cueBall;
        cueStick = new CueStick(board, components);
        components.cueStick = cueStick;
        predictionLine = new PredictionLine(board, components);
        components.predictionLine = predictionLine;

        listenEvents(canvas, ctx, mouse, components);

        (function draw() {
            window.requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            board.draw(ctx);
            striker.draw(ctx);
            for(var i = 0; i < balls.length; i++) {
                balls[i].visible && balls[i].draw(ctx);
            }
            cueBall.draw(ctx);
            cueStick.draw(ctx);
            predictionLine.draw(ctx);
            
            //Check Collisions
            for (var ballA, i = 0, len = balls.length - 1; i < len; i++) {
                ballA = balls[i];
                for (var ballB, j = i + 1; j < balls.length; j++) {
                    ballB = balls[j];
                    checkCollision(ballA, ballB);
                }
            }
        })();

        function Board(canvas) {
            var me = this,
                holeColor = '#000000',
                boardBgColor = '#00A6AE',
                boardBorderColor = '#592628';

            function drawHole(ctx, x, y, startAng, endAng) {
                ctx.beginPath();
                ctx.arc(x, y, me.holeRadius, startAng, endAng);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.fill();
            }

            this.x = 0;
            this.y = this.x;
            this.width = canvas.width;
            this.height = .7 * this.width;
            this.holeRadius = 30;

            this.draw = function(ctx) {
                var prevFill = ctx.fillStyle,
                    prevStroke = ctx.strokeStyle,
                    prevLine = ctx.lineWidth;

                ctx.fillStyle = boardBgColor;
                ctx.strokeStyle = boardBorderColor;
                ctx.lineWidth = 4;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.strokeRect(this.x, this.y, this.width, this.height);

                ctx.fillStyle = holeColor;
                drawHole(ctx, this.x, this.y, 0, Math.PI / 2);
                drawHole(ctx, this.x + this.width, this.y, Math.PI / 2, Math.PI);
                drawHole(ctx, this.x + this.width, this.y + this.height, Math.PI, 3 * Math.PI / 2);
                drawHole(ctx, this.x, this.y + this.height, 3 * Math.PI / 2, 2 * Math.PI);
                ctx.fillStyle = prevFill;
                ctx.strokeStyle = prevStroke;
                ctx.lineWidth = prevLine;
            };
        }

        function Striker(board, components) {
            var wrapperX = board.x + 5,
                wrapperY = board.y + board.height + 20,
                wrapperWidth = 200,
                wrapperHeight = 50,
                fillColor = '#FFAA00',
                originalWidth = wrapperWidth - 40;

            this.height = 8;
            this.x = wrapperX + 20;
            this.y = wrapperY + wrapperHeight / 2;
            this.width = originalWidth;
            this.draw = function(ctx) {
                ctx.strokeRect(wrapperX, wrapperY, wrapperWidth, wrapperHeight);

                var prevFont = ctx.font,
                    prevFill = ctx.fillStyle;

                ctx.font = "12px Arial";
                ctx.fillStyle = 'black';
                ctx.fillText('Drag to the Left', wrapperX + 50, this.y + 18);
                ctx.font = "15px Calibri";
                ctx.fillText('<---------------', wrapperX + 50, this.y - 10);
                ctx.font = prevFont;
                ctx.fillStyle = prevFill;

                var prevFill = ctx.strokeStyle,
                    prevLine = ctx.lineWidth;
                ctx.lineCap = 'round';
                ctx.lineWidth = this.height;
                ctx.strokeStyle = fillColor;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.width, this.y);
                ctx.stroke();
                ctx.strokeStyle = prevFill;
                ctx.lineWidth = prevLine;
            };
            this.dragStart = function(mouse) {
                this.startX = mouse.x;
            };
            this.dragging = function(mouse) {
                var width = this.startX - mouse.x;
                if(width > originalWidth)
                    width = originalWidth;
                if(width > 0) {
                    this.width = originalWidth - width;
                    components.cueStick.pullBack(width);
                }
                
            };
            this.dragEnd = function(mouse) {
                if(this.width < originalWidth && this.width >= 0) {
                    components.cueStick.reset();
                }
                this.width = originalWidth;
            };

            this.hitTest = function(ctx, mouse) {
                var x = mouse.x,
                    y = mouse.y,
                    hitY = this.y - this.height / 2;
                return (x > this.x && x < this.x + this.width && y > hitY && y < hitY + this.height)
            };
        }

        function Ball(ballRadius, color, x, y, number, components) {
            var friction = 0.95;

            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = ballRadius;
            this.mass = 1;
            this.vx = 0;
            this.vy = 0;
            this.visible = true;
            this.animate = function(ctx) {
                if(this.animating) {
                    this.vy *= friction;
                    this.vx *= friction;
                    this.y += this.vy;
                    this.x += this.vx;
                    var balls = components.balls;
                    
                    checkWalls(this, components.board);
                    if(isBallPocketed(ctx, this, components.board)) {
                        this.visible = false;
                    }

                    //Save some calculation as after that there is no visual effect
                    if(Math.abs(this.vy) < 0.001) {
                        this.animating = false;
                    }
                }
            };
            this.draw = function(ctx) {
                this.animate(ctx);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                //Draw text and white circle
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 7, 0, (Math.PI * 2), true);
                ctx.fill();
                ctx.strokeText(number, this.x - 3, this.y + 3.5);
            };
        }
        function CueBall(ballRadius, color, x, y, number, components) {
            var friction = 0.95;

            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = ballRadius;
            this.mass = 1;
            this.vx = 0;
            this.vy = 0;
            this.animate = function() {
                if(this.animating) {
                    this.vy *= friction;
                    this.vx *= friction;
                    this.y += this.vy;
                    this.x += this.vx;
                    checkWalls(this, components.board);
                    var balls = components.balls;
                    for (var ballA, i = 0; i < balls.length; i++) {
                        ballA = balls[i];
                        checkCollision(ballA, this);
                    }

                    //Save some calculation as after that there is no visual effect
                    if(Math.abs(this.vy) < 0.001) {
                        this.animating = false;
                        components.cueStick.visible = true;
                        components.cueStick.setBounds();
                    }
                }
            };
            this.draw = function(ctx) {
                this.animate();
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            };
        }

        function CueStick(board, components) {
            var color = '#FFAA00',
                me = this;
                
            function repositionPredictionLine() {
                var predictionLine = components.predictionLine,
                    cueBall = components.cueBall,
                    board = components.board,
                    capWidth = 2;        
                    
                predictionLine.x = cueBall.x + Math.cos(me.rotation - Math.PI) * (cueBall.radius + capWidth);
                predictionLine.y = cueBall.y + Math.sin(me.rotation - Math.PI) * (cueBall.radius + capWidth);
                
                var remainingHeight,
                    remainingWidth;
                if(me.rotation > 0) {
                    remainingHeight = board.y + capWidth - predictionLine.y;
                }
                else {
                    remainingHeight = board.y + board.height - capWidth - predictionLine.y;
                }
                
                remainingWidth = remainingHeight / Math.tan(me.rotation);

                predictionLine.toX = predictionLine.x + remainingWidth;
                predictionLine.toY = predictionLine.y + remainingHeight;
            }

            this.width = 8;
            this.height = board.height / 2.5;
            this.vy = 0;
            this.vx = 0;
            this.mass = 1.5;
            this.rotation = 90 * Math.PI / 180;
            this.radius = 4;
            this.visible = true;
            
            this.setBounds = function(pulledLength) {
                var cueBall = components.cueBall,
                    radius = cueBall.radius + (pulledLength || 0);

                this.originalX = this.x = cueBall.x + Math.cos(this.rotation) * (radius + 4);
                this.originalY = this.y = cueBall.y + Math.sin(this.rotation) * (radius + 4);
                this.toX = cueBall.x + Math.cos(this.rotation) * (radius + this.height + 4);
                this.toY = cueBall.y + Math.sin(this.rotation) * (radius + this.height + 4);
            };
            this.draw = function(ctx) {
                if(this.visible) {
                    this.animate(ctx);
                    
                    var prevStroke = ctx.strokeStyle,
                        prevLine = ctx.lineWidth;
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.lineWidth = this.width;
                    ctx.lineCap = 'round';
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.toX, this.toY);
                    ctx.stroke();
                    ctx.strokeStyle = prevStroke;
                    ctx.lineWidth = prevLine;
                }
            };
            this.dragStart = function() {
                components.predictionLine.visible = true;
            };
            this.dragging = function(mouse) {
                var cueBall = components.cueBall,
                    dy = mouse.y - cueBall.y,
                    dx = mouse.x - cueBall.x;

                this.rotation = Math.atan2(dy, dx);
                this.setBounds();
                repositionPredictionLine()
            };
            this.dragEnd = function() {};
            this.hitTest = function(ctx, mouse) {
                ctx.beginPath();
                ctx.moveTo(this.x - 5, this.y - 5);
                ctx.lineTo(this.x + 5, this.y + 5);
                ctx.lineTo(this.toX + 5, this.toY + 5);
                ctx.lineTo(this.toX - 5, this.toY - 5);
                return ctx.isPointInPath(mouse.x, mouse.y);
            };
            this.pullBack = function(width) {
                this.setBounds(width);
                this.pulledWidth = width;
                components.predictionLine.visible = false;
            };
            this.animate = function(ctx) {
                if(this.animating) {
                    var cueBall = components.cueBall;
                    this.y += this.vy;
                    this.x += this.vx;
                    ctx.beginPath();
                    ctx.arc(cueBall.x, cueBall.y, cueBall.radius, 0, 2 * Math.PI);
                    if(checkCollision(cueBall, this, cueBall.radius)) {
                        this.y = this.originalY;
                        this.x = this.originalX;
                        this.animating = false;
                        this.vy = 0;
                        this.vx = 0;
                        this.visible = false;
                    }
                }
            };
            this.reset = function() {
                this.animating = true;
                this.speed = - this.pulledWidth / this.width * 1.5;
                this.vx = Math.cos(this.rotation) * this.speed;
                this.vy = Math.sin(this.rotation) * this.speed;
            };

            this.setBounds();
        }

        function PredictionLine(board, components) {
            var cueStick = components.cueStick,
                cueBall = components.cueBall,
                capWidth = 2;      
                
            this.visible = true;
            this.x = cueBall.x + Math.cos(cueStick.rotation - Math.PI) * (cueBall.radius + capWidth);
            this.y = cueBall.y + Math.sin(cueStick.rotation - Math.PI) * (cueBall.radius + capWidth);
            this.toX = this.x;
            this.toY = board.y;
            this.draw = function (ctx) {
                if(this.visible) {
                    var prevStroke = ctx.strokeStyle,
                        lineWidth = ctx.lineWidth;

                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 4;
                    ctx.globalAlpha = 0.9;
                    ctx.dottedLine(this.x, this.y, this.toX, this.toY, 7);
                    ctx.strokeStyle = prevStroke;
                    ctx.lineWidth = lineWidth;
                    ctx.globalAlpha = 1;
                }        
            }
        }

        function checkWalls(ball, board) {
            var bounce = -0.7;
            if (ball.x + ball.radius > board.x + board.width) {
                ball.x = board.x + board.width - ball.radius;
                ball.vx *= bounce;
            } else if (ball.x - ball.radius < board.x) {
                ball.x = ball.radius + board.x;
                ball.vx *= bounce;
            }
            if (ball.y + ball.radius > board.y + board.height) {
                ball.y = board.y + board.height - ball.radius;
                ball.vy *= bounce;
            } else if (ball.y - ball.radius < board.y) {
                ball.y = ball.radius + board.y;
                ball.vy *= bounce;
            }
        }

        function isBallPocketed(ctx, ball, board) {
            var angle = Math.atan2(ball.vy, ball.vx),
                speed = ball.vx / Math.cos(angle);

            ctx.beginPath();
            ctx.arc(board.x, board.y, board.holeRadius, 0, Math.PI * 2);
            if(speed < 4 && ctx.isPointInPath(ball.x, ball.y)) {
                return true;
            }
            ctx.beginPath();
            ctx.arc(board.x + board.width, board.y, board.holeRadius, 0, Math.PI * 2);
            if(speed < 4 && ctx.isPointInPath(ball.x, ball.y)) {
                return true;
            }
            ctx.beginPath();
            ctx.arc(board.x + board.width, board.y + board.height, board.holeRadius, 0, Math.PI * 2);
            if(speed < 4 && ctx.isPointInPath(ball.x, ball.y)) {
                return true;
            }
            ctx.beginPath();
            ctx.arc(board.x, board.y + board.height, board.holeRadius, 0, Math.PI * 2);
            if(speed < 4 && ctx.isPointInPath(ball.x, ball.y)) {
                return true;
            }
        }

        function rotate (x, y, sin, cos, reverse) {
            return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
            };
        }

        function checkCollision(ball0, ball1) {
            var dx = ball1.x - ball0.x,
                dy = ball1.y - ball0.y,
                dist = Math.sqrt(dx * dx + dy * dy);

            //collision handling code here
            if (dist < ball0.radius + ball1.radius) {
                //calculate angle, sine, and cosine
                var angle = Math.atan2(dy, dx),
                    sin = Math.sin(angle),
                    cos = Math.cos(angle),
                    //rotate ball0's position
                    pos0 = {x: 0, y: 0}, //point
                    //rotate ball1's position
                    pos1 = rotate(dx, dy, sin, cos, true),
                    //rotate ball0's velocity
                    vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
                    //rotate ball1's velocity
                    vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
                    //collision reaction
                    vxTotal = vel0.x - vel1.x;
                vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
                        (ball0.mass + ball1.mass);
                vel1.x = vxTotal + vel0.x;

                var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                    overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
                    pos0.x += vel0.x / absV * overlap;
                    pos1.x += vel1.x / absV * overlap; 

                //rotate positions back
                var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                    pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

                //adjust positions to actual screen positions
                ball1.x = ball0.x + pos1F.x;
                ball1.y = ball0.y + pos1F.y;
                ball0.x = ball0.x + pos0F.x;
                ball0.y = ball0.y + pos0F.y;

                //rotate velocities back
                var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                    vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
                ball0.vx = vel0F.x;
                ball0.vy = vel0F.y;
                ball1.vx = vel1F.x;
                ball1.vy = vel1F.y;

                ball0.animating = true;
                ball1.animating = true;

                return true;
            }
            else {
                return false;
            }
        }

        function detectCollision(point0, point1, minDist) {
            var dx = point1[0] - point0[0],
                dy = point1[1] - point0[1];
            return Math.sqrt(dx * dx + dy * dy) <= minDist || 0;
        }

        function parseColor(color) {
            return '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }

        function listenEvents(canvas, ctx, mouse, components) {
            var comps = [components.striker, components.cueStick],
                offsetLeft = 0,
                offsetTop = 0,
                canvasClone = canvas;
            
            //Find the canvas left and top offeset
            do {
                offsetLeft += canvasClone.offsetLeft;
                offsetTop += canvasClone.offsetTop;
            } while (canvasClone = canvasClone.offsetParent);
                
            //Get relative mouse position of Canvas
            function updateMouseXY(e) {
                mouse.x = e.pageX - offsetLeft;
                mouse.y = e.pageY - offsetTop;
            };

            function onMouseDown() {
                for(var i = 0; i < comps.length; i++) {
                    if(comps[i].hitTest(ctx, mouse)) {
                        comps[i].dragStart(mouse);
                        comps[i].drag = true;
                    }
                }
            }

            function onMouseMove() {
                canvas.style.cursor = 'default';
                for(var i = 0; i < comps.length; i++) {
                    if(comps[i].hitTest(ctx, mouse)) {
                        canvas.style.cursor = 'pointer';
                    }
                    if(comps[i].drag) {
                        comps[i].dragging(mouse);
                    }
                }
            }
            function onMouseUp() {
                for(var i = 0; i < comps.length; i++) {
                    if(comps[i].drag) {
                        comps[i].dragEnd();
                        comps[i].drag = false;
                    }
                }
            }

            canvas.addEventListener('mousedown', function(e) {
                updateMouseXY(e);
                onMouseDown();
            });
            canvas.addEventListener('touchstart', function(e) {
                updateMouseXY(e.touches[0]);
                e.preventDefault();
                onMouseDown();
            });

            canvas.addEventListener('mousemove', function(e) {
                updateMouseXY(e);
                onMouseMove();
            });
            canvas.addEventListener('touchmove', function(e) {
                updateMouseXY(e.touches[0]);
                e.preventDefault();
                onMouseMove();
            });
            document.addEventListener('mouseup', function(e) {
                onMouseUp();
            });
            canvas.addEventListener('touchend', function(e) {
                onMouseUp();
            });
        }
        
    }

    return {
        launchSpaceExploration: launchSpaceExploration,
        launnchBilliard: launnchBilliard
    };
}();