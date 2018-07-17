var $ = $;
var w, h;
var navbarBottom, leftover;
var mediaJSON;
var json = {};
var youtube_video;
var section_categories, section_category, section_media;
var crumb_categories, crumb_category, crumb_media;
var crumb_categories_content, crumb_category_content, crumb_media_content;
var info;
var info_title, info_views, info_likes;

$(window).ready(function() {
  
  // variables
  w = $(window).width();
  h = $(window).height();
  navbarBottom = $('.navbar').position().top + $('.navbar').outerHeight(true);
  leftover = (h - navbarBottom);
  mediaJSON = JSON.parse($('#mediaJSON').text());
  youtube_video = $('#youtube_video');
  section_categories = $('#section_categories');
  section_category = $('#section_category');
  section_media = $('#section_media');
  crumb_categories = $('#crumb_categories');
  crumb_categories_content = $('#crumb_categories_content');
  crumb_category = $('#crumb_category');
  crumb_category_content = $('#crumb_category_content');
  crumb_media = $('#crumb_media');
  crumb_media_content = $('#crumb_media_content');
  info_title = $('#info_title');
  info_views = $('#info_views');
  info_likes = $('#info_likes');
  info = $('#info');
  
  // responsiveness
  $('#page').height(leftover);
  
  // sort
  mediaJSON.forEach(function(item) {
    if (!json[item['category']]) {
      json[item['category']] = [];
    }
    json[item['category']].push(item);
  });
  
  // initializatons
  navigate('media', json['start'][0].category, json['start'][0]);
  
  // menu
  $(document).on('click', '#crumb_categories', function() {
    navigate('categories', null, null);
  });
  $(document).on('click', '.category', function() {
    navigate('category', $(this).attr('category'), null);
  });
  $(document).on('click', '#crumb_category', function() {
    navigate('category', crumb_category.attr('category'), null);
  });
  $(document).on('click', '.media_card', function() {
    var clickedMediaCard = $(this);
    var category = clickedMediaCard.attr('category');
    var _id = clickedMediaCard.attr('_id');
    navigate('media', category, json[category].filter(function(tmpMediaCard) {
      return _id == tmpMediaCard['_id'];
    })[0]);
  });
  
  // info
  $('#prev').click(prev);
  $('#replay').click(replay);
  $('#next').click(next);
  
});

function navigate(section, category, media) {
  
  // hide and remove and clear everything
  section_categories.hide();
  crumb_categories.hide().removeClass('active');
  section_category.hide().html('');
  crumb_category.hide().removeClass('active');
  section_media.hide().html('');
  crumb_media.hide().removeClass('active');
  info.find('*').css('opacity', 0);
  
  // show precise content and play first part of precise crumb
  if (section == 'categories') {
    section_categories.show();
    crumb_categories.addClass('active');
  }
  if (section == 'category') {
    section_category.show();
    crumb_category.addClass('active');
    crumb_category.attr('category', category);
  }
  if (section == 'media') {
    section_media.show();
    crumb_media.addClass('active');
  }
  
  // incrementally play other parts of crumbs
  if (section == 'categories' || section == 'category' || section == 'media') {
    crumb_categories.show();
  }
  if (section == 'category' || section == 'media') {
    crumb_category.show();
    crumb_category_content.text(category);
    crumb_category.attr('category', category);
  }
  if (section == 'media') {
    crumb_media.show();
    crumb_media_content.text(media.title.substr(0, 3) + '...');
    crumb_media.attr('category', category).attr('_id', media['_id']);
  }
  
  // modify content or embed, if necessary
  if (section == 'category') {
    // add category content
    var html = '';
    html += `<div class='ui items'>`;
    (json[category] || []).forEach(function(tmpMedia) {
      html +=
      `
        <div class='item media_card' category='` + tmpMedia.category + `' _id='` + tmpMedia._id + `'>
          <div class='image'>
            <img src='` + tmpMedia.previewSrc + `'>
          </div>
          <div class='content'>
            <h3 class='header'>
              ` + tmpMedia.title + `
            </h3>
            <hr>
            <h4 class='meta noweight'>
              Type - ` + tmpMedia.type + `
              <br>
              Category - ` + tmpMedia.category + `
            </h4>
            <div class='extra'>
              <!-- Source - http://www.iconarchive.com/show/swarm-icons-by-sonya/Nerd-Glasses-icon.html , Artist - http://www.iconarchive.com/artist/sonya.html -->
              ` + tmpMedia.views + `&nbsp&nbsp&nbsp&nbsp Views &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <img class='emoji-16' src='https://cdn.pixabay.com/photo/2017/08/17/15/49/like-2651767_960_720.png'></img>&nbsp&nbsp&nbsp&nbsp` + tmpMedia.likes + `
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    section_category.html(html);
  }
  if (section == 'media') {
    
    // embed
    if (media.type == 'youtube_video') {
      youtube_video
        .show()
        .attr('data-id', media.src)
        .embed();
    }
    
    // modify content
    var validValues = 0;
    var html = `
    <div id='section_media_table_wrapper'>
      <table id='section_media_table' class="ui sortable large padded collapsible selectable celled table">
        <thead>
          <tr>
            <th class='sorted descending'>Attribute</th>
            <th class='sorted descending'>Value</th>
          </tr>
        </thead>
        <tbody>
        `;
      
      Object.keys(media).forEach(function(key) {
        html += `
          <tr>
            <td>
              ` + key + `
            </td>
            <td>
              ` + media[key] + `
            </td>
          </tr>
        `
        if (media[key]) {
          validValues ++;
        }
      });
        
      html +=  `
        </tbody>
        <tfoot>
          <tr>
            <th>` + Object.keys(media).length + ` Attributes</th>
            <th>` + validValues + ` Values</th>
          </tr>
        </tfoot>
      </table>
    </div>
    `;
    section_media.html(html);
    $('#section_media_table').tablesort();
    
    // modify info
    info.find('*').css('opacity', 1);
    info_title.text(media.title);
    info_views.html(`
      <h1 class='d-inline'>
        ` + media.views + `&nbsp&nbsp&nbsp&nbspViews
      </h1>
    `);
    info_likes.html(`
      <h1 class='d-inline'>
        ` + media.likes + `&nbsp&nbsp&nbsp&nbsp<i class='far fa-thumbs-up'></i>
      </h1>
    `);
    
  }
  
}

function prev() {
  
}

function replay() {
  var category = crumb_media.attr('category');
  var _id = crumb_media.attr('_id');
  var media = json[category].filter(function(item) {
    return _id == item._id;
  })[0];
  navigate('media', category, media);
}

function next() {
  
}