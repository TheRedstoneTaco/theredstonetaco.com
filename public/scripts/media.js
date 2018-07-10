var $ = $;
var w, h;
var navbarBottom, leftover;
var mediaJSON;
var json = {};
var youtube_video;
var section_categories, section_category, section_media;
var crumb_categories, crumb_category, crumb_media;
var crumb_categories_content, crumb_category_content, crumb_media_content;
var bootstrapColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

$(window).ready(function() {
  
  // variables
  w = $(window).width();
  h = $(window).height();
  navbarBottom = $('.navbar').position().top + $('.navbar').outerHeight(true);
  leftover = (h - navbarBottom);
  mediaJSON = JSON.parse($('#mediaJSON').text());
  youtube_video = $('#youtube_video');
  section_categories = $('#section_categories');
  section_category = $('#section_category')
  section_media = $('#section_media');
  crumb_categories = $('#crumb_categories');
  crumb_categories_content = $('#crumb_categories_content');
  crumb_category = $('#crumb_category');
  crumb_category_content = $('#crumb_category_content');
  crumb_media = $('#crumb_media');
  crumb_media_content = $('#crumb_media_content');
  
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
  
});

function navigate(section, category, media) {
  
  // hide and remove and clear everything
  section_categories.hide();
  crumb_categories.hide().removeClass('active');
  section_category.hide().html('');
  crumb_category.hide().removeClass('active');
  section_media.hide().html('');
  crumb_media.hide().removeClass('active');
  
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
    json[category].forEach(function(tmpMedia) {
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
              <img src='https://www.facebook.com/images/emoji.php/v9/fea/1/16/1f453.png'></img>&nbsp` + tmpMedia.views + `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <img src='https://i1.wp.com/www.facebook.com/images/emoji.php/v9/z83/1/16/1f60e.png?resize=816%2C9999&ssl=1&zoom=2'>&nbsp` + tmpMedia.likes + `
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
    var html = `
    <table id='section_media_table' class="ui very basic large padded collapsible selectable sortable celled table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        `
        
        `
      </tbody>
      <tfoot>
        <tr>
          <th>7 Attributes</th>
          <th>7 Values</th>
        </tr>
      </tfoot>
    </table>
    `;
    section_media.html(html);
    
    // modify info
  }
  
}

// custom random function
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// random bootstrap color
function rbc() {
  return bootstrapColors[random(0, bootstrapColors.length)];
}