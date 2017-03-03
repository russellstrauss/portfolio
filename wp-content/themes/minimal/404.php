<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
		<title>John Russell Strauss - <?php the_title(); ?></title>
		<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>" />
		
		<link href="<?php bloginfo('template_directory');?>/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		
		<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,100' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Rosario' rel='stylesheet' type='text/css'>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		
		<?php wp_head(); ?>
	</head>
	
	<body <?php body_class(); ?>>
				
		<div class="error-message" style="display: block; margin: 200px auto; width: 80%;">
			There is nothing at the URL you specified.<br/><br/><a href="<?php bloginfo('url');?>">&lt; back</a>
		</div>		
		
		<footer>
		
		</footer>
			
		
		<?php wp_footer(); ?>
		
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="<?php bloginfo('template_directory');?>/bootstrap/js/bootstrap.min.js"></script>
		<script src="<?php bloginfo('template_directory');?>/js/easing.js"></script>
	
	</body>
</html>