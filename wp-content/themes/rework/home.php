<?php
/**
 * Template Name: Home
 * Description: Home page
 *
 * @package WordPress
 * @subpackage Portfolio
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<?php get_header(); ?>

	<body <?php body_class(); ?>>
		
		<div class="homepage container-fluid">
			
			<?php get_sidebar('title'); ?>
			
			<div class="row">
				<div class="col-sm-3">
					<?php get_sidebar(); ?>
				</div>
			</div>
			
		</div>

		<?php get_footer(); ?>

	</body>
</html>