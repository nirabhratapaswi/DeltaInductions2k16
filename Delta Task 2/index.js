var canvas, ctx, translateXlength = 0, X = -10/3, intervalGround, gameState = 0, bounceHeight = 0, bounceDepth = 0, bounceHeightStatus = 4, bounceDepthStatus = 4, yClearance = 0, xClearance = 0, jumpStatus = 0;


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            document.getElementById("div01").style.backgroundColor = "yellow";
            if(gameState == 0) {
                intervalGround = setInterval(StartGame, 100);
                gameState = 1;
            }
            break;
        case 38:
            document.getElementById("div01").style.backgroundColor = "green";
            if(bounceHeightStatus == 4 && jumpStatus == 0) {
                bounceHeightStatus = 0;
                jumpStatus = 1;
            }
            break;
        case 39:
            document.getElementById("div01").style.backgroundColor = "red";
            break;
        case 40:
            document.getElementById("div01").style.backgroundColor = "blue";
            if(bounceDepthStatus == 4) {
                bounceDepthStatus = 0;
            }
            break;
    }
};


window.onload = function() {
    draw();
}


function draw() {
    canvas = document.getElementById("gameArea");
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width/2 - 26, canvas.height/2 - 26, 25, 25);
    ctx.moveTo(0, canvas.height/2);
    ctx.translate(0, canvas.height/2);
    ctx.lineTo(canvas.width, 0);
    ctx.moveTo(0, canvas.height/2);
    ctx.stroke();
    var i = 0;
    
    for(i = 0; i < 30; i++) {
        ctx.translate(10, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, 10);
        ctx.moveTo(0, 0);
        ctx.stroke();
        translateXlength += 10;
    }
    ctx.translate(-translateXlength, 0);
    ctx.moveTo(0, 0);
    translateXlength = 0;
}


function animate() {
    document.getElementById("div01").innerHTML = jumpStatus;
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width/2 - 26, canvas.height/2 - 26 + bounceHeight + bounceDepth, 25, 25);
    ctx.moveTo(0, canvas.height/2);
    ctx.translate(0, canvas.height/2);
    ctx.lineTo(canvas.width, 0);
    ctx.moveTo(0, canvas.height/2);
    ctx.stroke();
    var i = 0;
    ctx.translate(X, 0);
    for(i = 0; i < 31; i++) {
        ctx.translate(10, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, 10);
        ctx.moveTo(0, 0);
        ctx.stroke();
        translateXlength += 10;
    }
    ctx.translate(-translateXlength, 0);
    ctx.moveTo(0, 0);
    translateXlength = 0;
    if(X == -10/3)
        X = -20/3;
    else if(X == -20/3)
        X = -10;
    else if(X == -10)
        X = -10/3;
    if(bounceHeightStatus <= 3) {
        bounceHeight -= 5;
        yClearance += 5;
        bounceHeightStatus += 1;
    }
    else {
        bounceHeightStatus = 4;
        bounceDepthStatus = 0;
    }
    if(bounceDepthStatus <= 3 && yClearance > 0) {
        bounceDepth += 5;
        yClearance -= 5;
        bounceDepthStatus += 1;
    }
    else {
        bounceDepthStatus = 4;
    }
    if(yClearance <= 0)
        jumpStatus = 0;
}


function StartGame() {
    ctx.clearRect(0, -canvas.height/2, canvas.width*2, canvas.height);
    ctx.closePath();
    animate();
}


function bounceUp() {
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width/2 - 36, canvas.height/2 - 36, 25, 25);
}
