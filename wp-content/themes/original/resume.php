<?php
/**
 * Template Name: Resume
 * Description: Resume template.
 *
 * @package WordPress
 * @subpackage Portfolio
 */


get_header(); ?>
	
	<script type="text/javascript">
		jQuery('nav#main').hide();
	</script>
	
	<div id="primary" class="full-width">
		<div id="content">
				
			<div class="resume-content">
				<a href="<?php bloginfo('url');?>">
					<img style="margin-bottom: 100px;" src="<?php bloginfo('template_directory');?>/images/resume-name.png" alt="name" />
				</a>
				
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
											
					<?php the_content(); ?>
					
				<?php endwhile; 
				endif;?>
				
<!--
				<div style="font-size:10px; text-align:right; margin-top: 10px;">
					<?php edit_post_link(); ?>
				</div>
-->
			</div>


		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>