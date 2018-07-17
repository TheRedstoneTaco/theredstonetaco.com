// width, height, less, and greater of the two!
var w, h, l, g;
// page, conversation json, userjson
var page;
var c;
var user;
var topics;
// chart stuff
var ctx, chartStuff, myChart;
// for testing
var tmp = "";

// on ready
$(document).ready(function() {
  
  init();
  
  init_header();
  
  init_conversation();
  
  init_forms();
  
  initChart();
  
});

function init() {
  
  // variables
  w = $(window).width();
  h = $(window).height();
  l = ((h < w) * h) + ((w < h) * w);
  g = ((w > h) * w) + ((h > w) * h);
  
  // hide stuff
  $(".hideme").hide();
  
  // grab page info
  page = JSON.parse($('#pageJSON').text());;
  $("#pageJSON").remove();
  
  // grab user info
  user = JSON.parse($('#userJSON').text());
  $('#userJSON').remove();
  
  // grab topics
  topics = page.conversation;

}

function init_header() {
  
  // header item navigation
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

function init_conversation() {
  
  // html queue
  var html = ``;
  
  // if should, add 'add topic'
  html +=
  `
  <!--to add a topic-->
  `;
  if (user && user.authorization == 1) {
    html +=
    `
  <div class="w-75 m-auto ui accordion">
    <h1 id="topicAddAlert" class="text-center alert alert-success">Topic Added!</h1>
    <form id="topicForm" action="/os/conversation" method="POST">
      <h1 class="text-center title">
        Add topic
        <i class="dropdown icon"></i>
      </h1>
      <div class="content">
        <h4>Title: </h4>
        <input type="text" name="title" class="form-control" required placeholder="title...">
        <h4>Content: </h4>
        <input type="text" name="content" class="form-control" required placeholder="content...">
        <h4>Category: </h4>
        <input type="text" name="category" class="form-control" required placeholder="category...">
        <br>
        <button class="btn w-50 m-auto d-block btn-success">
          <h1>Add topic!</h1>
        </button>
      </div>
      <br>
    </form>  
  </div>
    `;
  }
  
  // add topic navigation
  html +=
  `
  <!-- topic navigation -->
  <div class="ui container">
    <div id="topics_navigation" class="ui secondary pointing menu">
  `;
  topics.forEach(function(topic, index) {
    html +=
    `
      <h3 class="item topicNavigation" href="#topic` + index + `">
        ` + topic.title + `
      </h3>
    `;
  });
  html +=
  `
    </div>
  </div>
  `;
  
  // add 'add conversation' if should to html queue
  if (user) {
    html +=
    `
  <!-- to add conversation onto a topic -->
  <br>
  <div class="w-75 m-auto ui accordion">
    <h1 class="conversationAddAlert text-center alert alert-success">Conversation Added!</h1>
    <form class="conversationForm" id="topicConversationForm" method="POST">
      <h1 class="text-center title">
        Add Conversation
        <i class="dropdown icon"></i>
      </h1>
      <div class="content">
        <h4>Title: </h4>
        <input type="text" name="title" class="form-control" required placeholder="title...">
        <h4>Content: </h4>
        <input type="text" name="content" class="form-control" required placeholder="content...">
        <br>
        <button class="btn w-50 m-auto d-block btn-primary">
          <h1>Converse!</h1>
        </button>
      </div>
    </form>  
  </div>
    `;
  }
  
  // run html queue
  $('#topic-navigation').html(html);
  
  // accordions
  $('.ui.accordion').accordion();
  
  // sort each topic
  var sorted, tmp;
  topics.forEach(function(topic, index) {
    sorted = topic.conversation;
    for (var i = 0; i < (sorted.length - 1); i++) {
      for (var j = 0; j < (sorted.length - 1); j++) {
        if (
          ((sorted[j].yes || 0) - (sorted[j].no || 0)) > ((sorted[(j + 1)].yes || 0) - (sorted[(j + 1)].no || 0))
        ) {
          tmp = sorted[j];
          sorted[j] = sorted[(j + 1)];
          sorted[(j + 1)] = tmp;
        }
      }
    }
    sorted.reverse();
    topics[index] = sorted;
  });
  
  // initalize topic navigation
  $('.topicNavigation').click(function() {
    var target = $(this).attr('href');
    var index = target.slice("#topic".length, target.length);
    showTopic(index);
  });

  // show some topic
  showTopic(0);
  
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

function initChart() {
  // do chart stuff
  ctx = document.getElementById("myChart").getContext('2d');
  chartStuff = {
    type: 'horizontalBar',
    data: {
      labels: ["Views", "Conversation"],
      datasets: [{
        label: "   ",
        data: [page.views, page.conversationCount],
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

// setup navigation for topics
function showTopic(index) {
  
  // do navigation
  $('.topicNavigation').removeClass('active');
  $($('.topicNavigation')[index]).addClass('active');
  
  // do content
  var topicHTML = recursor(page.conversation[index], 0, index);
  $('#topic-display').html(topicHTML);
  
  // do form
  $("#topicConversationForm").attr('action', '/conversation/' + page.conversation[index]['_id']);
  
  // accordions
  $('.c').unbind().click(function() {
    $(".ui.accordion").accordion();
  });
  
}

function recursor(obj, depth, topicIndex) {
  
  var html = ``;
  
  // if it's an array of conversations
  if (Array.isArray(obj)) {
    
    // display new 'square' conversations first
    obj.forEach(function(conversation) {
      html += recursor(conversation, depth, topicIndex);
    });
    
  // else it must be a conversation
  } else {

    // '.c' conversations
    if (depth == 0) {
      html +=
      `
      <div href="#" class="c c` + topicIndex + `">
        <a href="#" data-toggle="modal" data-target="#modal_` + obj['_id'] + `">
          <div class="c_title overflowX">
            <h1 class="black_text text-center">
              ` + obj.title +`
            </h1>
          </div>
          <div class="c_content black_text">
            <h5 class="black_text">
              ` + obj.author.username + `
            </h5>
            <h6 class="noweight black_text">
              ` + obj.created + `
            </h6>
            <hr>
            <p>
              ` + obj.content + `
            </p>
          </div>
        </a>
          <div class="c_stats">
            <div>
              <form class="voteform w-100 nobox d-block" override="PUT" action="/conversation/` + obj['_id'] + `/yes" method="POST">
                <button type="submit" class="yesbutton button button-3d button-longshadow-right button-glow button-circle">
                  <i class="fa fa-thumbs-up"></i>
                </button>
                <h1 class="blue_text vote_info">
                  ` + (obj.yes || '0') + `
                </h1>
              </form>
            </div>
            <div>
              <form class="voteform w-100 nobox d-block" override="PUT" action="/conversation/` + obj['_id'] + `/no" method="POST">
                <button type="submit" class="nobutton button button-3d button-longshadow-right button-glow button-circle">
                  <i class="fa fa-thumbs-down"></i>
                </button>
                <h1 class="red_text vote_info">
                  ` + (obj.no || '0') + `
                </h1>
              </form>
            </div>
          </div>
        <div class="modal fade" id="modal_` + obj._id + `" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog deep" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel">
                  ` + obj.title + `
                </h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-header-content">
                <h2 class="text-muted modal-header-date noweight">
                  ` + obj.created + `
                </h2>
                <h3 class="modal-header-text noweight">
                  ` + obj.content + `
                </h3>
              </div>
              <div class="modal-body">
      `;
      if (user && (obj['_id'] == user['_id'] || user['authorization'] == 1)) {
        html +=
      `
                <br>
                <a href="/conversation/` + obj._id + `/edit?redirect=os" class="button button-raised button-highlight">
                  Edit
                </a>
                <a href="/conversation/` + obj._id + `/delete?redirect=os" class="button button-raised button-inverse">
                  Delete
                </a>
      `
      };
      if (user) {
        html +=
        `
                <div class="ui accordion d-inline">
                  <form class='d-inline ui reply form' action="/conversation/` + obj._id + `" method="POST">
                    <h2 class="text-center title d-inline noweight ui header">
                      Reply
                    </h2>
                    <div class="content">
                      <div class='field'>
                        <h4>Title: </h4>
                        <input type="text" name="title" class="form-control" required placeholder="title...">
                      </div>
                      <div class='field'>
                        <h4>Content: </h4>
                        <textarea type="text" name="content" required placeholder="content..."></textarea>
                      </div>
                      <br>
                      <button class="d-block ui blue labeled submit icon button">
                        <i class="icon edit"></i> Add Reply
                      </button>
                    </div>
                  </form>  
                </div>  
        `;
      }
      html +=
      `
                <br>
                <div class='ui comments'>
      `;
      html += recursor(obj.conversation, depth + 1, topicIndex);
      html +=
      `
                </div> <!-- /.ui comments -->
                <h4 class="text-center text-muted">
                  End of Conversation
                </h4>
              </div> <!-- ./modal-body -->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div> <!-- ./modal-content -->
          </div> <!-- ./modal-dialog -->
        </div> <!-- ./modal -->
      </div> <!-- /.topicContent -->
      `;
    }
    // conversations of the "topicContent" conversations
    else {
      
      html +=
      `
      <div class="comment">
      
        <!--avatar-->
        <a class="avatar">
          <!-- https://icons8.com/icon/21619/ios-application-placeholder -->
          <img src="` + obj.author.photo + `">
        </a>
        
        <div class="content">
          
          <!--author-->
          <a class="author">` + obj.author.username + `</a>
          
          <!--created-->
          <div class="metadata">
            <span class="date">` + obj.created + `</span>
          </div>
          
          <!--title-->
          <br>
          <h3 class='d-inline'>
            ` + obj.title + `
          </h3>
          <hr>
          
          <!--content-->
          <div class="text">
            ` + obj.content + `
          </div>
          
          <div class="actions">
            
            <!--yes, no-->
            <form class='d-inline voteform' override='PUT' action="/conversation/` + obj._id + `/yes" method="POST">
              <button type="submit" class="yesbutton button">
                <i class="fa fa-thumbs-up"></i>
                ` + (obj.yes || '0') + `
              </button>
            </form>
            
            <form class='d-inline voteform' override='PUT' action="/conversation/` + obj._id + `/no" method="POST">
              <button type="submit" class="nobutton button">
                <i class="fa fa-thumbs-down"></i>
                ` + (obj.no || '0') + `
              </button>
            </form>
            
            <a></a>
            
            <!--edit, delete-->
            `;
            if (user && (obj['_id'] == user['_id'] || user.authorization == 1)) {
              html +=
              `
            <div class='d-inline'>
              <a href="/conversation/` + obj['_id'] + `/edit?redirect=os" class="button button-highlight white_text">
                Edit
              </a>
            </div>
            <div class='d-inline'>
              <a href="/conversation/` + obj['_id'] + `/delete?redirect=os" class="button button-inverse white_text">
                Delete
              </a>
            </div>
              `;
            }
            html +=
            `
            <!--converse-->
            `;
            if (user) {
              html +=
              `
            <div class="ui accordion d-inline">
              <form class='d-inline ui reply form' action="/conversation/` + obj['_id'] + `" method="POST">
                <h2 class="text-center title d-inline noweight ui header">
                  Reply
                </h2>
                <div class="content">
                  <div class='field'>
                    <h4>Title: </h4>
                    <input type="text" name="title" class="form-control" required placeholder="title...">
                  </div>
                  <div class='field'>
                    <h4>Content: </h4>
                    <textarea type="text" name="content" required placeholder="content..."></textarea>
                  </div>
                  <br>
                  <button class="d-block ui blue labeled submit icon button">
                    <i class="icon edit"></i> Add Reply
                  </button>
                </div>
                <br>
              </form>  
            </div>
              `;
            }
            
            html +=
            `
          </div> <!-- /.actions -->
            `;
          
            html += recursor(obj.conversation, depth + 1, topicIndex);
          
            html +=
            `
        </div> <!-- ./content -->
      </div> <!-- ./comment -->
      <br>
            `;
    }
  
  }
  
  return html;
  
}