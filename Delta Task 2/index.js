var canvas, ctx, count = 0, speed = 0, x_coordinate = 0, y_coordinate = 0, key_press = false, req_anim_frame, key_value = 0, sprint = [], jump_bonus = true, in_the_air = false;


sprint[0] = 5;  // up
sprint[1] = 5;  // down
sprint[2] = 3;  // left
sprint[3] = 3;  // right



window.onload = function() {
    var canvas_initialize = '<canvas id="canvas" width=' + (screen.width * 0.98) + ' height=' + (screen.height * 0.85) + '></canvas>';
    document.getElementById("canvas_div").innerHTML = canvas_initialize;
    document.getElementById("canvas").style.borderStyle = 'solid';
    document.getElementById("canvas").style.borderWidth = '3px';
    document.getElementById("canvas").style.borderRadius = '10px';
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(84, 205, 89)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    x_coordinate = canvas.width / 2 - 40;
    y_coordinate = canvas.height / 2 - 50;
    var img=document.createElement('img');
    img.src='ground.png';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, canvas.height / 2, canvas.width, canvas.height / 2)
    }
}



document.onkeyup = checkKeyUp;

document.onkeydown = function checkKeyDown(e) {

    e = e || window.event;

    if (e.keyCode == '38') {                // up arrow
        if(!key_press) {
            key_press = true;
            if(key_value != 3)
                setTimeout(function() {
                    key_value = 4;
                    jump_bonus = false;
                }, 200);
            key_value = 3;
            count = 0;
        }
    }
    
    else if (e.keyCode == '40') {          // down arrow
    }
    
    else if (e.keyCode == '37') {           // left arrow
        if(!key_press || jump_bonus) {
            key_press = true;
            jump_bonus = false;
            if(key_value != 2)
                setTimeout(function() {
                    key_value = 0;
                    key_press = false;
                    jump_bonus = true;
                }, 400);
            key_value = 2;
            count = 0;
        }
    }
    
    else if (e.keyCode == '39') {           // right arrow
        if(!key_press || jump_bonus) {
            key_press = true;
            jump_bonus = false;
            if(key_value != 1)
                setTimeout(function() {
                    key_value = 0;
                    key_press = false;
                    jump_bonus = true;
                }, 200);
            key_value = 1;
            count = 0;
        }
    }

}


function checkKeyUp(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        key_press[0] = 0;// up arrow
    }
    else if (e.keyCode == '40') {
        key_press[1] = 0;// down arrow
    }
    else if (e.keyCode == '37') {
        key_press[2] = 0;// left arrow
    }
    else if (e.keyCode == '39') {
        key_press[3] = 0;// right arrow
    }

}


function show_image(id, x, y) {
    var img=document.createElement('img');
        img.src='pain.png';
        img.onload = function () {
        if(id == 0)
            ctx.drawImage(img, 10, 84, 40, 45, x, y, 40, 50);
        else if(id == 1)
            ctx.drawImage(img, 55, 84, 40, 45, x, y, 40, 50);
        else if(id == 2)
            ctx.drawImage(img, 110, 84, 40, 45, x, y, 40, 50);
        else if(id == 3)
            ctx.drawImage(img, 153, 84, 40, 45, x, y, 40, 50);
        else if(id == 4)
            ctx.drawImage(img, 197, 84, 40, 45, x, y, 40, 50);
        else if(id == 5)
            ctx.drawImage(img, 240, 84, 40, 45, x, y, 40, 50);
        else if(id == 6)
            ctx.drawImage(img, 282, 84, 40, 45, x, y, 40, 50);
        else if(id == 7)
            ctx.drawImage(img, 327, 84, 40, 45, x, y, 40, 50);
        else if(id == 22)
            ctx.drawImage(img, 1, 2, 40, 50, x, y-20, 40, 70);
    }
}


var tI = setInterval(show_image_call, 1);


function show_image_call() {
    if(y_coordinate < (canvas.height / 2) - 45)
        in_the_air = true;
    if(key_value == 0) {
        if(in_the_air)
            key_value = 4;
    }
    if(y_coordinate > ((canvas.height / 2)) - 50) {
        key_value = 0;
        y_coordinate = (canvas.height / 2) - 50;
        key_press = false;
        jump_bonus = true;
    }
    if(x_coordinate > (canvas.width) - 45) {
        key_value = 0;
        x_coordinate = canvas.width - 45;
        key_press = false;
    }
    if(x_coordinate < 1) {
        key_value = 0;
        x_coordinate = 1;
        key_press = false;
    }
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height / 2);
    ctx.fillStyle = "rgb(93, 214, 83)";
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
        
        
    if(key_value == 0)
        waiting_state();
    else if(key_value == 1)
        dash_sprite_right();
    else if(key_value == 2)
        dash_sprite_left();
    else if(key_value == 3)
        dash_sprite_up();
    else if(key_value == 4)
        dash_sprite_down();
    if(speed % 20 == 0) {
        count = count % 7;
        count++;
    }
    speed = speed % 21;
    speed++;
    if(!tI)
        tI = setInterval(show_image_call, 1);
    document.getElementById("y_coordinate_print").innerHTML = y_coordinate + "||" + ((canvas.height)/2 - 50);
}


function waiting_state() {
    show_image(22, x_coordinate, y_coordinate);
}


function simple_running() {
    if(x_coordinate >= 0 && x_coordinate <= (canvas.width - 45) && y_coordinate >= 0 && y_coordinate <= (canvas.height / 2 - 50))
        show_image(count, x_coordinate, y_coordinate);
}


function dash_sprite_right() {
    x_coordinate += sprint[3];
    if(x_coordinate >= 0 && x_coordinate <= (canvas.width - 45) && y_coordinate >= 0 && y_coordinate <= (canvas.height / 2 - 50))
        show_image(count, x_coordinate, y_coordinate);
}


function dash_sprite_left() {
    x_coordinate -= sprint[2];
    if(x_coordinate >= 0 && x_coordinate <= (canvas.width - 45) && y_coordinate >= 0 && y_coordinate <= (canvas.height / 2 - 50))
        show_image(count, x_coordinate, y_coordinate);
}


function dash_sprite_up() {
    y_coordinate -= sprint[0];
    if(x_coordinate >= 0 && x_coordinate <= (canvas.width - 45) && y_coordinate >= 0 && y_coordinate <= (canvas.height / 2 - 50))
        show_image(count, x_coordinate, y_coordinate);
}


function dash_sprite_down() {
    y_coordinate += sprint[1];
    if(x_coordinate >= 0 && x_coordinate <= (canvas.width - 45) && y_coordinate >= 0 && y_coordinate <= (canvas.height / 2 - 50))
        show_image(count, x_coordinate, y_coordinate);
}
