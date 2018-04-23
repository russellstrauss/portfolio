<?php
/**
 * Template Name: Photography
 * Description: Template for photography page.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

		<div id="primary" class="full-width">
			<div id="content">

				<div class="category-content">	
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
						
						<?php $page_title_url = str_replace(' ', '-', strtolower(get_the_title()) );?>
						
						<h1><?php the_title(); ?></h1>
						<div class="category-description">
							<p><?php the_content(); ?></p>
						</div>
						
						<div class="photo-thumbnails">
							<?php $count = 0; ?>
							<!-- Querying each work within the category -->
							<?php $query_string = 'post_type=photograph&posts_per_page=100'; ?>
							<?php $my_query2 = new WP_Query($query_string); ?>
							<?php while ($my_query2->have_posts()) : $my_query2->the_post(); ?>
								
								<div class="photo-thumb">
									<?php $src = get_field('photo'); ?>
									
									<a href="<?php echo $src['url']; ?>" rel="shadowbox[photos]">
									
										<?php $src = get_field('photo'); ?>
										
										<img src="<?php echo $src['sizes']['thumbnail']; ?>" alt="<?php echo $src['alt']; ?>" title="<?php echo $src['title']; ?>" />
										
									</a>
								</div>
									
							<?php endwhile; ?>
							<div class="clear">&nbsp;</div>
						</div>
						
					
					<?php endwhile; 
					endif;?>
				</div>


			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>