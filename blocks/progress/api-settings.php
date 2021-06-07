<?php
$meta_name='_progress_block_settings';
$default_settings=[
	'classes'=>'hasCounter',
	'countPrefix'=>'Step.',
	'countSuffix'=>'',
	'items'=>[
		['label'=>'入力','classes'=>''],
		['label'=>'確認','classes'=>''],
		['label'=>'送信','classes'=>''],
	]
];
if($req['param']==='register'){
	update_post_meta($req['post_id'],$meta_name,$req['settings']);
	$res->set_data([
		'post'=>get_post_type($req['post_id']).'/'.get_page_uri($req['post_id'])
	]);
	return;
}
if($req['param']==='update'){
	$post=cp::get_post($req['post']);
	if(empty($post)){return;}
	update_post_meta($post->ID,$meta_name,$req['settings']);
	return;
}
if($req['param']==='delete'){
	$post=cp::get_post($req['post']);
	if(empty($post)){return;}
	delete_post_meta($post->ID,$meta_name);
	return;
}
if($req['param']==='selections'){
	$posts=get_posts([
		'post_type'=>array_keys($GLOBALS['post_types']),
		'meta_query'=>[
			['key'=>$meta_name,'compare'=>'exists']
		]
	]);
	$selections=['default'=>'──'];
	foreach($posts as $post){
		$post_type_label=$GLOBALS['post_types'][$post->post_type]['label']??'';
		$selections[$post->post_type.'/'.get_page_uri($post)]=$post_type_label.'：'.$post->post_title;
	}
	$res->set_data($selections);
	return;
}

if($req['post']==='default'){
	$res->set_data($default_settings);
	return;
}
$post_data=cp::get_post_data($req['post']);

if(empty($post_data['meta'][$meta_name][0])){
	$res->set_data($default_settings);
	return;
}
$res->set_data($post_data['meta'][$meta_name][0]);