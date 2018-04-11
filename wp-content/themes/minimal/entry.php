<div class="single-piece-content">	

	<h1><?php single_post_title(); ?></h1>
	<div class="single-piece-description">
		<?php get_template_part('entry','content'); ?>
	</div>
	
	<div class="edit-link">
		<?php edit_post_link(); ?>
	</div>
</div>