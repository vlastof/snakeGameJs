const playground = {
    fps: 60,
    resizeCanvas: function(){
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        canvas.width = ww > wh ? wh : ww;
        canvas.height = ww > wh ? wh : ww;
    },
    drawSquare: function(){

    },
    rand: function(max){
        return(Math.floor(Math.random()*(max+1)));
    },
    saveMouseDownPos: function(x,y){
        window.onmouseup = function(event){
            playground.calcSwipeDirection(x, y, event.clientX, event.clientY);
        }
    },
    calcSwipeDirection: function(x1, y1, x2, y2){
        let dirX, dirY;
        dirX = x2 - x1;
        dirY = y2 - y1;
        if(Math.abs(dirX) > Math.abs(dirY)){
            if(dirX>0 && snake.direction != 'left'){
                snake.direction = 'right';
            } 
            else if(snake.direction != 'right'){
                snake.direction = 'left';
            }
        } 
        else{
            if(dirY>0 && snake.direction != 'up'){
                snake.direction = 'down';
            }
            else if(snake.direction != 'down'){
                snake.direction = 'up';
            }
        }
        console.log(snake.direction);
    },
}

const snake = {
tail:[[13,15], [12,15], [11,15], [10,15]],
color:'lime',
speed:5,
direction:'right',
}

const apple = {
pos: [,],
color: 'red',
}

var canvas = document.getElementById("gameCanvas"),
ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, canvas.width, canvas.height);
playground.resizeCanvas();

//action !!!

function gameLogick(){
    //apple.create();
    window.onmousedown = function(event){
        playground.saveMouseDownPos(event.clientX, event.clientY);
    }
    let timerId = setTimeout(function tick() {
        update();
        timerId = setTimeout(tick, 1000/playground.fps); // (*)
      }, 1000,playground.fps);
}
gameLogick();

function update(){
    //apple.draw();
    //snake.draw();
}