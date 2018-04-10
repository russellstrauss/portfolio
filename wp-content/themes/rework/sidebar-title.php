<?php 
	$triggerAnimation = '';
	if (is_front_page()) {
		$triggerAnimation = 'trigger-animation';
		
		echo '<div id="sphereWireframe"></div>';
	} 
?>

<div class="sidebar-title row">
	<div class="col-xs-12 columns">
		<div class="name <?php echo $triggerAnimation; ?>">
			<a href="<?php bloginfo('url'); ?>">
				<span>J</span><span>o</span><span>h</span><span>n</span>
				<span>R</span><span>u</span><span>s</span><span>s</span><span>e</span><span>l</span><span>l</span>
				<span>S</span><span>t</span><span>r</span><span>a</span><span>u</span><span>s</span><span>s</span>
			</a>
			<?php if (is_page('resume')) { ?>
				<a href="<?php bloginfo('template_directory'); ?>/print-resume.html"><img title="Click to print." class="print-icon hide-for-small" src="<?php bloginfo('template_directory');?>/images/printer.png" alt="" /></a>
			<?php
			} ?>
		</div>
	</div>
</div>