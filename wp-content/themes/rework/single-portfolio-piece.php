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
		
		<div class="single-portfolio-piece container-fluid">

			<?php get_sidebar('title'); ?>
			
			<div class="row">
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
				<div class="col-sm-8">
					
					<div class="content">	
						<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
													
							<h1><?php the_title(); ?></h1>
							<div class="single-piece-description">
								<?php the_content(); ?>
							</div>
							
						
						<?php endwhile; 
						endif;?>
						
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

				
