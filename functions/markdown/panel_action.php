<?php
namespace Catpow;
if($_REQUEST['md_action']==='upload'){
	if(empty($_FILES['md']['tmp_name'])){
		echo 'ファイルが選択されていません';
	}
	else{
		$names=(array)$_FILES['md']['name'];
		$tmp_names=(array)$_FILES['md']['tmp_name'];
		$post_types=array_keys($GLOBALS['post_types']);
		$pattern='/^(?P<post_type>'.implode('|',$post_types).')\-(?P<id>\d+)\.md/';
		foreach($names as $i=>$fname){
			if(preg_match($pattern,$fname,$matches)){
				$post_type=$matches['post_type'];
				$id=$matches['id'];
				$post=get_post($id);
				$md=file_get_contents($tmp_names[$i]);
				$content=markdown\cpmd::markdown_to_block_code($md);
				if(empty($post)){
					$post_name=strstr($fname,'.',true);
					if(preg_match('|<(h\d).+?>(?P<title>[^$]+?)</\1>|',$content,$headingMatches)){
						$post_title=$headingMatches['title'];
					}
					else{
						$post_title=$post_name;
					}
					$result=wp_insert_post([
						'import_id'=>$id,
						'post_name'=>$post_name,
						'post_title'=>$post_title,
						'post_content'=>$content,
						'post_type'=>$post_type
					],true);
					if(is_wp_error($result)){
						printf('%sの投稿に失敗しました<br/>%s<br/>',$fname,$result->get_error_message);
					}
					else{
						printf('「%s」を新規投稿しました<br/>',$post_title);
					}
				}
				else{
					if($post->post_type!==$post_type){
						printf('%sは処理されませんでした<br/>ID:%dの投稿が%sの投稿タイプで既に投稿されています<br/>',$id,$post->post_types);
						continue;
					}
					wp_update_post([
						'ID'=>$id,
						'post_content'=>$content
					]);
					printf('「%s」を更新しました<br/>',$post->post_title);
				}
				continue;
			}
			printf('%sは処理されませんでした<br/>　一致するルールがありません。',$fname);
		}
	}
}