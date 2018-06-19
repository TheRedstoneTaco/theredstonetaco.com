// canvas information, width, height, greater of them, lesser of them
var canvasW, canvasH, canvasG, canvasL;
// game titles
var gameTitles = ["Triangles!", "Ballz :P", "Circlesss :D", "Confetti!"]
// index of the current game
var currentGame = 0;

$(window).ready(function() {
    
    // sizing
    canvasH = $(window).height() - $("#header").offset().top - $("#header").height();
    canvasW = $(window).width();
    canvasG = ((canvasW > canvasH) * canvasW) + ((canvasH > canvasW) * canvasH);
    canvasL = ((canvasW < canvasH) * canvasW) + ((canvasH < canvasW) * canvasH);
    $('#canvas_container').height(canvasL).width(canvasL);
    $('#canvas_container > canvas').width(canvasL).height(canvasL);

    // switching games    
    $('#prev, #next').click(function() {
        $(this).css('opacity', '0');
    });
    $('#prev').click(function() {
        $('#next').css('opacity', '1');
        if (currentGame > 0) {
           currentGame --;
           if (currentGame > 0) {
               $('#prev').css('opacity', '1');
           }
           game(currentGame);
        }
    });
    $('#next').click(function() {
        $('#prev').css('opacity', '1');
        if ((currentGame + 1) < $('#canvas_container > canvas').length) {
            currentGame ++;
            if (currentGame < $('#canvas_container > canvas').length - 1) {
                $('#next').css('opacity', '1');
            }
            game(currentGame);
        }
    });
    
    // init
    $('#prev, #next').css('opacity', '0');
    if (currentGame > 0) {
       $('#prev').css('opacity', '1');
    }
    if (currentGame < ($('#canvas_container > canvas').length - 1)) {
        $('#next').css('opacity', '1');
    }
    game(currentGame);
    
});

function game(index) {
    // clear all intervals
    var topInterval = setInterval(function() {}, 9999);
    for (var i = 0; i < topInterval; i++) {
        clearInterval(i);
    }
    // hide and show
    var canvases = $('#canvas_container > canvas');
    canvases.hide();
    $(canvases[index]).show();
    $("#currentGame").text(gameTitles[index]);
    // run
    eval('game_' + index + '();');
}

function game_0() {
    
  // abstracted triangles function call
  triangles("#triangles_1", 35, "1.5%", "5%", canvasL);

    // abstracted triangles function (please use with a square canvas)
    function triangles(selector, amount, speed, size, dimension) {
      // ^ speed and size are like this: "26%"
      // so we're just gonna convert below based on canvas width
      
      // canvas
      var canvas = document.querySelector(selector);
      var ctx = canvas.getContext("2d");
      
      // variables
      var cW = dimension, cH = dimension;
      var triangles = [];
      var speed = (speed.slice(0, speed.length - 1) / 100) * dimension;
      var size = (size.slice(0, size.length - 1) / 100) * dimension;
      var fps = 30;
      var linkRange = cW / 8;
      // <resolution hack>
      var scaleFactor = 3;
      canvas.width = dimension * scaleFactor;
      canvas.height = dimension * scaleFactor;
      canvas.style.width = dimension + "px !important";
      canvas.style.height = dimension + "px !important";
      ctx.scale(scaleFactor, scaleFactor);
      // </resolution hack>
      
      // functions
      function randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      function sin(degrees) {
        return Math.sin(degrees * (Math.PI / 180));
      }
      function cos(degrees) {
        return Math.cos(degrees * (Math.PI / 180));
      }
      function rand(min, max) {
        return min + ~~(Math.random() * (max - min + 1));
      }
      function inRange(p1, p2, distance) {
        return Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        ) <= distance;
      }
      function skeleton(t) {
        ctx.beginPath();
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
        ctx.lineTo(t.x3, t.y3);
        ctx.closePath();
        ctx.strokeStyle = t.color;
        ctx.lineWidth = t.thickness;
        ctx.stroke();
      }
      
      // triangle constructor
      var Triangle = function(x, y, vX, vY, color, thickness) {
        this.x = x;
        this.y = y;
        // <math>
        this.x1 = x + (cos(30) * size);
        this.y1 = y - (sin(30) * size);
        this.x2 = x;
        this.y2 = y + size;
        this.x3 = x - (cos(30) * size);
        this.y3 = y - (sin(30) * size);
        // </math>
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.thickness = thickness;
      }
      Triangle.prototype.update = function() {
        if ((this.x + this.vX) > cW || (this.x + this.vX) < 0) {
          this.vX *= -1;
        }
        if ((this.y + this.vY) > cH || (this.y + this.vY) < 0) {
          this.vY *= -1;
        }
        this.x += this.vX;
        this.y += this.vY;
        this.x1 += this.vX;
        this.x2 += this.vX;
        this.x3 += this.vX;
        this.y1 += this.vY;
        this.y2 += this.vY;
        this.y3 += this.vY;
      }
    
      // spawn triangles
      for (var i = 0; i < amount; i++) {
        var x = rand(0, cW);
        var y = rand(0, cH);
        var vX = rand(speed * -1, speed);
        var vY = rand(speed * -1, speed);
        var color = randomColor();
        var thickness = rand(1, 5);
        triangles.push(new Triangle(x, y, vX, vY, color, thickness));
      }
      
      // to draw
      function draw() {
        // clear
        ctx.clearRect(0, 0, cW, cH);
        // iterate
        triangles.forEach(function(t, index) {
          // update
          t.update();
          // draw (manual for functionality + customization)
          skeleton(t);
          triangles.forEach(function(nearby, secondary_index) {
            if (index == secondary_index) {
              return;
            }
            if (inRange(t, nearby, linkRange)) {
              // (remember ctx is still focused on t)
              ctx.fillStyle = t.color;
              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(t.x, t.y);
              ctx.lineTo(nearby.x, nearby.y);
              ctx.closePath();
              ctx.stroke();
            }
          });
        });
      }
      
      // to animate
      function animate() {
        setInterval(draw, 1000 / fps);
      }
      
      animate();
      
    }
    
}

function game_1() {
    
    balls("#balls_1", 35, "1.5%", "2%", canvasL);
    
    function balls(selector, amount, speed, size, dimension) {
        
        // canvas
        var canvas = document.querySelector(selector);
        var ctx = canvas.getContext("2d");
        
        // variables
        var cW = dimension, cH = dimension;
        var balls = [];
        var speed = (speed.slice(0, speed.length - 1) / 100) * dimension;
        var size = (size.slice(0, size.length - 1) / 100) * dimension;
        var fps = 30;
        var linkRange = cW / 8;
        // <resolution hack>
        var scaleFactor = 3;
        canvas.width = dimension * scaleFactor;
        canvas.height = dimension * scaleFactor;
        canvas.style.width = dimension + "px !important";
        canvas.style.height = dimension + "px !important";
        ctx.scale(scaleFactor, scaleFactor);
        // </resolution hack>
      
        // functions
        function randomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        function rand(min, max) {
          return min + ~~(Math.random() * (max - min + 1));
        }
        function inRange(p1, p2, distance) {
          return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
          ) <= distance;
        }
        
        // triangle constructor
        var Ball = function(x, y, vX, vY, color) {
          this.x = x;
          this.y = y;
          this.vX = vX;
          this.vY = vY;
          this.color = color;
        }
        Ball.prototype.update = function() {
          if ((this.x + this.vX) > cW || (this.x + this.vX) < 0) {
            this.vX *= -1;
          }
          if ((this.y + this.vY) > cH || (this.y + this.vY) < 0) {
            this.vY *= -1;
          }
          this.x += this.vX;
          this.y += this.vY;
        }
        Ball.prototype.draw = function() {
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        // spawn triangles
        function randBall() {
            var x = rand(0, cW);
            var y = rand(0, cH);
            var vX = rand(speed * -1, speed);
            var vY = rand(speed * -1, speed);
            var color = randomColor(); 
            var newBall = new Ball(x, y, vX, vY, color);
            balls.push(newBall);
        }
        for (var i = 0; i < amount; i++) {
            randBall();
        }
        
        // to draw
        function draw() {
          // clear
          ctx.clearRect(0, 0, cW, cH);
          // iterate
          balls.forEach(function(b, index) {
            // update
            b.update();
            // draw
            b.draw();
            // draw (manual for functionality + customization)
            balls.forEach(function(nearby, secondary_index) {
              if (index == secondary_index) {
                return;
              }
              if (inRange(b, nearby, linkRange)) {
                // (remember ctx is still focused on t)
                ctx.beginPath();
                ctx.moveTo(b.x, b.y);
                ctx.lineTo(nearby.x, nearby.y);
                ctx.closePath();
                ctx.strokeStyle = b.color;
                ctx.lineWidth = 5;
                ctx.stroke();
              }
            });
          });
        }
        
        // to animate
        function animate() {
          setInterval(draw, 1000 / fps);
        }
        
        animate();
        
    }
    
}

// courtesy of: https://codepen.io/TheRedstoneTaco/pen/NzaLNy
function game_2() {
    
    circles("#circles_1", 35, "1.5%", "1%", canvasL);
    
    function circles(selector, amount, speed, size, dimension) {

        var canvas = document.querySelector(selector);
        var ctx = canvas.getContext('2d');
        var fps = 30;
        var particles = [];
        var cW = dimension, cH = dimension;
        var speed = (speed.slice(0, speed.length - 1) / 100) * dimension;
        var size = (size.slice(0, size.length - 1) / 100) * dimension;
        var colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];
 
        // <resolution hack>
        var scaleFactor = 3;
        canvas.width = dimension * scaleFactor;
        canvas.height = dimension * scaleFactor;
        canvas.style.width = dimension + "px !important";
        canvas.style.height = dimension + "px !important";
        ctx.scale(scaleFactor, scaleFactor);
        // </resolution hack>
        
        function Factory(){  
          this.x =  Math.round( Math.random() * cW);
          this.y =  Math.round( Math.random() * cH);
          this.rad = size;
          this.rgba = colors[ Math.round( Math.random() * 3) ];
          this.vx = rand(speed * -1, speed);
          this.vy = rand(speed * -1, speed);
        }
        
        function rand(min, max) {
          return min + ~~(Math.random() * (max - min + 1));
        }
           
        function draw(){
          
          ctx.clearRect(0, 0, dimension, dimension);
          
          ctx.globalCompositeOperation = 'lighter';
          for(var i = 0;i < amount; i++){
            var temp = particles[i];
            var factor = 1;
             
            for(var j = 0; j<amount; j++){
              
               var temp2 = particles[j];
               ctx.linewidth = 0.5;
              
               if(temp.rgba == temp2.rgba && findDistance(temp, temp2) < (dimension / 8)){
                  ctx.strokeStyle = temp.rgba;
                  ctx.beginPath();
                  ctx.moveTo(temp.x, temp.y);
                  ctx.lineTo(temp2.x, temp2.y);
                  ctx.stroke();
                  factor++;
               }
            }
            
            
            ctx.fillStyle = temp.rgba;
            ctx.strokeStyle = temp.rgba;
            
            ctx.beginPath();
            ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.arc(temp.x, temp.y, (temp.rad * 2)*factor, 0, Math.PI*2, true);
            ctx.stroke();
            ctx.closePath();
            
        
            temp.x += temp.vx;
            temp.y += temp.vy;
            
            if(temp.x > cW)temp.x = 0;
            if(temp.x < 0)temp.x = cW;
            if(temp.y > cH)temp.y = 0;
            if(temp.y < 0)temp.y = cH;
          }
        }

        function findDistance(p1,p2){  
          return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
        }

        function init() {
            for(var i = 0; i < amount; i++){
                particles.push(new Factory);
            }
        }
        init();
        
        setInterval(draw, fps);

    }
    
}

function game_3() {
  
    confetti("#confetti_1", "-2%", "2%", canvasL);

    function confetti(selector, gravity, size, dimension) {
      
      // canvas
      var canvas = document.querySelector(selector);
      var ctx = canvas.getContext("2d");
      
      // variables
      var cW = dimension, cH = dimension;
      var fps = 30;
      var gravity = (gravity.slice(0, gravity.length - 1) / 100) * dimension / fps;
      var size = (size.slice(0, size.length - 1) / 100) * dimension;
      // <resolution hack>
      (function resolutionHack() {
        var scaleFactor = 3;
        canvas.width = dimension * scaleFactor;
        canvas.height = dimension * scaleFactor;
        canvas.style.width = dimension + "px";
        canvas.style.height = dimension + "px";
        ctx.scale(scaleFactor, scaleFactor);
      })();
      // </resolution hack>
      // <axis hack>
      (function axisHack() {
        ctx.translate(0, cH);
        ctx.scale(1, -1);
      })();
      // </axis hack>
      
      // confetti
      var confetti = [];
      var Shape = function(x, y, vX, vY, color) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
      }
      
      // functions
      function randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      function sin(degrees) {
        return Math.sin(degrees * (Math.PI / 180));
      }
      function cos(degrees) {
        return Math.cos(degrees * (Math.PI / 180));
      }
      function rand(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      }
      function show(c) {
        ctx.beginPath();
        ctx.moveTo(c.x[0], c.y[0]);
        for (var i = 1; i < c.x.length; i++) {
          ctx.lineTo(c.x[i], c.y[i]);
        }
        ctx.closePath();
        ctx.fillStyle = c.color;
        ctx.fill();
      }
      function explosion(x, y, amount) {
        for (var i = 0; i < amount; i++) {
          var tmpX = [x, x + size, x + size, x];
          var tmpY = [y, y, y + size, y + size];
          var tmpAngle = rand(0, 360);
          var tmpVelocity = rand(3, 10);
          var tmpVX = cos(tmpAngle) * tmpVelocity;
          var tmpVY = sin(tmpAngle) * tmpVelocity;
          var tmpColor = randomColor({
            luminosity: "bright"
          });
          var newConfetti = new Shape(tmpX, tmpY, tmpVX, tmpVY, tmpColor);
          confetti.push(newConfetti);
        }
      }
      
      // spawn confetti
      function spawner() {
        explosion(rand(cW * 0.2, cW * 0.8), rand(cH * 0.7, cH), 80);  
      }
      spawner()
      setInterval(spawner, 1000 / 3);
      
      // drawing
      function draw() {
        ctx.clearRect(0, 0, cW, cH);
        for (var i = 0; i < confetti.length; i++) {
          var c = confetti[i];
          c.vX *= Math.pow(0.5, 1 / fps);
          c.vY += gravity;
          for (var j = 0; j < c.x.length; j++) {
            c.x[j] += c.vX;
          }
          for (var j = 0; j < c.y.length; j++) {
            c.y[j] += c.vY;
          }
          if (c.x[0] < 10 || c.x[0] > cW || c.y[0] < 10 || c.y[0] > cH) {
            confetti.splice(i, 1);
          }
          show(c);
        }
      }
      var animator = setInterval(draw, 1000 / fps);
      
    }
}