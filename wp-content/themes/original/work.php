<?php
/**
 * Template Name: Work
 * Description: A page listing all catgories of work. 
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

		<div id="primary" class="full-width">
			<div id="content">
				
				<div class="work">
					<div class="coming-soon">Coming soon!</div>
				</div>
				
				<div id="category-container">
					
					
					<?php query_posts( 'post_type=portfolio-category' ); ?>
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
						<div class="portfolio-category">
														
							<?php $link = get_bloginfo('url') . '/work/' . str_replace(' ', '-', strtolower(get_the_title()) );?>
							<?php if (get_the_title() == "Other") {?>
								<a class="unfinished">
									<span class="white-brushed-border"></span>
									<?php the_post_thumbnail( array(200,200) ); ?> 
								</a>
								
								<a class="unfinished">
									<?php the_title(); ?>								
								</a>
							<?php
							}
							else { ?>
								<a href="<?php echo $link; ?>">
									<span class="white-brushed-border"></span>
									<?php the_post_thumbnail( array(200,200) ); ?> 
								</a>
								
								<a href="<?php echo $link; ?>">
									<?php the_title(); ?>								
								</a>
							<?php
							} ?>
							
						 </div>
					<?php endwhile; 
					endif;?>
					
					<div style="clear: both;"></div>
										
				</div><!-- .entry-content -->


			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>