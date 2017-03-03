<?php
/**
 * @package WordPress
 * @subpackage themename
 */

get_header(); ?>

	<script type="text/javascript">
		jQuery('nav#main').hide();
	</script>

	<div id="primary">
		<div id="content">

			<img style="display: block; margin: 200px auto;" src="<?php bloginfo('template_directory');?>/images/404.png" alt="404 error" />
			
			<div class="error-message">
				There is nothing at the URL you specified.
			</div>
			
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>