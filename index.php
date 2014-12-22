<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>
<body>

<h1>jQuery Uploads</h1>
<form enctype="multipart/form-data" id="property_photo_add" method="post">
    <div class="form-group input-group">
      <span class="input-group-addon noCurve"><div class="glyphicon glyphicon-calendar"  ></div></span>
      <input type="text" name="title" placeholder="Title">
    </div>
    <div class="form-group input-group">
      <span class="input-group-addon noCurve"><div class="glyphicon glyphicon-calendar"  ></div></span>
      <input type="file" name="files" id="room_photo">
    </div>
<div class="footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
<button type="submit" form="property_photo_add" class="btn btn-primary" id="property_photo_submit" >Save changes</button>
</div>
</form>
<div id="drag_drop" style="width: 200px; height: 20px; border: 1px solid black;"></div>
<div id="dump"></div>
<script src="jquery.js"></script>
<script src="upload.js"></script>
<script>
    var uploader = undefined;
    $(document).ready(function(){
    uploader = new FileUploader({
        "target": "#room_photo",
        "dragArea": "#drap_drop",
    }, "im.php");
    });
</script>
</body>
</html>
