<?php
require "http/Request.php";
require "scifile/handler/ImageUpload.php";
print_r($_POST);
echo "<br/><br/>";
print_r($_GET);
echo "<br/><br/>";
print_r($_FILES);
if($file = Request::FILE_INPUT("files")){
    $handler = new ImageUpload($file);
    $status = $handler->process_upload("static", true);
    echo $static;
    echo "-------";
}
?>
