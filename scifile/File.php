<?php
namespace libs\scifile;

class File{
    protected $data_file, $accept_types, $type, $min_size, $max_size;
    protected static $relative_storage = null;
    protected static $absolute_storage = null;
    protected $name, $title, $extension;

    public function __construct($data_file, $title=""){
        $this->data_file = $data_file;
        if(!empty($this->data_file)){
            $this->name = $this->getName();
            $this->extension = $this->getExtension();
        }
        $this->title = $title;
    }

    /**
    * Set storage location of images.
    * @param string $absolute - absolute path to storage folder.
    * @param string $relative - relative path to storage folder base on the app root.
    */
    public static function register_location($absolute, $relative=null){
        self::$relative_storage = $relative;
        self::$absolute_storage = $absolute;
    }

    /**
    * Get storage location of images.
    * @param string $type - type of storage to get, i.e. absolute or relative path.
    */
    public static function get_storage($type="absolute"){
        if($type=="absolute")
            return self::$absolute_storage;
        return self::$relative_storage;
    }

    /**
    * Get the name of the file.
    * @return string - name of the file.
    */
    public function getName(){
        if(strripos($this->data_file,'/') != false){
            $name = substr($this->data_file, strripos($this->data_file,'/')+1, (strlen($this->data_file) - strripos($this->data_file,'.') + 1));
        }else{
            $name = substr($this->data_file, 0,  strripos($this->data_file,'.'));
        }
        return $name;
    }

    /**
    * Get the file extension.
    * @return string - file extension.
    */
    public function getExtension(){
        return strtolower(strrchr($this->data_file, '.'));
    }
}

?>
