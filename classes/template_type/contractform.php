<?php
namespace Catpow\template_type;
/**
* メール受信確認を経てフォームの入力を行うメールフォーム
*/

class contractform extends template_type{
	public static $permalinks=['task'];
	public static function get_embeddables($path,$conf_data){
		global $wpdb;
		$post_data_paths=[];
		$path_data=(\cp::parse_conf_data_path($conf_data['path']));
		$posts=get_posts([
			'post_type'=>$path_data['data_name'],
			'post_parent'=>0
		]);
		if(empty($posts)){
			$post_datas=\Catpow\article_type\contractform::get_default_post_datas($GLOBALS['post_types'][$path_data['data_name']]);
			foreach($post_datas as $path=>$post_data){
				if(substr_count($path,'/')>1){continue;}
				$post_data_paths[$path]=$post_data['post_title'];
			}
		}
		else{
			foreach($posts as $post){
				$post_data_paths[$post->post_type.'/'.$post->post_name]=$post->post_title;
			}
		}
		
		return [
			'form'=>['申込フォーム'=>[
				'file'=>'form.php',
				'post_data_paths'=>$post_data_paths
			]]
		];
	}
	public static function get_form_type($file){
		switch($file){
			case 'form.php':
			case 'task.php':
				return 1;
			default:
				return parent::get_form_type($file);
		}
	}
}

?>