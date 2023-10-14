<?php

// Remove layout_block added by the Ed School plugin

if( !function_exists( 'plugin_prefix_unregister_post_type' ) ) {
	function plugin_prefix_unregister_post_type(){
    	unregister_post_type( 'layout_block' );
	}
}
add_action('init','plugin_prefix_unregister_post_type');


// Enqueue custom stylesheet and load last 

add_action( 'wp_enqueue_scripts', 'kks_enqueue_styles', 20 );
function kks_enqueue_styles() {
	wp_enqueue_style( 'kks-custom',
		get_stylesheet_directory_uri() . '/dist/kks.css',
		array( 'ollie' ),
		wp_get_theme()->get( 'Version' ) // This only works if you have Version defined in the style header.
	);
}