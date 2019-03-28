<?php
/**
 * Template Name: Portfolio Category
 * Description: A page with all works within a portfolio category displayed.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

<?php 
// Custom function to check if page content is empty
function empty_content($str) {
	return trim(str_replace('&nbsp;','',strip_tags($str,'<img>'))) == '';
} ?>

<div class="category-content">	
	<?php 
	if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		
		<?php 
			$post_slug = $post->post_name;
			$page_title_url = substr($post_slug, strrpos($post_slug, '/')); 
		?>
		
		<h1><?php the_title(); ?></h1>
		<div class="category-description">
			<p><?php the_content(); ?></p>
		</div>
		<?php $thumbnail_count = 1; ?>
		<!-- Querying each work within the category -->
		<?php $query_string = 'category_name='.$page_title_url.'&post_type=portfolio-piece&posts_per_page=-1&post_parent=0&order=ASC'; ?>
		<?php $my_query2 = new WP_Query($query_string); ?>
		<?php 
		while ($my_query2->have_posts()) : $my_query2->the_post(); ?>
			
			<?php 
			if ($page_title_url == '3d-modeling') 
			{ ?>
			
				<div class="each-piece-3d-models">
				<?php
			}
			else 
			{ ?>
			
				<div class="each-piece"> 
				
				<?php
			} ?>
			
			<?php 
			if (($page_title_url == 'web-development' || $page_title_url == 'computer-graphics' || $page_title_url == 'fragments') && get_field('external-link') != null) 
			{
				$link = get_field('external-link') . '" target="_blank"';
			}
			else 
			{
				$link = get_permalink();
			} ?>
			
			<?php 
			if ($page_title_url == '3d-modeling') 
			{ ?>
				
				<a id="thumbnail-link-<?php echo $thumbnail_count;?>">
					<?php the_post_thumbnail( array(100, 100) ); ?>
				</a>
				
				<div class="piece-details">
					<h2><a href="<?php echo $link; ?>"><?php the_title(); ?> </a></h2>
					<p><?php the_field('description'); ?></p>
					
					<?php $count = 1; ?>
					
					<?php 
					$query_string = 'category_name=3d-modeling&post_type=portfolio-piece&post_parent='.get_the_ID().'&order=ASC';
					$the_children = new WP_Query($query_string);
					
					while ($the_children->have_posts()) : $the_children->the_post(); ?>
						
						<?php $src = get_field('model-image'); ?>
						
						<a rel="shadowbox[<?php the_field('group-label');?>]" <?php if ($count==1) {echo 'id="first-model-link-'. $thumbnail_count.'"';}?> href="<?php echo $src['url']; ?>" alt=" " title="<?php echo $src['title']; ?>" />Angle <?php echo $count; ?> </a><br />
											
						<?php $count++; ?>
						
						<?php 
					endwhile; ?>
					
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

				<?php	
			}
			else 
			{ ?>
				
				<?php 
				if ($page_title_url == 'web-development') 
				{ ?>
					
					<?php
					if ($link != null)
					{ ?>
						<a href="<?php echo $link; ?>">
							<?php the_post_thumbnail( array(100, 100) ); ?>
						</a>
						<?php
					}
					else {
						the_post_thumbnail( array(100, 100) );
					} ?>

					<div class="piece-details">
						
						<?php
						if ($link != null)
						{ ?>
							<h2><a href="<?php echo $link; ?>"><?php the_title(); ?> </a></h2>
							<?php 
						}
						else { ?>
							<h2><?php the_title(); ?></h2>
							<?php
						} ?>
						<p><?php the_field('description'); ?></p>
					</div>
					<?php
				}
				else 
				{ ?>
					<a href="<?php echo $link; ?>">
						<?php the_post_thumbnail( array(100, 100) ); ?>
					</a>
					<div class="piece-details">
						<h2><a href="<?php echo $link; ?>"><?php the_title(); ?> </a></h2>
						<p><?php the_field('description'); ?></p>
					</div>
					<?php
				} ?> 

				<?php
			} ?>
			<div style="clear: both;"></div>
		</div>
		<?php $thumbnail_count++; ?>
		<?php endwhile; ?>
	<?php endwhile; 
	endif;?>
</div>

<?php get_footer(); ?>