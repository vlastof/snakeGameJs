//Можно улучишть свайпы.
const FPS = 60;
// Grid game metrics system. Grid is UNITS * X, UNITS * Y;
const UNITS = 20;
const SPEED = 7;
const ACCELERATION = 0.125;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snakeMoveId;

const playground = {
  fps: FPS,
  unitSize: 0,
  resizeCanvas() {
    canvas.width = Math.min(window.innerWidth, window.innerHeight);
    canvas.height = Math.min(window.innerWidth, window.innerHeight);
  },

  drawSquare(x, y, scale, color) {
    ctx.fillStyle = color;
    ctx.fillRect((x * playground.unitSize) + scale,
      (y * playground.unitSize) + scale,
      playground.unitSize - (scale * 2),
      playground.unitSize - (scale * 2));
  },

  rand(max) {
    return (Math.floor(Math.random() * (max + 1)));
  },

  saveMouseDownPos(x, y) {
    window.onmouseup = function (event) {
      playground.calcSwipeDirection(x, y, event.clientX, event.clientY);
    };
  },

  calcSwipeDirection(x1, y1, x2, y2) {
    const dirX = x2 - x1;
    const dirY = y2 - y1;
    if (Math.abs(dirX) > Math.abs(dirY)) {
      if (dirX > 0 && snake.direction !== 'l') {
        snake.direction = 'r';
      } else if (snake.direction !== 'r') {
        snake.direction = 'l';
      }
    } else if (dirY > 0 && snake.direction !== 'u') {
      snake.direction = 'd';
    } else if (snake.direction !== 'd') {
      snake.direction = 'u';
    }
  },

  update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apple.draw();
    snake.draw();
  },
};

const snake = {
  tail: [[3, UNITS - 1], [2, UNITS - 1], [1, UNITS - 1], [0, UNITS - 1]],
  color: 'lime',
  speed: SPEED,
  acceleration: ACCELERATION,
  scale: 1,
  direction: 'r',
  move() {
    let [[x, y]] = this.tail;
    switch (this.direction) {
      case 'r':
        x += 1;
        this.tail.unshift([x, y]);
        if (x === UNITS) { this.tail[0][0] = 0; }
        break;
      case 'l':
        x -= 1;
        this.tail.unshift([x, y]);
        if (x === -1) { this.tail[0][0] = UNITS - 1; }
        break;
      case 'u':
        y -= 1;
        this.tail.unshift([x, y]);
        if (y === -1) { this.tail[0][1] = UNITS - 1; }
        break;
      case 'd':
        y += 1;
        this.tail.unshift([x, y]);
        if (y === UNITS) { this.tail[0][1] = 0; }
        break;
      default:
        // do nothing
    }
    if (this.isEating()) {
      apple.create();
      this.speed += this.acceleration;
      clearTimeout(snakeMoveId);
      setTimeout(this.callSnakeTimer(), 1000 / Math.floor(this.speed));
    } else {
      this.tail.pop();
    }
    this.checkDie();
  },

  checkDie() {
    const [[x, y]] = this.tail;

    this.tail.forEach(([ currentX, currentY ], index) => {
      if (index > 1 && x === currentX && y === currentY) {
          this.die()
      }
    });
  },

  die() {
    this.speed = SPEED;
    this.acceleration = ACCELERATION;
    this.tail = [[3, UNITS - 1], [2, UNITS - 1], [1, UNITS - 1], [0, UNITS - 1]];
    this.direction = 'r';
    apple.create();
    clearTimeout(snakeMoveId);
    setTimeout(this.callSnakeTimer(), 1000 / this.speed);
  },

  isEating() {
    const [[x, y], [x1, y1]] = this.tail;
    return ((x === apple.pos[0] && y === apple.pos[1])
         || x1 === apple.pos[0] && (y1 === apple.pos[1]));
  },

  draw() {
    this.tail.forEach( ([x, y]) => {
      playground.drawSquare(x, 
                            y, 
                            this.scale, 
                            this.color);
    });
  },

  callSnakeTimer() {
    snakeMoveId = setInterval(() => {
      snake.move();
    }, 1000 / Math.floor(snake.speed));
  },
};

const apple = {
  pos: [13, 15],
  scaleSpeed: 0.06,
  scaleMax: 1,
  scaleMin: 2,
  lowering: true,
  scale: 1,
  color: 'red',
  create() {
    this.pos[0] = playground.rand(UNITS - 1);
    this.pos[1] = playground.rand(UNITS - 1);
    let [appleX, appleY] = this.pos;
    snake.tail.forEach(([x,y]) => {
      if(x === appleX && y === appleY) {
        this.create();
      }
    });
  },

  draw() {
    if (this.lowering) { this.scale += this.scaleSpeed; } else { this.scale -= this.scaleSpeed; }
    playground.drawSquare(this.pos[0], this.pos[1], this.scale, this.color);
    if (this.scale <= this.scaleMax) { this.lowering = true; }
    if (this.scale >= this.scaleMin) { this.lowering = false; }
  },

};

function gameStart() {
  playground.resizeCanvas();
  playground.unitSize = canvas.width / UNITS;
  // action !!!

  function gameLogick() {
    window.onmousedown = function (event) {
      playground.saveMouseDownPos(event.clientX, event.clientY);
    };

    setInterval(() => {
      playground.update();
    }, 1000 / playground.fps);

    apple.create();
    snake.callSnakeTimer();
  }
  gameLogick();
}

gameStart();
