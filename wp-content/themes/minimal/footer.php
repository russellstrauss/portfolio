			<div class="clearfix"></div>
		
		</div> <!-- .main-content -->
		
		<div class="clearfix"></div>

	<?php wp_footer(); ?>
	
	<?php
	if (is_front_page()) {	

		$directory = get_template_directory_uri();
		echo '<script src="' . $directory . '/assets/vendors/js/three.min.js"></script>';
	} ?>
	
	<script type="text/javascript" src="<?php bloginfo('template_directory');?>/assets/js/vue/dist/app.js"></script>
	<script src="<?php bloginfo('template_directory');?>/assets/vendors/js/vendors.js"></script>
	<script src="<?php bloginfo('template_directory');?>/assets/js/bundle.js"></script>

</body>
</html>