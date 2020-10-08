<?php
namespace Catpow;
$prm=shortcode_atts([0=>false],$atts);
$data=$GLOBALS['loop_block_data'][$prm[0]];

if(empty($data['query'])){
	$query=null;
}
else{
	$data['query']=do_shortcode($data['query']);
	if($data['query'][0]==='{'){
		$query=json_decode($data['query'],1)?:null;
	}
	elseif($data['query'][0]==='[' && preg_match('/^\[([\w_\\\:]+)(\s(.+))?\]$/',$data['query'],$matches)){
		$query=$matches[1](shortcode_parse_atts($matches[3]));
	}
	else{
		$cond=new util\cond($data['query']);
		$query=$cond->get_query($data['path']);
	}
}

if(cp::$content){
	$path=$data['path'];
	if(!empty($path)){
		if(strpos($path,'/')===false){
			$loop=\cp::$content->meta($path,$query);
		}
		else{
			if(substr_count($path,'/')==1){$path.='/default';}
			$loop=\cp::$content->query($path,$query);
		}
	}
	else{$loop=\cp::$content;}
	
	if($loop->query->is_empty()){
		echo $data['on_empty']??'';
	}
	else{
		echo $data['before_loop']??'';
		foreach($loop->loop() as $obj){
			echo do_shortcode($data['content']);
		}
		echo $data['after_loop']??'';
	}
}