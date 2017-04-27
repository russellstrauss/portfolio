<?php
/**
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

		<div id="primary" class="full-width">
			<div id="content">

				<div class="single-piece-content">	
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
												
						<h1><?php the_title(); ?></h1>
						<div class="single-piece-description">
							<?php the_content(); ?>
						</div>
						
					
					<?php endwhile; 
					endif;?>
					
					<div style="font-size:10px; text-align:right; margin-top: 10px;">
						<?php edit_post_link(); ?>
					</div>
				</div>


			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>