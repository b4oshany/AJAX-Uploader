JQuery AJAX Uploader
====================

Description
-----------
Upload files to server using JQuery Ajax.
It works with python, php and ruby.

Getting Started
---------------

```HTML
<script src='jquery.js'></script>
<script src='jquery-uploader.js'></script>
```

For instance to trigger upload of files with form, change the default trigger to 'onSubmit' as in the example code below.
```JAVASCRIPT
var uploader = new FileUploader({
        "target": "#room_photo",
        "dragArea": "#drap_drop",
        "trigger": "onSubmit"
}, "/property/3/image/add/process");

$(document).on("submit", "#property_photo_add", function(e){
    // Set and enable drag and drop for the photo uploader.
    e.preventDefault();
    e.stopPropagation();
    uploader.submit(this).done(function(data){
      alert("File has been uploaded.");
    });
    return false;
});
```


Author
-------------------------
[Oshane Bailey]

[Oshane Bailey]: https://github.com/b4oshany
