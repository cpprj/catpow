<?php
/**
* フォント関連の設定を管理
*/
namespace Catpow\util;
use Spatie\Color\Hex;
use Spatie\Color\Hsl;
use Spatie\Color\Hsla;
use Spatie\Color\Rgba;
use Spatie\Color\Factory;

class style_config{
	protected static
		$color_roles,
		$font_roles,
		$cache=[];
	public static function get_color_roles(){
		if(isset(static::$color_roles)){return static::$color_roles;}
		return static::$color_roles=apply_filters('cp_color_roles',[
			'background'=>['label'=>'背景色','default'=>'#ffffff','shorthand'=>'b','extend'=>true],
			'sheet'=>['label'=>'濃背景色','default'=>'#dddddd','shorthand'=>'s','extend'=>true],
			'text'=>['label'=>'文字色','default'=>'#666666','shorthand'=>'t'],
			'main'=>['label'=>'基本色','default'=>'#888888','shorthand'=>'m','extend'=>true],
			'accent'=>['label'=>'強調色','default'=>'#EE8800','shorthand'=>'a','extend'=>true],
			'inside'=>['label'=>'抜き文字色','default'=>'#000000','shorthand'=>'i'],
			'light'=>['label'=>'照明色','default'=>'hsla(0,0%,100%,0.5)','shorthand'=>'lt','alphaEnabled'=>true],
			'shade'=>['label'=>'陰色','default'=>'hsla(0,0%,0%,0.2)','shorthand'=>'sh','alphaEnabled'=>true],
			'shadow'=>['label'=>'影色','default'=>'hsla(0,0%,0%,0.3)','shorthand'=>'shd','alphaEnabled'=>true],
		]);
	}
	public static function get_font_roles(){
		if(isset(static::$font_roles)){return static::$font_roles;}
		return static::$font_roles=apply_filters('cp_font_roles',[
			'heading'=>['label'=>'見出し','default'=>'sans-serif','shorthand'=>'h'],
			'text'=>['label'=>'本文','default'=>'sans-serif','shorthand'=>'t'],
			'code'=>['label'=>'コード','default'=>'monospace','shorthand'=>'c'],
			'decoration'=>['label'=>'装飾','default'=>'fantasy','shorthand'=>'d'],
			'script'=>['label'=>'手書き','default'=>'cursive','shorthand'=>'s']
		]);
	}
	public static function update($wp_customize_settings=null){
		if(isset($wp_customize_settings)){
			$id_data=$wp_customize_settings->id_data();
			$domain=$id_data['base'];
			$data=get_theme_mod($domain);
			if(!empty($key=$id_data['keys'][0])){
				$data[$key]=$wp_customize_settings->post_value();
			}
			else{
				$data=$wp_customize_settings->post_value();
			}
			static::update_config_json($domain,$data);
		}
	}
	public static function translate_keys($domain,$data){
		$get_roles_method='get_'.preg_replace('/s$/','',$domain).'_roles';
		if(!method_exists(static::class,$get_roles_method)){return $data;}
		$roles=static::{$get_roles_method}();
		$rtn=[];
		foreach($data as $key=>$val){
			$rtn[$roles[$key]['shorthand']??$key]=$val;
		}
		return $rtn;
	}
	public static function get_tones($colors){
		$roles=static::get_color_roles();
		$tones=[];
		$lacks=[];
		foreach($roles as $role=>$conf){
			$key=$conf['shorthand'];
			$color=$colors[$role]??$colors[$key]??null;
			if(empty($color)){$lacks[]=$role;}
			if($conf['alphaEnabled']){
				$raw=Factory::fromString($color);
				$hsl=$raw->toHsl();
				$tones[$key]=[
					'h'=>round($hsl->hue()),
					's'=>round($hsl->saturation()),
					'l'=>round($hsl->lightness()),
					'a'=>round($raw->alpha(),2),
				];
			}
			else{
				$hsl=Factory::fromString($color)->toHsl();
				$hsb=$hsl->toHsb();
				$tones[$key]=[
					'h'=>round($hsl->hue()),
					's'=>round($hsl->saturation()),
					'l'=>round($hsl->lightness()),
					't'=>round(1-$hsl->lightness()/100,2),
					'S'=>round($hsb->saturation()),
					'B'=>round($hsb->brightness()),
				];
			}
		}
		return $tones;
	}
	public static function print_css_vars(){
		$vars=apply_filters('cp_css_vars',[
			'tones'=>self::get_config_json('tones'),
			'colors'=>self::get_config_json('colors'),
			'fonts'=>self::get_config_json('fonts')
		]);
		echo '<style type="text/css" id="cp-css-vars">:root{';
		foreach($vars as $group=>$vals){
			foreach($vals as $key=>$val){
				if(is_array($val)){
					foreach($val as $k=>$v){
						printf('--cp-%s-%s-%s:%s;',$group,$key,$k,$v);
					}
				}
				else{
					printf('--cp-%s-%s:%s;',$group,$key,$val);
				}
			}
		}
		echo '}</style>';
	}
	public static function update_config_json($domain,$data){
		if($domain==='colors'){
			$tones=$data['tones'];
			foreach($tones as $key=>$tone){
				foreach($tone as $k=>$v){
					if($k!=='h' && $k!=='a')$tones[$key][$k].='%';
				}
			}
			$tones['hr']=$data['hueRange'];
			$tones['hs']=$data['hueShift'];
			static::set_config_json('tones',$tones);
			unset($data['tones']);
			unset($data['autoDefine']);
			unset($data['hueRange']);
			unset($data['hueShift']);
		}
		$data=static::translate_keys($domain,$data);
		static::set_config_json($domain,$data);
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
	public static function set_config_json($domain,$data){
		static::$cache[$domain]=$data;
		$config_dir=self::get_config_dir_path();
		if(!is_dir($config_dir)){mkdir($config_dir,0755,true);}
		return file_put_contents($config_dir.'/'.$domain.'.json',json_encode($data,0700));
	}
	public static function get_config_json($domain){
		if(isset(static::$cache[$domain])){return static::$cache[$domain];}
		if(file_exists($f=self::get_config_dir_path().'/'.$domain.'.json')){
			return static::$cache[$domain]=json_decode(file_get_contents($f),true);
		}
		return static::$cache[$domain]=[];
	}
	public static function get_config_dir_path(){
		static $path;
		if(isset($path)){return $path;}
		$path=WP_CONTENT_DIR.'/config/';
		if(is_multisite()){$path.=get_current_blog_id().'/';}
		$path.=get_stylesheet();
		return $path;
	}
}

?>