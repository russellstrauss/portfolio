<?php
/**
 * Template Name: Basic page
 * Description: An basic page with text.
 *
 * @package WordPress
 * @subpackage Portfolio
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<?php get_header(); ?>

	<body <?php body_class(); ?>>
		
		<div class="basic-page container-fluid">

			<?php get_sidebar('title'); ?>
			
			<div class="row">
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
				<div class="col-sm-8">
					
					<?php if (is_page('About')) {?>
						<div class="quote">
							<p>
								"If you had heard only a quarter of what I have heard about him, and I have only heard a very little of all there is to hear, you would be prepared for any sort of remarkable tale. Tales and adventures sprouted up all over the place wherever he went, in the most extraordinary fashion."
							</p>
							<div class="quote-author">&mdash;J.R.R. Tolkien</div>
							<div class="clearfix"></div>
						</div>
					<?php
					} ?>
					
					<div class="entry-content">
						
						<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
							 <?php the_content(); ?>
						<?php endwhile; 
						endif;?>
						
					</div>
					
				</div>
			</div>
			
		</div>

		<?php get_footer(); ?>

	</body>
</html>