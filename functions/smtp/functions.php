<?php
add_action('phpmailer_init',function($mailer){
	$smtp=get_option('cp_smtp');
	if($smtp){
		$mailer->isSMTP();
		$mailer->Host=$smtp['host'][0];
		$mailer->SMTPAuth=true;
		$mailer->Username=$smtp['user'][0];
		$mailer->Password=$smtp['pass'][0];
		$mailer->SMTPSecure=empty($smtp['ssl'][0])?'tls':'ssl';
		$mailer->Port=$smtp['port'][0]??(empty($smtp['ssl'][0])?587:465);
	}
});