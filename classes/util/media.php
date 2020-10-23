<?php
/**
* アップロードファイル関連のメソッド
* 
*/
namespace Catpow\util;
class media{
	public static function get_all_attachment_files($id){
		static $cache;
		if(isset($cache[$id])){return $cache[$id];}
		$basedir=wp_get_upload_dir()['basedir'];
		$primary_file=get_post_meta($id,'_wp_attached_file',true);
		if(0!==strpos($primary_file,$basedir)){
			$primary_file=$basedir.'/'.ltrim($primary_file,'/');
		}
		$rtn=['full'=>$primary_file];
		$dir=dirname($primary_file);
		if(wp_attachment_is_image($id)){
			$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
			foreach($metadata['sizes'] as $size=>$data){
				$rtn[$size]=$dir.'/'.$data['file'];
			}
		}
		return $cache[$id]=$rtn;
	}
	public static function get_all_attachment_file_paths($id){
		return array_map(function($file){
			return substr($file,strpos($file,'/uploads/')+9);
		},self::get_all_attachment_files($id));
	}
}

?>