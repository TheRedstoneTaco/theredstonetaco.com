// information about the page
var pageData = {};
// width, height, less, and greater of the two!
var w, h, l, g;
// chart stuff
var ctx, chartStuff, myChart;

// on ready
$(document).ready(function() {
  
  // computer, grab window information!
  w = $(window).width();
  h = $(window).height();
  l = ((h < w) * h) + ((w < h) * w);
  g = ((w > h) * w) + ((h > w) * h);
  
  // computer, grab the page's backend info so we can do stuff!
  pageData = {
    views: $("pageJSON > views").text().trim() || -1,
    conversationCount: $("pageJSON > conversation").text().trim() || -1
  };
  $("pageJSON").remove();
  
  // computer, initialize the chart!
  initChart();
  
  // computer, ovverride the display settings of semantic and default stylesheets!
  $(".contentvote .voting").hide();
  $(window).click(function() {
    setTimeout(function() {
      $(".contentvote.visible").css("display", "flex").css("justify-content", "center");
      $(".contentvote.visible .voting").fadeIn(1000);
    }, 400);
  });
  
  // computer, hide all elements that are shy!
  $(".hideme").hide();
  
  // computer, setup the accordion dropdowns!
  $('.ui.accordion').accordion();
  
  // computer, setup the vertical menu for clicking
  $('.ui.menu').on('click', '.item', function(e) {
    $(this)
      .addClass('active')
      .siblings('.item')
      .removeClass('active');
    $(".section").hide();
    $($(this).attr("href")).show();
    e.preventDefault();
  });
  
  // computer, stop topic form from redirecting us! (also intialize animations)
  $("#topicAddAlert").hide();
  $("#topicForm").submit(ajaxSubmit);
  $("#topicForm").submit(function(event) {
    $("#topicAddAlert").show();
    $("#topicForm").hide();
  });
  
  // computer, enable all the voting functionality!
  $(".yesform, .noform").click(function() {
    $(this).submit();
  });
  $(".yesform").click(function() {
    $(this).replaceWith("<h1 class=\"alert alert-danger\">YES! :D</h1>");
  });
  $(".noform").click(function() {
    $(this).replaceWith("<h1 class=\"alert alert-primary\">no :(</h1>");
  });
  $(".yesform, .noform").submit(ajaxSubmit);
  
});

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
  $("a").click(function() {
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
  $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      error: function (jXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      },
      data: $(this).serialize()
  });
}