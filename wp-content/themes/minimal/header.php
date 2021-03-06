<!DOCTYPE html>
<html <?php language_attributes(); ?>>


<!--
               ___           ___           ___           ___           ___           ___       ___                  
              /\  \         /\__\         /\  \         /\  \         /\  \         /\__\     /\__\                 
             /::\  \       /:/  /        /::\  \       /::\  \       /::\  \       /:/  /    /:/  /                 
            /:/\:\  \     /:/  /        /:/\ \  \     /:/\ \  \     /:/\:\  \     /:/  /    /:/  /                  
           /::\~\:\  \   /:/  /  ___   _\:\~\ \  \   _\:\~\ \  \   /::\~\:\  \   /:/  /    /:/  /                   
          /:/\:\ \:\__\ /:/__/  /\__\ /\ \:\ \ \__\ /\ \:\ \ \__\ /:/\:\ \:\__\ /:/__/    /:/__/                    
          \/_|::\/:/  / \:\  \ /:/  / \:\ \:\ \/__/ \:\ \:\ \/__/ \:\~\:\ \/__/ \:\  \    \:\  \                    
             |:|::/  /   \:\  /:/  /   \:\ \:\__\    \:\ \:\__\    \:\ \:\__\    \:\  \    \:\  \                   
             |:|\/__/     \:\/:/  /     \:\/:/  /     \:\/:/  /     \:\ \/__/     \:\  \    \:\  \                  
             |:|  |        \::/  /       \::/  /       \::/  /       \:\__\        \:\__\    \:\__\                 
              \|__|         \/__/         \/__/         \/__/         \/__/         \/__/     \/__/                 
      ___           ___           ___                             ___           ___           ___           ___     
     /\__\         /\  \         /\  \                           /\__\         /\  \         /\  \         /\  \    
    /:/ _/_       /::\  \       /::\  \                         /:/  /        /::\  \       /::\  \       /::\  \   
   /:/ /\__\     /:/\:\  \     /:/\ \  \                       /:/__/        /:/\:\  \     /:/\:\  \     /:/\:\  \  
  /:/ /:/ _/_   /::\~\:\  \   _\:\~\ \  \                     /::\  \ ___   /::\~\:\  \   /::\~\:\  \   /::\~\:\  \ 
 /:/_/:/ /\__\ /:/\:\ \:\__\ /\ \:\ \ \__\                   /:/\:\  /\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\
 \:\/:/ /:/  / \/__\:\/:/  / \:\ \:\ \/__/                   \/__\:\/:/  / \:\~\:\ \/__/ \/_|::\/:/  / \:\~\:\ \/__/
  \::/_/:/  /       \::/  /   \:\ \:\__\                          \::/  /   \:\ \:\__\      |:|::/  /   \:\ \:\__\  
   \:\/:/  /        /:/  /     \:\/:/  /                          /:/  /     \:\ \/__/      |:|\/__/     \:\ \/__/  
    \::/  /        /:/  /       \::/  /                          /:/  /       \:\__\        |:|  |        \:\__\    
     \/__/         \/__/         \/__/                           \/__/         \/__/         \|__|         \/__/    
     
-->

<head>
	<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<title>John Russell Strauss - <?php the_title(); ?></title>
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
	<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
	<link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:300' rel='stylesheet' type='text/css'>
	<link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700|Montserrat:400,600,700|Oswald:500" rel="stylesheet">
	<link href="<?php bloginfo('template_directory');?>/assets/js/vue/dist/app.js" rel="preload" as="script">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory');?>/assets/js/vue/dist/app.css">

	<?php if (is_page('resume')) 
	{ ?>
		<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet">
		<?php
	} ?>
	
	<?php wp_head(); ?>
</head>

<body <?php if (is_front_page()) { echo 'class="front-page"';}?>>

	<?php 
	if (is_front_page()) {	
		echo '<div id="sphereWireframe"></div>';
	} ?>
		
	<div class="name">
		<a  class="swipe" href="<?php bloginfo('url'); ?>">John Russell Strauss</a>
		
		<?php if (is_page('resume')) { ?>
			<img title="Click to print." class="print-icon hide-for-small" src="<?php bloginfo('template_directory');?>/assets/img/printer.png" alt="Print Resume" />
		<?php
		} ?>
	</div>

	<div class="layout-wrapper">

		<nav class="main">
			<?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
		</nav>
	
		<div class="main-content">