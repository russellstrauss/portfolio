<?php
/**
 * Template Name: Portfolio Category
 * Description: A page with all works within a portfolio category displayed.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

		<div id="primary" class="full-width">
			<div id="content">
			
				<div class="coming-soon">Coming soon!</div>
				
				<div class="category-content">	
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
						
						<?php $page_title_url = str_replace(' ', '-', strtolower(get_the_title()) );?>
						
						<h1><?php the_title(); ?></h1>
						<div class="category-description"><?php the_content(); ?></div>
						
						<?php $thumbnail_count = 1; ?>
						<!-- Querying each work within the category -->
						<?php $query_string = 'category_name='.$page_title_url.'&post_type=portfolio-piece&post_parent=0&order=ASC'; ?>
						<?php $my_query2 = new WP_Query($query_string); ?>
						<?php while ($my_query2->have_posts()) : $my_query2->the_post(); ?>
							
							<?php if ($page_title_url == '3d-modeling') { ?>
							
								<!-- creating a row every two elements -->
								<?php if ($thumbnail_count%2 == 1) { ?>
									
									<div class="row">
								<?php	
								} ?>
							
								<div class="each-piece-3d-models">
							<?php
							}
							else { ?>
							
							<div class="each-piece"> 
							
							<?php
							} ?>
								
								<?php if ($page_title_url == 'web-design' && get_field('external-link') != null) {
									$link = get_field('external-link') . '\" target=\"_blank\"';
								}
								else {
									$link = get_permalink();
								} ?>
								
								
								<?php if ($page_title_url == '3d-modeling') { ?>
									
									
									<a id="thumbnail-link-<?php echo $thumbnail_count;?>">
										<?php the_post_thumbnail( array(100, 100) ); ?>
									</a>
									
									<div class="piece-details">
										<h2><a href="<?php echo $link; ?>"> &rsaquo; <?php the_title(); ?> </a></h2>
										<p><?php the_field('description'); ?></p>
										
										<?php $count = 1; ?>
										
										<?php 
										$query_string = 'category_name=3d-modeling&post_type=portfolio-piece&post_parent='.get_the_ID().'&order=ASC';
										$the_children = new WP_Query($query_string);
										while ($the_children->have_posts()) : $the_children->the_post(); ?>
											
											<?php $src = get_field('model-image'); ?>
																						
											<a rel="shadowbox[<?php the_field('group-label');?>]" <?php if ($count==1) {echo 'id="first-model-link-'. $thumbnail_count.'"';}?> href="<?php echo $src['url']; ?>" alt=" " title="<?php echo $src['title']; ?>" />&bull; Angle <?php echo $count; ?> </a><br />
											
											
																		
											<?php $count++; ?>
											
										<?php endwhile; ?>
										
										<script type="text/javascript">
											$(document).ready( function() {
												// Getting the thumbnail link to be clickable and open the first image for each model
												$('a#thumbnail-link-<?php echo $thumbnail_count;?>').click( function() {
													Shadowbox.open(document.getElementById('first-model-link-<?php echo $thumbnail_count;?>'));
													return false;
												});
											});
										</script>
										
									</div> 
									
									<!-- closing a row every two elements -->
									<?php if ($thumbnail_count%2 == 0) { ?>
											<div style="clear: both;"> &nbsp;</div>
										</div> <!-- end .row -->
									<?php	
									} ?>

								<?php		
								}
								else { ?>
									
									<?php
									if (get_field('unfinished')) { ?>
										<a class="unfinished">
											<?php the_post_thumbnail( array(100, 100) ); ?>
										</a>
										<div class="piece-details">
											
											<h2><a class="unfinished"> &rsaquo; <?php the_title(); ?> </a></h2>
											<p><?php the_field('description'); ?></p>
										</div> 
									<?php
									} 
									else { ?>
										
										<?php if ($page_title_url == 'web-design') { ?>
											<a href="<?php echo $link; ?>">
												<?php the_post_thumbnail( array(100, 100) ); ?>
											</a>
											<div class="piece-details">
												
												<h2><a href="<?php echo $link; ?>"> &rsaquo; <?php the_title(); ?> </a></h2>
												<p><?php the_field('description'); ?></p>
											</div>
										<?php
										}
										else { ?>
											<a href="<?php echo $link; ?>">
												<?php the_post_thumbnail( array(100, 100) ); ?>
											</a>
											<div class="piece-details">
												
												<h2><a href="<?php echo $link; ?>"> &rsaquo; <?php the_title(); ?> </a></h2>
												<p><?php the_field('description'); ?></p>
											</div>
										<?php
										} ?> 
									
									<?php
									}
								} ?>
							</div>
							<?php $thumbnail_count++; ?>
						<?php endwhile; ?>
						
					
					<?php endwhile; 
					endif;?>
				</div>


			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>