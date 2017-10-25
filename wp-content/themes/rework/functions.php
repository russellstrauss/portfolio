<?php

// Update environment URL's
//update_option( 'siteurl', 'http://portfolio.dev' );
//update_option( 'home', 'http://portfolio.dev' );

// Disabling update notifications
add_filter('pre_site_transient_update_core','remove_core_updates');
add_filter('pre_site_transient_update_plugins','remove_core_updates');
add_filter('pre_site_transient_update_themes','remove_core_updates');
function remove_core_updates(){
	global $wp_version;
	return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
}

// Creating custom post types
add_action( 'init', 'create_post_types' );
function create_post_types() {
	
	// Categories
	register_post_type( 'portfolio-category',
		array(
			'labels' => array(
				'name' => __( 'Portfolio Categories' ),
				'singular_name' => __( 'Portfolio Category' )
			),
		'public' => true,
		'has_archive' => true,
		'supports' => array(
			'title',
			'editor',
			'thumbnail',
			'hierarchical' => true,
			),
		)
	);
	
	// Portfolio pieces
	register_post_type( 'portfolio-piece',
		array(
			'labels' => array(
				'name' => __( 'Portfolio Pieces' ),
				'singular_name' => __( 'Portfolio Piece' )
			),
		'public' => true,
		'has_archive' => true,
		'taxonomies' => array('category'),
		'hierarchical' => true,
		'supports' => array(
			'title',
			'editor',
			'thumbnail',
			'page-attributes',
			)
		)
	);
	
	// Photographs
	register_post_type( 'photograph',
		array(
			'labels' => array(
				'name' => __( 'Photographs' ),
				'singular_name' => __( 'Photograph' )
			),
		'public' => true,
		'has_archive' => true,
		'supports' => array(
			'title',
			'menu_icon' => get_bloginfo('template_directory') . '/images/admin/photo.png',
			)
		)
	);	
}



