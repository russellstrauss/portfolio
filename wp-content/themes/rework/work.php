<?php
/**
 * Template Name: Work
 * Description: A page listing all catgories of work. 
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

	<div id="category-container">
		
		<?php query_posts( 'post_type=portfolio-category&order=ASC&posts_per_page=100' ); ?>
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<div class="portfolio-category">
											
				<?php $link = get_bloginfo('url') . '/work/' . str_replace(' ', '-', strtolower(get_the_title()) );?>
				<?php if (get_the_title() == "Other") {?>
					
					<a class="unfinished">
						<?php the_title(); ?>								
					</a>
				<?php
				}
				else { ?>
					
					<a href="<?php echo $link; ?>">
						<?php the_title(); ?>								
					</a>
				<?php
				} ?>
				
			 </div>
		<?php endwhile; 
		endif;?>
		
		<div style="clear: both;"></div>
							
	</div>


<?php get_footer(); ?>