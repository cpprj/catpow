<?php
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[-1],
	'send_mail'=>[],
	'task_process'=>[]
];
$post_data['post_content']=cp::get_block_code('section',[
	'clases'=>'article headline',
	'title'=>__('送信先のメールアドレスを入力','catpow')
],[
	cp::get_block_code('paragraph',[
		'content'=>__('入力したメールアドレスに申込フォームへのリンクを記載したメールを送信します','catpow')
	]),
	cp::get_block_code('simpletable',[
		'classes'=>'inputs',
		'rows'=>[
			['classes'=>'required','cells'=>[
				['text'=>__('メールアドレス','catpow')],
				['text'=>"[input email]"]
			]]
		]
	]),
	cp::get_block_code('formbuttons',[
		'classes'=>'m',
		'items'=>[
			['action'=>'entry','text'=>__('申込メールを送信','catpow')]
		]
	])
]);