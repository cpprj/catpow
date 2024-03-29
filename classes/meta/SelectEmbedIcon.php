<?php
namespace Catpow\meta;

class SelectEmbedIcon extends UI{
	public static
		$output_type='select';
	static $ui='SelectPreparedImage',$defaultParam=['color'=>'i'];
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val) || !file_exists($val)){return $val;}
		if(!in_array(mime_content_type($val),['image/svg','image/svg+xml'],true)){return mime_content_type($val);}
		return file_get_contents($val);
	}
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['type']='icon';
		$prm['valueKey']='path';
		return $prm;
	}
}
?>