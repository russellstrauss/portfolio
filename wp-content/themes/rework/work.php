<?php
/**
 * Template Name: Work
 * Description: A page listing all catgories of work. 
 *
 * @package WordPress
 * @subpackage Portfolio
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<?php get_header(); ?>

	<body <?php body_class(); ?>>
		
		<div class="work container-fluid">

			<?php get_sidebar('title'); ?>
			
			<div class="row">
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
				<div class="col-sm-8">
					
					<?php query_posts( 'post_type=portfolio-category&order=ASC&posts_per_page=100' ); ?>
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
						<div class="portfolio-category">
														
							<?php $link = get_bloginfo('url') . '/work/' . str_replace(' ', '-', strtolower(get_the_title()) );?>

							<a href="<?php echo $link; ?>">
								<?php the_title(); ?>								
							</a>
							
						 </div>
					<?php endwhile; 
					endif;?>
					
				</div>
			</div>
			
		</div>

		<?php get_footer(); ?>

	</body>
</html>
							


