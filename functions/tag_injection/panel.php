<?php
namespace Catpow;
?>
<?php foreach(CP::$content->conf['meta'] as $name=>$conf): ?>
<dl>
	<dt><i class="fas fa-code"></i><?=$conf['label']?></dt>
	<dd><?php input($name); ?></dd>
</dl>
<?php endforeach; ?>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>