<?php
/**
 * Template Name: Resume
 * Description: Resume template.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>
	
	<style>
		.name, nav.main {
			visibility: hidden;
		}
		
		.name .print-icon {
			visibility: visible;
		}

		@media (max-width: 767px) {
			.name, nav.main {
				display: none;
			}
		}
	</style>
	
	<div class="resume-content">
		
		<?php the_content(); ?>

	</div>
	
	<div class="edit-link">
		<?php edit_post_link(); ?>
	</div>

<?php get_footer(); ?>