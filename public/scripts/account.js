var photo, photoDragDiv, photoName, photoSize, photoType, photoData;
var reader = new FileReader();
var test;

$(document).ready(function() {
    // initialize photo forms
    // https://stackoverflow.com/questions/8006715/drag-drop-files-into-standard-html-file-input
    photo = $('#photo');
    photoDragDiv = $('#photoDragDiv');
    photoName = $('#photoName');
    photoSize = $('#photoSize');
    photoType = $('#photoType');
    photoData = $('#photoData');
    photoDragDiv.on('dragover', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $('body').addClass('hover');
    });
    photoDragDiv.on('dragend', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $('body').removeClass('hover');
    });
    photoDragDiv.on('drop', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $('body').removeClass('hover');
        event.dataTransfer = event.originalEvent.dataTransfer;
        readfile(event.dataTransfer.files);
    });
    photoData.change(function(event) {
    	var files = this.files;
    	readfile(files);
    });
});

function readfile(files) {
    var file = files[0];
    photoName.text('Name - ' + file.name);
    photoSize.text('Size - ' + file.size + ' Bytes');
    photoType.text('Type - ' + file.type);
    reader = new FileReader();
    test = reader;
    reader.onload = function(event) {
        photoData.attr('type', 'text');
        photo.attr('src', event.target.result);
        photoData.val(event.target.result);
    };
    reader.readAsDataURL(file);
}