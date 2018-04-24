<?php
/**
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

<div class="single-piece-content">	
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
								
		<h1><?php the_title(); ?></h1>
		<div class="single-piece-description">
			<p><?php the_content(); ?></p>
		</div>
		
	<?php endwhile; 
	endif;?>
	
	<div class="edit-link">
		<?php edit_post_link(); ?>
	</div>
</div>

<?php get_footer(); ?>