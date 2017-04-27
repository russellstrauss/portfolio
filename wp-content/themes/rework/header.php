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
	<title>Russell Strauss - <?php the_title(); ?></title>
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" href="<?php bloginfo('template_directory');?>/bootstrap/css/bootstrap.css" />
	
	<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,100' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:300,400' rel='stylesheet' type='text/css'>
	
	
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<div class="row">
		<div class="col-xs-12 columns">
			<div class="name">
				<a href="<?php bloginfo('url'); ?>">John Russell Strauss</a>
				<?php if (is_page('resume')) { ?>
					<a href="<?php bloginfo('template_directory'); ?>/print-resume.html"><img title="Click to print." class="print-icon hide-for-small" src="<?php bloginfo('template_directory');?>/images/printer.png" alt="" /></a>
				<?php
				} ?>
			</div>
			
		</div>
	</div>

	<div class="row">
		<div class="col-sm-3">
			<nav class="main">
				<?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
			</nav>
		</div>
	
		<div class="col-sm-8">