// helper navigation highlighting
var navigated = 0;
// stuff about statistics
var pageData,
  canvas_page, canvas_R,
  ctx_page, ctx_R,
  settings_page, settings_R,
  chart_page, chart_R;
// window stuff
var w, h, l, g;

$(document).ready(function() {
    
    w = $(window).width();
    h = $(window).height();
    l = ((w < h) * w) + ((h < w) * h);
    g = ((w > h) * w) + ((h > w) * h);
    
    // set up Dustin's Research
    init_R();
    
    // grab page information
    init_pageData();
   
    // initalize page navigation stuff
    init_nav();
   
    // initialize statistics
    init_stats();
   
});

function init_pageData() {
    pageData = {
        views: $('pageData > views').text(),
        likes: $('pageData > likes').text(),
        ebooks: {
            R: {
                views: $('pageData > ebooks > R > views').text(),
                likes: $('pageData > ebooks > R > likes').text(),
                ratings: $('pageData > ebooks > R > ratings').text(),
                reviews: $('pageData > ebooks > R > reviews').text()
            }
        }
    }
    $('pageData').remove();
}

function init_nav() {
    // navigation pop in/out
    function toggle(index) {
        $('.ui.sidebar')
        .sidebar({
            transition: 'scale down'
        })
        .sidebar('toggle');
    }
    $('#hamburger').click(toggle);
    // ebook buttons
    $('#R_a').click(function(event) {
        event.preventDefault();
        toggle();
        setTimeout(function() {
            $('.navigator[href="#R"]').click();
        }, 750);
    });
    // navigation buttons
    function navigate(index) {
        $('.navigator').each(function() {
            $($(this).attr('href')).hide();
            $(this).removeClass('active');
        });
        $($('.navigator')[index]).addClass("active");
        $($($('.navigator')[index]).attr('href')).show();
    }
    $('.navigator').click(function(event) {
        event.preventDefault();
        navigate($(this).index() - 1);
        toggle();
    });
    navigate(2);
}

function init_stats() {

    // canvas for the page
  canvas_page = document.querySelector('#canvas_page');
  ctx_page = canvas_page.getContext('2d');
  var type = 'bar';
  console.log(pageData.views, pageData.likes);
  settings_page = {
    type: type,
    data: {
      labels: ["Views", "Likes"],
      datasets: [{
        label: "",
        data: [pageData.views, pageData.likes],
        backgroundColor: [
          "#CC0000",
          "#B20000"
        ]
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        mode: "point",
        titleFontSize: canvas_page.width / 10,
        bodyFontSize: canvas_page.width / 12,
        xPadding: canvas_page.width / 20,
        yPadding: canvas_page.width / 20,
        caretSize: canvas_page.width / 25,
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: false
          },
          gridLines: {
            display: false
          },
          ticks: {
            color: "white",
            fontColor: "white"
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "AMOUNT",
            fontSize: canvas_page.width / 20,
            fontColor: "white"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            color: "white",
            fontColor: "white"
          }
        }]
      }
    }
  }
  
  // canvas for 'Dustin's Research' Ebook
  canvas_R = document.querySelector('#canvas_R');
  ctx_R = canvas_R.getContext('2d');
  var type = 'bar';
  settings_R = {
    type: type,
    data: {
      labels: ["Ratings", "Reviews", "Views", "Likes"],
      datasets: [{
        label: "",
        data: [pageData.ebooks.R.ratings, pageData.ebooks.R.reviews, pageData.ebooks.R.views, pageData.ebooks.R.likes],
        backgroundColor: [
          "#AA00FF",
          "#9900E5",
          "#8800CC",
          "#7700B2",
        ]
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        mode: "point",
        titleFontSize: canvas_page.width / 10,
        bodyFontSize: canvas_page.width / 12,
        xPadding: canvas_page.width / 20,
        yPadding: canvas_page.width / 20,
        caretSize: canvas_page.width / 25,
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: false
          },
          gridLines: {
            display: false
          },
          ticks: {
            color: "white",
            fontColor: "white"
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "AMOUNT",
            fontSize: canvas_page.width / 20,
            fontColor: "white"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            color: "white",
            fontColor: "white"
          }
        }]
      }
    }
  }
  
  // render charts on click
  $('#stats_a').click(function() {
    setTimeout(function() {
      if (chart_page) {
        chart_page.destroy();
      }
      chart_page = new Chart(ctx_page, settings_page);
      if (chart_R) {
        chart_R.destroy();
      }
      chart_R = new Chart(ctx_R, settings_R);
    }, 250);
  });
  
}

function init_R() {
  
  // like counter
  var likes = $('#R_likes_counter').text();
  var tmpLikes = 0;
  var likeUpdater = setInterval(function() {
    tmpLikes ++;
    if (tmpLikes >= likes) {
      clearInterval(likeUpdater);
    }
    $('#R_likes_counter').text(tmpLikes);
  }, (2000 / likes));
  
  
}