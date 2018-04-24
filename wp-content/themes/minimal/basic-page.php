<?php
/**
 * Template Name: Basic page
 * Description: An basic page with text.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

	<div class="entry-content">
		
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<?php the_content(); ?>
		<?php 
		endwhile; 
		endif ;?>
		
	</div>

<?php get_footer(); ?>