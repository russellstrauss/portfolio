<?php
/**
 * @package WordPress
 * @subpackage Portfolio
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<?php get_header(); ?>

	<body <?php body_class(); ?>>
		
		<div class="entry container-fluid">

			<?php get_sidebar('title'); ?>
			
			<div class="row">
				
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
				
				<div class="col-sm-8">
					
					<div class="single-piece-content">	

						<h1><?php single_post_title(); ?></h1>
						
						<div class="single-piece-description">
							<?php the_content(); ?>
						</div>
						
						<!-- <div class="single-piece-description">
							<?php //get_template_part('entry','content'); ?>
						</div> -->
					
					<div class="edit-post-link">
						<?php edit_post_link(); ?>
					</div>
				</div>
					
				</div>
			</div>
			
		</div>

		<?php get_footer(); ?>

	</body>
</html>

				
