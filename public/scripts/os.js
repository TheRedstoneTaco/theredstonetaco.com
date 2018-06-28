// width, height, less, and greater of the two!
var w, h, l, g;
// other page info
var pageData;
// chart stuff
var ctx, chartStuff, myChart;
// for testing
var tmp = "";

// on ready
$(document).ready(function() {
  
  init_sizing();
  
  init_page();
  
  init_forms();
  
  init_header();
  
  init_topics();
  
  initChart();
  
});

function init_sizing() {
  w = $(window).width();
  h = $(window).height();
  l = ((h < w) * h) + ((w < h) * w);
  g = ((w > h) * w) + ((h > w) * h);
}

function init_page() {
  
  // hide stuff
  $(".hideme").hide();
  
  // accordions
  $(".ui.accordion").accordion();
  
  // grab page info
  pageData = {};
  pageData.views = $("page > views").text();
  pageData.conversationCount = $("page > conversationCount").text();
  var topicIds = $('page > topicIds').text();
  topicIds = topicIds.substr(0, topicIds.length - 1).split(',');
  pageData.topicIds = topicIds;
  $("page").remove();
  
}

function init_forms() {
  
  // computer, stop topic form from redirecting us! (also intialize animations)
  $("#topicAddAlert").hide();
  $("#topicForm").submit(ajaxSubmit);
  $("#topicForm").submit(function() {
    $("#topicAddAlert").show();
    $("#topicForm").remove();
  });
  
  // computer, enable all the voting functionality!
  $('.voteform').submit(ajaxSubmit);
  $('.yesbutton').click(function() {
    $(this).addClass('button-primary');
  });
  $('.nobutton').click(function() {
    $(this).addClass('button-caution');
  })
  
  // enable conversing
  $(".conversationAddAlert").hide();
  $(".conversationForm").submit(ajaxSubmit);
  $(".conversationForm").submit(function() {
    $($(this).parent().children()[0]).show();
    $(this).remove();
  });
  
}

function init_header() {
  
  // when header items are clicked
  $('.header-item:not(#homebutton):not(#username):not(#login)').on('click', function(event) {
  
    // don't scroll down
    event.preventDefault();
  
    // hide other header's items and targets
    $(".navbar-collapse").collapse('hide');
    $('.header-item').each(function(index) {
      if (index != 0) {
        $($(this).attr('href')).hide(); 
      }
    });
  
    // show this header item's target
    $($(this).attr('href')).show();
  
  });
  
}

function init_topics() {
  
  // setup navigation for topics
  function topic(index) {
    $('.topicContent').hide();
    $('.topicNavigation').removeClass('active');
    $($('.topicNavigation')[index]).addClass('active');
    $('.topicContent' + index).show();
    $("#topicConversationForm").attr('action', '/conversation/' + pageData.topicIds[index]);
  }
  topic(0);
  $('.topicNavigation').click(function() {
    var target = $(this).attr('href');
    var index = target.slice("#topic".length, target.length);
    topic(index);
  });
  
}

function initChart() {
  // do chart stuff
  ctx = document.getElementById("myChart").getContext('2d');
  chartStuff = {
    type: 'horizontalBar',
    data: {
      labels: ["Views", "Conversation"],
      datasets: [{
        label: "   ",
        data: [pageData.views, pageData.conversationCount],
        backgroundColor: [
          "rgba(255, 0, 0, 0.76)",
          "rgba(255, 127, 0, 0.76)"
        ],
        hoverBackgroundColor: [
          "rgba(255, 0, 0, 0.9)",
          "rgba(255, 127, 0, 0.9)"
        ],
        borderColor: [
          "rgb(160, 0, 0)",
          "rgb(186, 93, 0)"
        ],
        borderWidth: 3,
        hoverBorderWidth: 10
      }]
    },
    options: {
      responsive: true,
      // courtesy of: https://stackoverflow.com/questions/38645829/chart-js-writing-labels-inside-of-horizontal-bars
      animation: {
        onProgress: function () {
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset) {
            for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                  left = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.left;
              ctx.fillStyle = 'black'; // label color
              var label = model.label;
              ctx.fillText(label, left + 15, model.y + 10);
            }
          });               
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        mode: "point",
        titleFontSize: l / 10,
        bodyFontSize: l / 12,
        xPadding: l / 20,
        yPadding: l / 20,
        caretSize: l / 25,
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: "#444444"
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            fontSize: l / 20
          }
        }],
        yAxes: [{
          gridLines: {
            color: "#444444"
          },
          scaleLabel: {
            display: true,
            labelString: "AMOUNT",
            fontSize: l / 20
          },
          ticks: {
            display: false,
            fontSize: l / 20
          }
        }]
      }
    }
  }
  // render chart even if it changes
  $("#stats_a").click(function() {
    setTimeout(function() {
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, chartStuff);
    }, 250);
  });
}

function ajaxSubmit(event) {
  // dont reload the page
  event.preventDefault();
  // but still submit! :)
  var method = $(this).attr("override") || "POST";
  $.ajax({
      url: $(this).attr("action"),
      type: method,
      error: function (jXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      },
      data: $(this).serialize()
  });
}