<?php
/**
 * @package WordPress
 * @subpackage themename
 */
?><!DOCTYPE html>
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html <?php language_attributes(); ?> class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="chrome=1">
	
	<title><?php
		/*
		 * Print the <title> tag based on what is being viewed.
		 */
		global $page, $paged;
	
		wp_title( '|', true, 'right' );
	
		// Add the blog name.
		bloginfo( 'name' );
	
		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) )
			echo " | $site_description";
	
		// Add a page number if necessary:
		if ( $paged >= 2 || $page >= 2 )
			echo ' | ' . sprintf( __( 'Page %s', 'themename' ), max( $paged, $page ) );
	
		?></title>
		<meta name="description" content="">
		<meta name="author" content="">
		<!--  Mobile Viewport Fix -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	    
		<!-- Place favicon.ico and apple-touch-icons in the images folder -->
		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/jrs.ico">
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon.png"><!--60X60-->
		<link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon-ipad.png"><!--72X72-->
		<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon-iphone4.png"><!--114X114-->
		<link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon-ipad3.png">	<!--144X144-->
			
		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); echo '?' . filemtime( get_stylesheet_directory() . '/style.css'); ?>" type="text/css" media="screen, projection" />
		
		<!-- WEB FONTS -->
		<link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Raleway:200' rel='stylesheet' type='text/css'>
			
		<?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		
		<!--[if lt IE 9]>
	    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	    <![endif]-->
		
		<?php wp_head(); ?>
		
		<script src="<?php bloginfo('template_directory'); ?>/js/hover-intent.js"></script>
		
		<script type="text/javascript">
			$(document).ready(function() {
			  $('.each-piece').append('<div style="clear: both;"></div>');
			  
			  $('.web-design a').attr('target','_blank');
			  $('.web-design a').css('color','red');
			  
			  $('.unfinished').hoverIntent(function(){
				  $('.coming-soon').fadeIn();
			  }, function(){
				  $('.coming-soon').fadeOut();
			  });
			});
		</script>
		
		<script type="text/javascript">

			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-38683342-1']);
			_gaq.push(['_trackPageview']);
			
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		
		</script>
	
	</head>
	
	<body <?php body_class(); ?>>
	<div id="page" class="hfeed">
		<header id="branding" role="banner">
			<nav id="main">
				<a href="<?php bloginfo('url');?>">	
					<img class="nav-image" src="<?php bloginfo('template_directory');?>/images/nav/name.png" alt="nav" />
				</a>
				<a href="<?php bloginfo('url');?>/about">	
					<img class="nav-image" src="<?php bloginfo('template_directory');?>/images/nav/about.png" alt="nav" />
				</a>
				<a href="<?php bloginfo('url');?>/work">
					<img class="nav-image" src="<?php bloginfo('template_directory');?>/images/nav/work.png" alt="nav" />
				</a>
				<a href="<?php bloginfo('url');?>/resume">
					<img class="nav-image" src="<?php bloginfo('template_directory');?>/images/nav/resume.png" alt="nav" />
				</a>
			</nav>
		</header><!-- #branding -->
	
	
		<div id="main">