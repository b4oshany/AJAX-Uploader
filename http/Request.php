<?php

class Request{
    public static function get_request_log(){
        return $_SESSION["CURRENT_REQUEST"] or null;
    }

    public static function add_request_log($key, $value){
        if(!isset($_SESSION["CURRENT_REQUEST"])){
            $_SESSION["CURRENT_REQUEST"] = array();
        }
        $_SESSION["CURRENT_REQUEST"][$key] = $value;
    }

    private static function filter_input($var){
         return filter_var($var, FILTER_SANITIZE_SPECIAL_CHARS, FILTER_SANITIZE_ENCODED);
    }

    public static function POST($post_name, $return = false){
        return (!empty($_POST[$post_name]))? self::filter_input($_POST[$post_name]) : $return;
    }

    public static function GET($post_name, $return = false){
        return (!empty($_GET[$post_name]))? self::filter_input($_GET[$post_name]) : $return;
    }

    public static function FILE_INPUT($input_name, $return = false){
        return (!empty($_FILES[$input_name]))? $_FILES[$input_name]: $return;
    }

    public static function set($object, $data){
        if(!empty($data)){
            $object = $data;
            return $object;
        }
    }

    public static function is_async(){
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' ) {
            return true;
        }
        return false;
    }
}


?>