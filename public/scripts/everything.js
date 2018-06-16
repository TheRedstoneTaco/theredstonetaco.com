// width, height, greater, lesser
var w, h, g, l;
var youneedJesus;

$(document).ready(function() {
    
    // audio
    init_audio();
    
    // size stuff
    sizing();
    
    // run phase
    phase(1);
});

function phase(phase) {
    $(".phase").hide();
    eval("phase" + String(phase) + "();");
}

function init_audio() {
    $("#youneedJesus").hide();
    youneedJesus = document.getElementById("youneedJesus")
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
    var step1Duration = 0000;
    var intros = [
    "bounceIn", "bounceInDown", "bounceInRight", "bounceInLeft", "bounceInUp",
    "fadeIn", "fadeInDown", "fadeInRight", "fadeInLeft", "fadeInUp",
    "flipIn", "flipInX", "flipInY",
    "lightSpeedIn",
    "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
    "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
    "zoomIn", "zoomInDown", "zoomInRight", "zoomInLeft", "zoomInUp"
    ];
    
    // animate main portion
    var dimension = $("#p1_square").width() / 3.0;
    var scale1 = anime({
      targets: '#p1_main',
      width: dimension,
      height: dimension,
      duration: step1Duration,
      easing: "linear"
    });
    var scale1 = anime({
      targets: '#p1_main > *',
      fontSize: "16",
      duration: step1Duration,
      easing: "linear"
    });
    $("#p1_main").addClass("shake-opacity shake-constant");
    
    // animate other portions
    $("#p1_square > div:not(#p1_main)").css("opacity", "0");
    setTimeout(function() {
        $("#p1_square > div:not(#p1_main)")
            .css("opacity", "1")
            .width(dimension)
            .height(dimension)
            .each(function(index) {
                $(this).addClass("animated " + intros[Math.ceil(Math.random() * intros.length)])
            });
    }, step1Duration);
    // mini1
    // courtesy of: https://codepen.io/TheRedstoneTaco/pen/NzaLNy
    var canvas = document.querySelector('#p1_canvas1'), p1_ctx1 = canvas.getContext('2d');
    var particles = [], patirclesNum = 150, w = 500, h = 500;
    var colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];
    setTimeout(function() {
        canvas.width = $("#p1_mini1").width();
        canvas.height = $("#p1_mini1").height();
    }, step1Duration + 250);
    // canvas.style.left = (window.innerWidth - 500)/2+'px';
    // if(window.innerHeight>500)
    // canvas.style.top = (window.innerHeight - 500)/2+'px';
    function Factory(){  
        this.x =  Math.round( Math.random() * w);
        this.y =  Math.round( Math.random() * h);
        this.rad = Math.round( Math.random() * 1) + 1;
        this.rgba = colors[ Math.round( Math.random() * 3) ];
        this.vx = Math.round( Math.random() * 3) - 1.5;
        this.vy = Math.round( Math.random() * 3) - 1.5;
    }
   
    function draw(){
      p1_ctx1.clearRect(0, 0, w, h);
      p1_ctx1.globalCompositeOperation = 'lighter';
      for(var i = 0; i < patirclesNum; i++){
        var tmp = particles[i];
        var factor = 1;
        for(var j = 0; j < patirclesNum; j++){
           var tmp2 = particles[j];
           p1_ctx1.linewidth = 0.5;
          
           if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<50){
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
        ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
        ctx.stroke();
        ctx.closePath();
        
    
        temp.x += temp.vx;
        temp.y += temp.vy;
        
        if(temp.x > w)temp.x = 0;
        if(temp.x < 0)temp.x = w;
        if(temp.y > h)temp.y = 0;
        if(temp.y < 0)temp.y = h;
      }
    }
    
    function findDistance(p1,p2){  
      return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
    }
    
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
    (function init(){
      for(var i = 0; i < patriclesNum; i++){
        particles.push(new Factory);
      }
    })();
    
    (function loop(){
      draw();
      requestAnimFrame(loop);
    })();
    
    
    setTimeout(function() {
        youneedJesus.pause();
    }, 6.5 * 1000);
}