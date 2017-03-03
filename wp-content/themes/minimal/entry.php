
<?php //single_post_title(); ?> 
<?php //get_template_part('entry','content'); ?>



<div id="primary" class="full-width">
	<div id="content">

		<div class="single-piece-content">	

				<h1><?php single_post_title(); ?></h1>
				<div class="single-piece-description">
					<?php get_template_part('entry','content'); ?>
				</div>
			
			<div style="font-size:10px; text-align:right; margin-top: 10px;">
				<?php edit_post_link(); ?>
			</div>
		</div>


	</div><!-- #content -->
</div><!-- #primary -->