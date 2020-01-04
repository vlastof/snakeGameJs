const playground = {
    fps: 60,
    unitSize: 0,
    resizeCanvas: function(){
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        canvas.width = ww > wh ? wh : ww;
        canvas.height = ww > wh ? wh : ww;
    },
    drawSquare: function(x, y, scale, color){
        ctx.fillStyle = color;
        ctx.fillRect((x*playground.unitSize)+scale, (y*playground.unitSize)+scale, playground.unitSize-(scale*2), playground.unitSize-(scale*2)); 
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
        ctx.clearRect(0,0,canvas.width,canvas.height);
        apple.draw();
        snake.draw();
    },
}

const snake = {
tail:[[13,15], [12,15], [11,15], [10,15]],
color:'lime',
speed:4,
scale:1,
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
draw: function(){
    for(let i=0;i<this.tail.length;i++){
        playground.drawSquare(this.tail[i][0],this.tail[i][1],this.scale, this.color);
    }
},
}

const apple = {
pos: [13,15],
scaleSpeed: 0.06,
scaleMax:1,
scaleMin:2,
lowering:true,
scale:1,
color: 'red',
create: function(){
    let check = true;
    while(check){
        this.pos[0]= playground.rand(19);
        this.pos[1] = playground.rand(19);
        for(let i=0;i<snake.tail.length;i++){
            if(snake.tail[i][0]!=this.pos[0] && snake.tail[i][1]!=this.pos[1]){
                check = false;
            }
        }
    }
},
draw: function(){
    if(this.lowering){this.scale+=this.scaleSpeed;}
    else{this.scale-=this.scaleSpeed;}
    playground.drawSquare(this.pos[0],this.pos[1],this.scale,this.color);
    if(this.scale<=this.scaleMax){this.lowering=true}
    if(this.scale>=this.scaleMin){this.lowering=false}
},
}

var canvas = document.getElementById("gameCanvas"),
ctx = canvas.getContext('2d');
playground.resizeCanvas();
playground.unitSize = canvas.width/20;
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
