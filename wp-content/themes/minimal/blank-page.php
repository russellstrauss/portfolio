<?php
/**
 * Template Name: Blank page
 * Description: An empty blank page.
 *
 * @package WordPress
 * @subpackage Portfolio
 */

get_header(); ?>

		<div id="primary" class="full-width">
			<div id="content">

				<header class="entry-header">
					<h1 class="entry-title"><?php the_title(); ?></h1>
				</header><!-- .entry-header -->

				<div class="entry-content">
					<?php the_content(); ?>
					<?php wp_link_pages( 'before=<div class="page-link">' . __( 'Pages:', 'themename' ) . '&after=</div>' ); ?>
					<?php edit_post_link( __( 'Edit', 'themename' ), '<span class="edit-link">', '</span>' ); ?>
				</div><!-- .entry-content -->


			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>