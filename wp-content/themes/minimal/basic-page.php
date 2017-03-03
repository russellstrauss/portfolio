<?php
/**
 * Template Name: Basic page
 * Description: An basic page with text.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>
		
		<?php if (is_page('About')) {?>
			<div class="quote">
				<p>
					"If you had heard only a quarter of what I have heard about him, and I have only heard a very little of all there is to hear, you would be prepared for any sort of remarkable tale. Tales and adventures sprouted up all over the place wherever he went, in the most extraordinary fashion."
				</p>
				<div class="quote-author">&mdash;J.R.R. Tolkien</div>
				<div style="clear: both;"></div>
			</div>
		<?php
		} ?>
		
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