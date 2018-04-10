<?php
/**
 * Template Name: Photography
 * Description: Template for photography page.
 *
 * @package WordPress
 * @subpackage Portfolio
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<?php get_header(); ?>

	<body <?php body_class(); ?>>
		
		<div class="photography container-fluid">

			<?php get_sidebar('title'); ?>
			
			<div class="row">
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
				<div class="col-sm-8">
					
					<div class="category-content">	
						<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
							
							<?php $page_title_url = str_replace(' ', '-', strtolower(get_the_title()) );?>
							
							<h1><?php the_title(); ?></h1>
							<div class="category-description"><?php the_content(); ?></div>
							
							<div class="photo-thumbnails">
								<?php $count = 0; ?>
								<!-- Querying each work within the category -->
								<?php $query_string = 'post_type=photograph&posts_per_page=100'; ?>
								<?php $my_query2 = new WP_Query($query_string); ?>
								<?php while ($my_query2->have_posts()) : $my_query2->the_post(); ?>
									
									<?php $photoURL = get_field('photo')['sizes']['thumbnail']; ?>
									
									<?php $src = get_field('photo'); ?>
									
									<div class="box">
										<a href="<?php echo $src['url']; ?>" rel="shadowbox[photos]">
											<div class="photo-thumb" style="background-image: url(<?php echo $src['sizes']['thumbnail']; ?>);">
											</div>
										</a>
									</div>
										
								<?php endwhile; ?>
							</div>
							
						
						<?php endwhile; 
						endif;?>
					</div>
					
				</div>
			</div>
			
		</div>

		<?php get_footer(); ?>

	</body>
</html>

				
