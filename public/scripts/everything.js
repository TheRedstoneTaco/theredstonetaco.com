// width, height, greater, lesser
var w, h, g, l;
var youneedJesus;

$(document).ready(function() {
    
    // audio
    init_audio();
    
    // size stuff
    sizing();
    
    // run phase
    phase(0);
});

// courtesy of: https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals
function clearIntervals() {
  var tmp = setInterval(function() {}, 9999);
  for (var i = 0; i <= tmp; i++) {
    clearInterval(i);
  }
}

// courtesy of: https://stackoverflow.com/questions/698301/is-there-a-native-jquery-function-to-switch-elements
jQuery.fn.swapWith = function(to) {
  return this.each(function() {
    var copy_to = $(to).clone(true);
    var copy_from = $(this).clone(true);
    $(to).replaceWith(copy_from);
    $(this).replaceWith(copy_to);
  });
};

// courtesy of: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function phase(phase) {
    if (phase > 0) {
      $("#p" + (phase - 1)).remove();
    }
    $(".phase").hide();
    eval("phase" + String(phase) + "();");
}

function init_audio() {
    youneedJesus = document.getElementById("youneedJesus");
    youneedJesus.load();
    $("#youneedJesus")
      .hide();
}

function sizing() {
    
    // initialization
    w = $(window).width();
    h = $(window).height();
    g = ((w > h) * w) + ((h > w) * h);
    l = ((w < h) * w) + ((h < w) * h);
    $(".square-viewport").width(l).height(l);
    
}

function phase0() {
    $("#p0").show();
    $("#p0_square").children().each(function(index) {
        var element = $(this);
        setTimeout(function() {
            element.addClass("animated bounceInDown");
            element.css("opacity", "1");
        }, (index * 500));
    });
    $("#p0_continue").click(function() {
        phase(1);
    });
}

function phase1() {
    
    
    
    // show phase
    $("#p1").show();
    
    // play the stuff that you need Jesus
    youneedJesus.play();
    
    // variables
    var step1Done = 2000;
    var step2Done = 6500;
    var step3Done = 10000;
    var step4Done = 12000;
    var intros = [
    "bounceIn", "bounceInDown", "bounceInRight", "bounceInLeft", "bounceInUp",
    "fadeIn", "fadeInDown", "fadeInRight", "fadeInLeft", "fadeInUp",
    "flipIn", "flipInX", "flipInY",
    "lightSpeedIn",
    "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
    "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
    "zoomIn", "zoomInDown", "zoomInRight", "zoomInLeft", "zoomInUp"
    ];
    var pause = false;
    var rotateIndex = 0;
    
    
    
    // animate step1
    var dimension = $("#p1_square").width() / 3.0;
    var scale1 = anime({
      targets: '#p1_main',
      width: dimension,
      height: dimension,
      duration: step1Done,
      easing: "linear"
    });
    var scale2 = anime({
      targets: '#p1_main > *',
      fontSize: "16",
      duration: step1Done,
      easing: "linear"
    });
    $("#p1_main").addClass("shake-opacity shake-constant");
    
    // animate step2
    $("#p1_square > div:not(#p1_main)").css("opacity", "0");
    setTimeout(function() {
        $("#p1_square > div:not(#p1_main)")
            .css("opacity", "1")
            .width(dimension)
            .height(dimension)
            .each(function(index) {
                $(this).addClass("animated " + intros[Math.ceil(Math.random() * intros.length)])
            });
    }, step1Done);

    // mini0
    // courtesy of: https://codepen.io/TheRedstoneTaco/pen/NzaLNy
    function p1_mini0(doRun) {
        
        if (!doRun) {
            return;
        }
        
        var canvas = document.querySelector('#p1_canvas0'), p1_ctx0 = canvas.getContext('2d');
        var particles = [], particlesNum = 150, w = 500, h = 500;
        var colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];
        canvas.width = 0; canvas.height = 0;

        setTimeout(function() {
            canvas.width = $("#p1_mini0").width();
            canvas.height = $("#p1_mini0").height();
        }, step1Done + 250);

        function p1_Factory(){  
            this.x =  Math.round( Math.random() * w);
            this.y =  Math.round( Math.random() * h);
            this.rad = Math.round( Math.random() * 1) + 1;
            this.rgba = colors[ Math.round( Math.random() * 3) ];
            this.vx = Math.round( Math.random() * 3) - 1.5;
            this.vy = Math.round( Math.random() * 3) - 1.5;
        }
        
        function p1_draw(){
          
          if (pause) { return; }
            
          p1_ctx0.clearRect(0, 0, w, h);
          p1_ctx0.globalCompositeOperation = 'lighter';
          
          for(var i = 0; i < particlesNum; i++){
            
            var tmp = particles[i];
            var factor = 1;
            
            for(var j = 0; j < particlesNum; j++){
            
               var tmp2 = particles[j];
               p1_ctx0.linewidth = 0.5;
            
               if(tmp.rgba == tmp2.rgba && p1_findDistance(tmp, tmp2) < 50){
               
                  p1_ctx0.strokeStyle = tmp.rgba;
                  p1_ctx0.beginPath();
                  p1_ctx0.moveTo(tmp.x, tmp.y);
                  p1_ctx0.lineTo(tmp2.x, tmp2.y);
                  p1_ctx0.stroke();
                  
                  factor++;
                  
               }
               
            }
            
            p1_ctx0.fillStyle = tmp.rgba;
            p1_ctx0.strokeStyle = tmp.rgba;
            p1_ctx0.beginPath();
            p1_ctx0.arc(tmp.x, tmp.y, tmp.rad*factor, 0, Math.PI*2, true);
            p1_ctx0.fill();
            p1_ctx0.closePath();
            p1_ctx0.beginPath();
            p1_ctx0.arc(tmp.x, tmp.y, (tmp.rad + 5) * factor, 0, Math.PI*2, true);
            p1_ctx0.stroke();
            p1_ctx0.closePath();
            
            tmp.x += tmp.vx;
            tmp.y += tmp.vy;
            
            if(tmp.x > w)
                tmp.x = 0;
            if(tmp.x < 0)
                tmp.x = w;
            if(tmp.y > h)
                tmp.y = 0;
            if(tmp.y < 0)
                tmp.y = h;
            
          }
        }
        
        function p1_findDistance(p1, p2) {  
          return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }
        
        function p1_init() {
          for(var i = 0; i < particlesNum; i++){
            particles.push(new p1_Factory);
          }
        }
        
        p1_init();
    
        var p1_animated = setInterval(p1_draw, 1000 / 30);
    
    };
    
    // mini1
    // courtesy of: https://codepen.io/TheRedstoneTaco/pen/vrezPe?editors=1010
    function p1_mini1(doRun) {
        
        if (!doRun) {
            return;
        }
        
        var sun = new Image();
        var moon = new Image();
        var earth = new Image();
        // variables
        var p1_canvas1 = document.querySelector("#p1_canvas1");
        var p1_ctx1 = p1_canvas1.getContext("2d");
        var canvasDimension = $("#p1_mini1").width();
        var sunDimension = canvasDimension / 2;
        p1_canvas1.width = 0;
        p1_canvas1.height = 0;
        setTimeout(function() {
            p1_canvas1.width = canvasDimension;
            p1_canvas1.height = canvasDimension;
        }, step1Done);

        function init() {
          sun.src = 'http://downloadicons.net/sites/default/files/lovely-sun-icon-57115.png';
          moon.src = 'http://www.myiconfinder.com/uploads/iconsets/256-256-71871fdf190c83a3558339d497e50ae6-Moon.png';
          earth.src = 'http://icons.iconarchive.com/icons/treetog/junior/256/earth-icon.png';
          setInterval(draw, 30);
        }
        
        function draw() {
          
            if (pause) { return; }
            
            p1_ctx1.globalCompositeOperation = 'destination-over';
            // clear canvas
            p1_ctx1.clearRect(0, 0, 300, 300);
        
            p1_ctx1.fillStyle = 'rgba(0, 0, 0, 0.4)';
            p1_ctx1.strokeStyle = 'rgba(0, 153, 255, 0.4)';
            p1_ctx1.save();
            p1_ctx1.translate(150, 150);
        
            // Earth
            var time = new Date();
            p1_ctx1.rotate(30 * (((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()));
            p1_ctx1.translate(105, 0);
            p1_ctx1.drawImage(earth, -12, -12, canvasDimension / 8, canvasDimension / 8);
        
            // Moon
            p1_ctx1.save();
            p1_ctx1.rotate(5 * (((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()));
            p1_ctx1.translate(0, 28.5);
            p1_ctx1.drawImage(moon, -3.5, -3.5, canvasDimension / 15, canvasDimension / 15);
            p1_ctx1.restore();
        
            p1_ctx1.restore();
          
            p1_ctx1.drawImage(sun, (canvasDimension - sunDimension) / 2, (canvasDimension - sunDimension) / 2, sunDimension, sunDimension);
        
        }
        
        init();

    };
    
    // mini2
    // courtesy of: https://codepen.io/TheRedstoneTaco/pen/MXEPyw?editors=0010
    function p1_mini2(doRun) {
        
        if (!doRun) {
            return;
        }
        
        /*=============================================================================*/  
        /* Canvas Lightning v1
        /*=============================================================================*/
        var canvasLightning = function(c, cw, ch){
              
            /*=============================================================================*/  
            /* Initialize
            /*=============================================================================*/
              this.init = function(){
                this.loop();
              };    
              
            /*=============================================================================*/  
            /* Variables
            /*=============================================================================*/
              var _this = this;
              this.c = c;
              this.ctx = c.getContext('2d');
              this.cw = cw;
              this.ch = ch;
              this.mx = 0;
              this.my = 0;
              
              this.lightning = [];
              this.lightTimeCurrent = 0;
              this.lightTimeTotal = 50;
              this.lightningColor = "rgba(150, 45, 255, 0.5)";
              
            /*=============================================================================*/  
            /* Utility Functions
            /*=============================================================================*/        
            this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
            this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
              
            /*=============================================================================*/	
            /* Create Lightning
            /*=============================================================================*/
              this.createL= function(x, y, canSpawn){					
                this.lightning.push({
                  x: x,
                  y: y,
                  xRange: this.rand(5, 30),
                  yRange: this.rand(5, 25),
                  path: [{
                    x: x,
                    y: y	
                  }],
                  pathLimit: this.rand(10, 35),
                  canSpawn: canSpawn,
                  hasFired: false
                });
              };
              
            /*=============================================================================*/	
            /* Update Lightning
            /*=============================================================================*/
              this.updateL = function(){
                if (pause) { return; }
                var i = this.lightning.length;
                while(i--){
                  var light = this.lightning[i];						
                  
                  
                  light.path.push({
                    x: light.path[light.path.length-1].x + (this.rand(0, light.xRange)-(light.xRange/2)),
                    y: light.path[light.path.length-1].y + (this.rand(0, light.yRange))
                  });
                  
                  if(light.path.length > light.pathLimit){
                    this.lightning.splice(i, 1)
                  }
                  light.hasFired = true;
                };
              };
              
            /*=============================================================================*/	
            /* Render Lightning
            /*=============================================================================*/
              this.renderL = function() {
                if (pause) { return; }
                var i = this.lightning.length;
                while(i--){
                  var light = this.lightning[i];
                  
                  this.ctx.strokeStyle = this.lightningColor;
                  this.ctx.lineWidth = 3;
                  if(this.rand(0, 30) == 0){
                    this.ctx.lineWidth = 2;	
                  }
                  if(this.rand(0, 60) == 0){
                    this.ctx.lineWidth = 3;	
                  }
                  if(this.rand(0, 90) == 0){
                    this.ctx.lineWidth = 4;	
                  }
                  if(this.rand(0, 120) == 0){
                    this.ctx.lineWidth = 5;	
                  }
                  if(this.rand(0, 150) == 0){
                    this.ctx.lineWidth = 6;	
                  }	
                  
                  this.ctx.beginPath();
                  
                  var pathCount = light.path.length;
                  this.ctx.moveTo(light.x, light.y);
                  for(var pc = 0; pc < pathCount; pc++){	
                    
                    this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
                    
                    if(light.canSpawn){
                      if(this.rand(0, 100) == 0){
                        light.canSpawn = false;
                        this.createL(light.path[pc].x, light.path[pc].y, false);
                      }	
                    }
                  }
                  
                  if(!light.hasFired){
                    this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(4, 12)/100+')';
                    this.ctx.fillRect(0, 0, this.cw, this.ch);	
                  }
                  
                  if(this.rand(0, 30) == 0){
                    this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(1, 3)/100+')';
                    this.ctx.fillRect(0, 0, this.cw, this.ch);	
                  }	
                  
                  this.ctx.stroke();
                };
              };
              
            /*=============================================================================*/	
            /* Lightning Timer
            /*=============================================================================*/
              this.lightningTimer = function() {
                if (pause) { return; }
                this.lightTimeCurrent++;
                if(this.lightTimeCurrent >= this.lightTimeTotal){
                  var newX = this.rand(100, cw - 100);
                  var newY = this.rand(0, ch / 2); 
                  var createCount = this.rand(1, 3);
                  while(createCount--){							
                    this.createL(newX, newY, true);
                  }
                  this.lightTimeCurrent = 0;
                  this.lightTimeTotal = 2;
                }
              }
                
            /*=============================================================================*/	
            /* Clear Canvas
            /*=============================================================================*/
                this.clearCanvas = function() {
                  if (pause) { return; }
                  this.ctx.globalCompositeOperation = 'destination-out';
                  this.ctx.fillStyle = 'rgba(0,0,0,'+this.rand(30, 100)/100+')';
                  this.ctx.fillRect(0,0,this.cw,this.ch);
                  this.ctx.globalCompositeOperation = 'source-over';
                };
              
            /*=============================================================================*/	
            /* Animation Loop
            /*=============================================================================*/
              this.loop = function(){
                    var loopIt = function(){
                  requestAnimationFrame(loopIt, _this.c);
                  _this.clearCanvas();
                  _this.updateL();
                  _this.lightningTimer();
                  _this.renderL();	
                };
                loopIt();					
              };
              
            };
            
        /*=============================================================================*/	
        /* Check Canvas Support
        /*=============================================================================*/
        var isCanvasSupported = function(){
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
        };
        
        /*=============================================================================*/	
        /* Setup requestAnimationFrame
        /*=============================================================================*/
        var setupRAF = function(){
          var lastTime = 0;
          var vendors = ['ms', 'moz', 'webkit', 'o'];
          for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
          };
          
          if(!window.requestAnimationFrame){
            window.requestAnimationFrame = function(callback, element){
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          };
          
          if (!window.cancelAnimationFrame){
            window.cancelAnimationFrame = function(id){
              clearTimeout(id);
            };
          };
        };			
        
        /*=============================================================================*/	
        /* Define Canvas and Initialize
        /*=============================================================================*/
        $("#p1_canvas2").width(0).height(0);
        setTimeout(function() {
            if(isCanvasSupported){
                
                $("#p1_canvas2").width($("#p1_mini2").width()).height($("#p1_mini2").height());
                var c = document.querySelector('#p1_canvas2');
                var cw = $("#p1_mini2").width();
                var ch = $("#p1_mini2").height();
                var cl = new canvasLightning(c, cw, ch);				

                setupRAF();
                cl.init();
            }
        }, step1Done);
          
    };
    
    // mini3
    // courtesy of: https://codepen.io/chrisgannon/pen/EjVyXN
    function p1_mini3(doRun) {
        
        if (!doRun) {
            return;
        }
        
        setTimeout(function() {
            $("#rocketman").width($("#p1_mini3").width()).height($("#p1_mini3").height());
        }, step1Done);
        
        //var container = document.querySelector('.container');
        var jetBubbles = document.getElementsByClassName('jetBubble');
        var rocketManSVG = document.querySelector('.rocketManSVG');
        var shakeGroup = document.querySelector('.shakeGroup');
        var star = document.querySelector('.star');
        var satellite = document.querySelector('.satellite');
        var astronaut = document.querySelector('.astronaut');
        var starContainer = document.querySelector('.starContainer');
        var badgeLink = document.querySelector('#badgeLink');
        
        TweenMax.to(astronaut, 0.05, {
          y:'+=4',
          repeat:-1, 
          yoyo:true
        })
        var mainTimeline = new TimelineMax({repeat:-1}).seek(100);
        var mainSpeedLinesTimeline = new TimelineMax({repeat:-1, paused:false});
        
        mainTimeline.timeScale(2);
        
        function createJets(){
          TweenMax.set(jetBubbles, {
            attr:{
              r:'-=5'
            }
          })
          // jet bubbles
          for(var i = 0; i < jetBubbles.length; i++) {
            if (pause) { continue; }
            var jb = jetBubbles[i];    
            var tl = new TimelineMax({repeat:-1,repeatDelay:Math.random()}).timeScale(4);
            tl.to(jb, Math.random() + 1 , {
              attr:{
                r:'+=15'
              },
              ease:Linear.easeNone
            })
            .to(jb, Math.random() + 1 , {
              attr:{
                r:'-=15'
              },
              ease:Linear.easeNone
            })
            
            mainTimeline.add(tl, i/4)
          }
          //speed lines
        	for(var i = 0; i < 7; i++){
        	  if (pause) { continue; }
            var sl = document.querySelector('#speedLine' + i);
        
            var stl = new TimelineMax({repeat:-1, repeatDelay:Math.random()});
            stl.set(sl, {
              drawSVG:false
            })
            .to(sl, 0.05, {
              drawSVG:'0% 30%',
              ease:Linear.easeNone
            })
            .to(sl, 0.2, {
              drawSVG:'70% 100%',
              ease:Linear.easeNone
            })  
            .to(sl, 0.05, {
              drawSVG:'100% 100%',
              ease:Linear.easeNone
            })
             .set(sl, {
              drawSVG:'-1% -1%'
            });
        
            mainSpeedLinesTimeline.add(stl, i/23);
        }  
          //stars
        	for(var i = 0; i < 7; i++){
            if (pause) { continue; }
            var sc = star.cloneNode(true);
            starContainer.appendChild(sc);
            var calc = (i+1)/2;
           
            TweenMax.fromTo(sc, calc, {
              x:Math.random()*600,
              y:-30,
              scale:3 - calc
            }, {
              y:(Math.random() * 100) + 600,
              repeat:-1,
              repeatDelay:1,
              ease:Linear.easeNone
            })
          }
          
          rocketManSVG.removeChild(star);
        }
        
        
        var satTimeline = new TimelineMax({repeat:-1});
        satTimeline.to(satellite, 12, {
          rotation:360,
          transformOrigin:'50% 50%',
          ease:Linear.easeNone
        })
        
        TweenMax.staggerTo('.pulse', 0.8, {
          alpha:0,
          repeat:-1,
          ease:Power2.easeInOut,
          yoyo:false
        }, 0.1);
        
        TweenMax.staggerTo('.satellitePulse', 0.8, {
          alpha:0,
          repeat:-1,
          ease:Power2.easeInOut,
          yoyo:false
        }, 0.1)
        
        createJets();
        
    };
    
    // mini5
    function p1_mini5(doRun) {
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
        canvas.style.width = dimension + "px";
        canvas.style.height = dimension + "px";
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
          
          if (pause) { return; }
          
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
      // abstracted triangles function call
      $("#p1_canvas5").attr("style", "width: 0px; height: 0px");
      setTimeout(function() {
        triangles("#p1_canvas5", 20, "1.5%", "5%", $("#p1_mini5").width());
      }, step1Done + 50);
    };
    
    // mini6
    function p1_mini6(doRun) {
      
      if (!doRun) {
        return;
      }
      
      $("#p1_canvas6").width(0).height(0);
      setTimeout(function() {
        confetti("#p1_canvas6", "-2%", "2%", $("#p1_mini6").width());
      }, step1Done);
      
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
        function sin(degrees) {
          return Math.sin(degrees * (Math.PI / 180));
        }
        function cos(degrees) {
          return Math.cos(degrees * (Math.PI / 180));
        }
        function rand(min, max) {
          return min + ~~(Math.random() * (max - min + 1));
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
          
          if (pause) { return; }
          
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
        setInterval(function() {
          explosion(rand(cW * 0.2, cW * 0.8), rand(cH * 0.2, cH * 0.8), 100);
        }, 1000 / 4);
        
        // drawing
        function draw() {
          
          if (pause) { return; }
          
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
      
    };
    
    // mini7
    function p1_mini7(doRun) {
      
      if (!doRun) {
        return;
      }
      
      var arr = [
        "https://vignette.wikia.nocookie.net/clubpenguin/images/0/0b/Taco_Mexino_ICON.png",
        "https://www.deltaco.com/files/menu/item/machocomboburrito.png",
        "https://vignette.wikia.nocookie.net/battlefordreamislandfanfiction/images/2/2e/Nacho.png",
        "https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Hats-PNG/Mexican_Sombrero_Hat_Transparent_PNG_Clip_Art.png",
        "http://icons.iconarchive.com/icons/dtafalonso/android-l/256/Youtube-icon.png",
        "https://png.icons8.com/metro/1600/cross.png",
        "https://d30y9cdsu7xlg0.cloudfront.net/png/1171-200.png",
        "https://d30y9cdsu7xlg0.cloudfront.net/png/169473-200.png",
      ];
      
      $("#p1_canvas7").width(0).height(0);
      setTimeout(function() {
        images("#p1_canvas7", arr, "30%", 1000, $("#p1_mini1").width());
      }, step1Done);
    
    
      function images(selector, arr, size, duration, dimension) {
      
        // canvas
        var canvas = document.querySelector(selector);
        var ctx = canvas.getContext("2d");
        
        // variables
        var cW = dimension, cH = dimension;
        var fps = 30;
        var size = (size.slice(0, size.length - 1) / 100);
        (function resolutionHack() {
          var scaleFactor = 3;
          canvas.width = dimension * scaleFactor;
          canvas.height = dimension * scaleFactor;
          canvas.style.width = dimension + "px";
          canvas.style.height = dimension + "px";
          ctx.scale(scaleFactor, scaleFactor);
        })();
        
        // images
        var customs = [];
        var CustomImage = function(x, y, src) {
          this.x = x;
          this.y = y;
          this.opacity = 1;
          this.factor = 1;
          this.image = new Image();
          this.image.src = src;
          this.animate = function() {
            setInterval(function(obj) {
              if (pause) { return; }
              obj.opacity -= 1 / fps * 1000 / duration;
              obj.factor += 4 / fps * 1000 / duration;
              obj.x -= 200 / fps * 1000 / duration;
              obj.y -= 200 / fps * 1000 / duration;
              if (obj.opacity <= 0) {
                obj.x = rand(cW * 0.2, cW * 0.8);
                obj.y = rand(cH * 0.2, cH * 0.8);
                obj.opacity = 1;
                obj.factor = 1;
              }
            }, fps, this);
          };
        }
        
        // functions
        function sin(degrees) {
          return Math.sin(degrees * (Math.PI / 180));
        }
        function cos(degrees) {
          return Math.cos(degrees * (Math.PI / 180));
        }
        function rand(min, max) {
          return min + Math.floor(Math.random() * (max - min + 1));
        }
        
        // spawner
        function spawn() {
          arr.forEach(function(src, index) {
            setTimeout(function() {
              var x = rand(cW * 0.2, cW * 0.8);
              var y = rand(cH * 0.2, cH * 0.8);
              var newCustomImage = new CustomImage(x, y, src);
              customs.push(newCustomImage);
              newCustomImage.animate();
            }, (index * 500));
          });
        }
        
        // animating
        function draw() {
          if (pause) { return; }
          ctx.clearRect(0, 0, cW, cH);
          customs.forEach(function(custom) {
            var image = custom.image;
            ctx.globalAlpha = custom.opacity;
            var ratio = image.width / image.height;
            ctx.drawImage(image, custom.x, custom.y, size * dimension * custom.factor * ratio, size * dimension * custom.factor);
          });
        }
        
        // kick it off
        spawn();
        var drawer = setInterval(draw, 1000 / fps);
        
      }
      
    };
    
    function all() {
      for (var i = 0; i < 8; i++) {
        if (i != 4) {
          eval("p1_mini" + i + "(true);");
        }
      }
    }
    
    all();
    
    // animate step3
    setTimeout(function() {
      $("#p1_square > div:not(#p1_main)").addClass("shake-constant shake-slow");
    }, step2Done);
    
    // animate step4
    setTimeout(function() {
      $("#p1_mini3 > *").attr("style", "width: 0; height: 0;");
      $("#p1_square > div:not(#p1_main), #p1_square > div:not(#p1_main) > *").attr("style", "width: 0; height: 0;");
      $("#p1_main").attr("style", "width: " + $("#p1_square").width() + "; height: " + $("#p1_square").height() + ";");
      $("#p1_main > *").attr("style", "position: relative;").animate({
        top:"-1500px",
        fontSize: 800
      }, step4Done - step3Done);
    }, step3Done);
    
    // move to next phase
    setTimeout(function() {
      clearIntervals();
      phase(2);
    }, step4Done);
}

function phase2() {

  $("#p2").show();

  // variables
  var startStamp = 12000;
  var step1End = 18250 - startStamp;
  var step2End = 22250 - startStamp;
  var step3End = 25000 - startStamp;
  var duration = step1End / 25;
  
  // step1
  for (var i = 0; i < 25; i++) {
    var element = $($("#p2_square > div")[i]);
    var primaryShade = (255).toString(16);
    var secondaryShade = (150 - (i * 6)).toString(16);
    if (primaryShade.length == 1) {
      primaryShade = "0" + primaryShade;
    }
    if (secondaryShade.length == 1) {
      secondaryShade = "0" + secondaryShade;
    }
    var color = "#" + primaryShade + secondaryShade + secondaryShade;
    element.css("background-color", color);
    switch(i) {
      case 0:
          element.fadeTo(0, 0);
          break;
        case 1:
          break;
        case 2:
          element.fadeTo(0, 0);
          break;
        case 3:
          element.fadeTo(0, 0);
          break;
        case 4:
          break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            element.css("opacity", "0");
            break;
    }
    setTimeout(function(element, i) {
      switch (i) {
        case 0:
          element.fadeTo(duration, 1);
          break;
        case 1:
          element.fadeTo(duration, 0);
          break;
        case 2:
          element.fadeTo(duration, 0.5);
          break;
        case 3:
          element.fadeTo(0, 1);
          break;
        case 4:
          element.fadeTo(0, 0);
          break;
        case 5:
          element.css("opacity", "0");
          element.addClass("animated fadeIn");
          break;
        case 6:
          element.css("opacity", "0");
          element.addClass("animated fadeInLeft");
          break;
        case 7:
          element.css("opacity", "0");
          element.addClass("animated fadeInUp");
          break;
        case 8:
          element.css("opacity", "0");
          element.addClass("animated fadeInRight");
          break;
        case 9:
          element.css("opacity", "0");
          element.addClass("animated fadeInDown");
          break;
        case 10:
          element.css("opacity", "1");
          element.addClass("animated rotateIn");
          break;
        case 11:
          element.css("opacity", "1");
          element.addClass("animated rotateInDownLeft");
          break;
        case 12:
          element.css("opacity", "1");
          element.addClass("animated rotateInDownRight");
          break;
        case 13:
          element.css("opacity", "1");
          element.addClass("animated rotateInUpRight");
          break;
        case 14:
          element.css("opacity", "1");
          element.addClass("animated rotateInUpLeft");
          break;
        case 15:
          element.css("opacity", "1");
          element.attr("id", "p2_15");
          anime({
            targets: '#p2_15',
            borderRadius: ['0em', '5em'],
            duration: duration,
          });
          break;
        case 16:
          element.css("opacity", "1");
          element.attr("id", "p2_16");
          anime({
            targets: '#p2_16',
            rotate: "5turn",
            duration: duration,
          });
          break;
        case 17:
          element.css("opacity", "1");
          element.attr("id", "p2_17");
          anime({
            targets: '#p2_17',
            scale: 0.5,
            duration: duration,
          });
          break;
        case 18:
          element.css("opacity", "1");
          element.addClass("shake-constant shake-opacity");
          break;
        case 19:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("explode", {}, duration, function() {
              element.show();
              element.css("opacity", "0");
            });
          break;
        case 20:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("fold", {}, duration, function() {
              element.show();
              element.css("opacity", "0");
            });
          break;
        case 21:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("highlight", {}, duration);
          break;
        case 22:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("puff", {}, duration, function() {
              element.show();
              element.css("opacity", "0");
            });
          break;
        case 23:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("pulsate", {}, duration, function() {
              element.show();
              element.css("opacity", "0");
            });
          break;
        case 24:
          element.css("opacity", "1");
          element
            .width($("#p2_square").width() / 5)
            .height($("#p2_square").height() / 5)
            .effect("clip", {}, duration, function() {
              element.show();
              element.css("opacity", "0");
            });
          break;
      }
      setTimeout(function() {
        element.css("opacity", "1");
        element.addClass("visible shake-constant shake-slow");
      }, duration * 3);
    }, (i * duration), element, i);
  }
  
  // step2
  setTimeout(function() {
    for (var i = 0; i < 25; i++) {
      setTimeout(function(index) {
        var element = $($("#p2_square > div")[index])
        element
          .removeClass()
          .fadeOut(duration, function() {
            element.show();
            element.css("opacity", "0");
            element.width($("#p2_square").width() / 5)
            element.height($("#p2_square").height() / 5)
          });
      }, (i * (step2End - step1End) / 25), i);
    }
  }, step1End);
  
  // step3
  setTimeout(function() {
    $("#p2_square > div")
      .css("opacity", "1")
      .show()
    $("#p2_square").effect("explode", {}, 250);
    setInterval(function() {
      $("#p2_square").effect("explode", {}, 100);
    }, 100);
  }, step2End);
  
  // next phase
  setTimeout(function() {
    clearIntervals();
    phase(3);
  }, step3End);
  
}

function phase3() {
  
}