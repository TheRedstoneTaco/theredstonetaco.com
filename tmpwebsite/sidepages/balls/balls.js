// main game stuffs
var w, h, $canvas, canvas, ctx;
var fps = 60;
var gameInterval;
// ball stuffs
var ballWidth = 10, ballHeight = 10, maxVX = 10, maxVY = 10;
function newBall() {
  return {
    x: 0,
    y: 0,
    vX: 0,
    vY: 0,
    color: "rgb(0, 0, 0)"
  }
}
var balls = [], count = 0;
var ballsPerClick = 1;

//  on ready
$(document).ready(function() {
  // set up variables
  init();
  // bind click events
  bind();
  // start game
  start();
});

function init() {
  // set variables
  w = $(window).width();
  h = $(window).height();
  $canvas = $("#game");
  canvas = document.getElementById("game");
  canvas.width = w; canvas.height = h;
  ctx = canvas.getContext("2d");
  // set up text
  ctx.font = "30px monospace";
  drawSettings();
}

function bind() {
  // on click, create balls
  $canvas.click(function(e) {
    if (inRange(e.clientX, e.clientY, 50, (h / 2) - 50, 50)) {
      ballsPerClick ++;
    } else if (inRange(e.clientX, e.clientY, 50, (h / 2) + 50, 50)) {
      if (ballsPerClick >= 1) {
        ballsPerClick --;
      }
    } else {
      for (var i = 0; i < ballsPerClick; i++) {
        createBall();
      }
    }
  });
}

// to create a ball
function createBall(x, y, vX, vY, color) {
  // create new ball
  var ball = newBall();
  // xponent
  if (x != undefined) {
    ball.x = x;
  } else {
    ball.x = (Math.random() * (w - (ballWidth * 2))) + ballWidth;
  }
  // yponent
  if (y != undefined) {
    ball.y = y;
  } else {
    ball.y = (Math.random() * (h - (ballHeight * 2))) + ballHeight;
  }
  // x axis velocity
  if (vX != undefined) {
    ball.vX = vX;
  } else {
    ball.vX = Math.sin(Math.random() * Math.PI * 2) * maxVX;
  }
  // y axis velocity
  if (vY != undefined) {
    ball.vY = vY;
  } else {
    ball.vY = Math.sin(Math.random() * Math.PI * 2) * maxVY;
  }
  // color of the ball
  if (color != undefined) {
    ball.color = color;
  } else {
    // courtesy of: https://www.paulirish.com/2009/random-hex-color-code-snippets/
    ball.color = '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  // push new ball to balls array
  balls.push(ball);
  // update ball count
  count ++;
  $("#ballCount").text("balls: " + count);
}

function start() {
  // to start, set an interval
  gameInterval = setInterval(draw, 1000 / fps);
}

function drawSettings() {

  // set text color
  ctx.fillStyle = "black";

  // instructions
  ctx.fillText("click to add balls!", w / 2, h / 2);

  // ball count
  ctx.fillText("balls: " + count, w / 2, 50);

  // balls per click
  ctx.fillText("balls per click:", 50, (h / 2) - 100);
  ctx.fillText("+", 50, (h / 2) - 50);
  ctx.fillText(ballsPerClick, 50, (h / 2));
  ctx.fillText("-", 50, (h / 2) + 50);
}

function inRange(x1, x2, y1, y2, distance) {
  return Math.sqrt(Math.pow(y1 - x1, 2) + Math.pow(y2 - x2, 2)) <= distance;
}

function draw() {
  // clear!
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();

  // settings!
  drawSettings();

  // then iterate over balls
  for (var i = 0; i < count; i++) {

    // select and update current ball
    ctx.beginPath();
    var cur = balls[i];
    ctx.fillStyle = cur.color;
    if ((cur.x + cur.vX) >= w || (cur.x + cur.vX) <= 0) {
      cur.vX *= -1;
    }
    if ((cur.y + cur.vY) >= h || (cur.y + cur.vY) <= 0) {
      cur.vY *= -1;
    }
    cur.x += cur.vX;
    cur.y += cur.vY;

    // draw lines to any nearby balls
    for (var j = 0; j < count; j++) {
      if (j != i) {
        if (inRange(cur.x, cur.y, balls[j].x, balls[j].y, 250)) {
          ctx.moveTo(cur.x, cur.y);
          ctx.lineTo(balls[j].x, balls[j].y);
          ctx.strokeStyle = cur.color;
          ctx.stroke();
        }
      }
    }

    // then draw current ball
    ctx.arc(cur.x, cur.y, ballWidth, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

  }

}
