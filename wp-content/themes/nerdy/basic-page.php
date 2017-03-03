<?php
/**
 * Template Name: Basic page
 * Description: An basic page with text.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

<script type="text/javascript">
	jQuery(".entry-content").ticker({
		cursorList:  " ",
		rate:        10,
		delay:       4000
	}).trigger("play").trigger("stop");

</script>

<div id="primary" class="full-width">
	<div id="content">

		<div class="entry-content">
			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				 <?php the_content(); ?>
			<?php endwhile; 
			endif;?>
			
		</div><!-- .entry-content -->


	</div><!-- #content -->
</div><!-- #primary -->

<?php get_footer(); ?>