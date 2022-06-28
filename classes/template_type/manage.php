<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class manage extends template_type{
	public static function get_menus($conf_data){
		if(empty($conf_data['show_in_menu'])){return [];}
		return [
			'top'=>[
				$conf_data['label']=>$conf_data['alias_path']
			]
		];
	}
}

?>