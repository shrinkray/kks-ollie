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
// Enqueue custom javascript and load last
function kks_enqueue_scripts() {
	wp_enqueue_script( 'kks-custom-js', get_stylesheet_directory_uri() . '/dist/kks.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'kks_enqueue_scripts', 999 );


// Remove title support from images

add_filter( 'wp_get_attachment_image_attributes', 'remove_image_title_text' );
function remove_image_title_text( $attr ) {
	unset( $attr['title']) ;
	return $attr;
}

/**
 * This function modifies the main WordPress archive query for categories
 * and tags to include an array of post types instead of the default 'post' post type.
 *
 * @param object $query The main WordPress query.
 */
function tg_include_custom_post_types_in_archive_pages( $query ) {
    if ( $query->is_main_query() && ! is_admin() && ( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) ) {
        $query->set( 'post_type', array( 'teachers', 'case-study' ) );
    }
}
add_action( 'pre_get_posts', 'tg_include_custom_post_types_in_archive_pages' );
