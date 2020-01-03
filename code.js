const playground = {
    resizeCanvas: function(){
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        canvas.width = ww > wh ? wh : ww;
        canvas.height = ww > wh ? wh : ww;
    },

}

const snake = {
tail:[],
color:'lime',
speed:5,
direction:'right',
}

const apple = {
pos: [],
color: 'red',
}

var canvas = document.getElementById("gameCanvas"),
ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, canvas.width, canvas.height);
playground.resizeCanvas();

//action 

function gameLogick(){
    apple.create();
    playground.update();
}