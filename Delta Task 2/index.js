var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf, jumpState = 0, ballXval = 0, ballYval = 0, startTime, timeDiff, bounceState = 0, accelarationIndex = 0,  runDist = 0, moveDistance = 10/3, gameState = 0, obstracleHeight = 30, obstracleWidth = 20;


window.onload = function() {
    document.getElementById("divCanvas").innerHTML = '<canvas id="canvas" width="' + screen.width + '" height="' + screen.height / 2 + '"></canvas>';
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ball.draw();
    ground.draw();
}


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:    //raf = window.requestAnimationFrame(draw);           //Left
            break;
        case 38:    if(jumpState == 0) {        //Up
                        raf = window.requestAnimationFrame(drawBall);
                        jumpState = 1;
                        startTime = new Date();
                        if(gameState == 0) {
                            var startInterval = setInterval(checkHeight, 1);
                            gameState = 1;
                        }
                    }
            break;
        case 39:            //Right
            break;
        case 40:            //Down
            break;
    }
};


document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:            //Left
            break;
        case 38:            //Up
            break;
        case 39:            //Right
            break;
        case 40:            //Down
            break;
    }
};


var ball = {
    x: screen.width/2,
    y: screen.height/4 - 28,
    vx: 0,
    vy: -5,
    ax: 0,
    ay: 10,
    radius: 25,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};


var ground = {
    x: 100,
    y: 100,
    vx: 0,
    vy: -3,
    radius: 25,
    color: 'blue',
    draw: function() {
        var i = 0;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        /*for(i = 0; i < 150 + runDist; i++) {
            ctx.moveTo(i * 10 - moveDistance, canvas.height / 2);
            ctx.lineTo((i-1) * 10 - moveDistance, canvas.height / 2 + 10);
            ctx.moveTo(i * 10 - moveDistance, canvas.height / 2);
            ctx.stroke();
        }*/
        ctx.moveTo(0, canvas.height / 2);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
};


function drawGround() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ground.draw();
}


function drawBall() {
    var currentTime = new Date();
    timeDiff = currentTime.getMilliseconds() - startTime.getMilliseconds();
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
        ball.x += ball.vx;
        accelarationIndex = (-(ball.y - (canvas.height/2 - ball.radius - 2)) - 3)/76 * 4;
        if(bounceState == 1)
            accelarationIndex = -accelarationIndex;
        ball.y += ball.vy + accelarationIndex;
        document.getElementById("p01").innerHTML = accelarationIndex;
    ground.draw();
    obstracle.vx -= 1;
    obstracle.draw();
    ctx.clearRect(canvas.width - 50 + obstracle.vx, canvas.height / 2 - 1, 2, -60);
    if(obstracle.x <= 0) {
        obstracle.vx = 0;
    }
    if(bounceState <= 1)
        raf = window.requestAnimationFrame(drawBall);
    else {
        window.cancelAnimationFrame(raf);
        bounceState = 0;
        jumpState = 0;
    }
}


ball.draw();


var obstracle = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 25,
    color: 'blue',
    draw: function() {
        var i = 0;
        ctx.beginPath();
        ctx.moveTo(canvas.width - 50 + this.vx, canvas.height / 2);
        this.x = canvas.width - 50 + this.vx;
        ctx.lineTo(canvas.width - 50 + this.vx, canvas.height / 2 - obstracleHeight);
        ctx.lineTo(canvas.width - 50 - obstracleWidth + this.vx, canvas.height / 2 - obstracleHeight);
        ctx.lineTo(canvas.width - 50 + this.vx - obstracleWidth, canvas.height / 2);
        ctx.moveTo(canvas.width - 50 + this.vx - obstracleWidth, canvas.height / 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};


function checkHeight() {
    if(ball.y >= (canvas.height/2 - ball.radius - 2) || ball.y <= (canvas.height/6 + ball.radius))
    {
        ball.vy = -ball.vy;
        bounceState += 1;
        ball.y += ball.vy;
    }
    
    if(ball.y >= (canvas.height/2 - ball.radius - 2) || ball.y <= (canvas.height/6 + ball.radius))
    {
        ball.vy = -ball.vy;
        bounceState += 1;
        ball.y += ball.vy;
    }
    obstracle.vx -= 1;
    obstracle.draw();
    ctx.clearRect(canvas.width - 50 + obstracle.vx, canvas.height / 2 - 1, 1, -obstracleHeight - 1);
    if(obstracle.x <= 0) {
        obstracle.vx = 0;
        obstracleHeight = Math.ceil(Math.random() * 20) + 30;
        obstracleWidth = Math.ceil(Math.random() * 20) + 20;
    }
}
