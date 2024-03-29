<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-pricelist'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"imageSrc"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
			"imageAlt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.image'],
			"title"=>["source"=>'html',"selector"=>'.title'],
			"caption"=>["source"=>'html',"selector"=>'.caption'],
			"price"=>["source"=>'html',"selector"=>'.price'],
		],
		"default"=>array_map(function($i){
			return [
				"classes"=>'item hasCaption level'.($i+1),
				"imageSrc"=>cp::get_file_url('/images/dummy.jpg'),
				"imageAlt"=>'dummy',
				"imageCode"=>'',
				"title"=>['Product'],
				"caption"=>['caption'],
				"price"=>['¥0,000'],
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];