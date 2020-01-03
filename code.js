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
            if(dirX>0 && snake.direction != 'l'){
                snake.direction = 'r';
            } 
            else if(snake.direction != 'r'){
                snake.direction = 'l';
            }
        } 
        else{
            if(dirY>0 && snake.direction != 'u'){
                snake.direction = 'd';
            }
            else if(snake.direction != 'd'){
                snake.direction = 'u';
            }
        }
    },
    update: function(){
        //apple.draw();
        //snake.draw();
    },
}

const snake = {
tail:[[13,15], [12,15], [11,15], [10,15]],
color:'lime',
speed:0.5,
direction:'r',
move: function(){
    let x,y;
    switch (this.direction){
        case 'r':
            x = this.tail[0][0]+1;
            y = this.tail[0][1];
            this.tail.unshift([x,y]);
            this.tail.pop();
            break;
        case 'l':
            x = this.tail[0][0]-1;
            y = this.tail[0][1];
            this.tail.unshift([x,y]);
            this.tail.pop();
            break;
        case 'u':
            x = this.tail[0][0];
            y = this.tail[0][1]-1;
            this.tail.unshift([x,y]);
            this.tail.pop();
            break;
        case 'd':
            x = this.tail[0][0];
            y = this.tail[0][1]+1;
            this.tail.unshift([x,y]);
            this.tail.pop();
            break;
    }
},
}

const apple = {
pos: [],
color: 'red',
create: function(){

},
}

var canvas = document.getElementById("gameCanvas"),
ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, canvas.width, canvas.height);
playground.resizeCanvas();

//action !!!

function gameLogick(){
    apple.create();
    window.onmousedown = function(event){
        playground.saveMouseDownPos(event.clientX, event.clientY);
    }
    let updateId = setInterval(function tick() {
        playground.update();
      }, 1000/playground.fps);

      let snakeMoveId = setInterval(function tick() {
        snake.move();
      }, 1000/snake.speed);
}
gameLogick();