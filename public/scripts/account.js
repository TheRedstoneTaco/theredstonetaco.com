var dragDiv;

$(document).ready(function() {
    // initialize photo forms
    dragDiv = document.getElementById('dragDiv');
    dragDiv.ondragover = function () {
        this.className = 'hover';
        return false;
    };
    dragDiv.ondragend = function () {
        this.className = '';
        return false;
    };
    dragDiv.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        readfiles(e.dataTransfer.files);
    }
});

function readfiles(files) {
    document.getElementById('fileDragName').value = files[0].name
    document.getElementById('fileDragSize').value = files[0].size
    document.getElementById('fileDragType').value = files[0].type
    var reader = new FileReader();
    reader.addEventListener('loadend', function(event) {
      document.getElementById('fileDragData').value = event.target.result;
      reader.readAsDataURL(files[0]);
    });
}