<h1>index.php</h1>

<div id="content">
	<?php get_template_part( 'nav', 'above' ); ?>
	<?php while ( have_posts() ) : the_post() ?>
	<?php get_template_part( 'entry' ); ?>
	<?php comments_template(); ?>
	<?php endwhile; ?>
	<?php get_template_part( 'nav', 'below' ); ?>
</div>
<?php get_footer(); ?>