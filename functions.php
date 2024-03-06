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



// Add custom image sizes
function kks_add_image_sizes() {
    add_image_size('post-thumbnail', 200, 120, true); // 
    add_image_size('post-thumbnail-square', 120, 120, true); // 
    add_image_size('post-featured-full', 768, 467, true); // in post featured image
    add_image_size('post-featured-mobile', 665, 400, true); // in post featured image mobile
    add_image_size('post-portrait-image', 185, 240, true); // inline post portrait image
    add_image_size('story-inline-image', 210, 210, true); //  inline story image
    add_image_size('page-inline-1col', 354, 200, true); //  inline page image
    add_image_size('page-inline-sq-1col', 354, 354, true); //  inline page square
    add_image_size('page-inline-2col', 808, 606, true); //  inline page image
    add_image_size('page-inline-2col-edp', 378, 190, true); //  EDP inline page image
    add_image_size('page-inline-1col-image', 410, 302, true); // 4:3 on col image inline page image
}
add_action('after_setup_theme', 'kks_add_image_sizes');



// Add custom image sizes to media library
function kks_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'post-thumbnail' => __( 'Post Thumbnail' ),
        'post-thumbnail-square' => __( 'Post Thumbnail Square' ),
        'post-featured-full' => __( 'Post Featured Full' ),
        'post-featured-mobile' => __( 'Post Featured Mobile' ),
        'post-portrait-image' => __( 'Post Portrait Image' ),
        'story-inline-image' => __( 'Story Inline Image' ),
        'page-inline-1col' => __( 'Page Inline 1 Col' ),
        'page-inline-sq-1col' => __( 'Page Inline Square 1 Col' ),
        'page-inline-2col' => __( 'Page Inline 2 Col' ),
        'page-inline-2col-edp' => __( 'Page Inline 2 Col EDP' ),
        'page-inline-1col-image' => __( 'Page Inline 1 Col Image' ),
    ) );
}
add_filter( 'image_size_names_choose', 'kks_custom_sizes' );

// Enable featured images
add_theme_support( 'post-thumbnails' );

// Add new image sizes in theme
the_post_thumbnail( 'post-featured-full' );

// Add Facebook Pixel to site per KKS request 3/4/2024

function js_hook_scripts() {
    // Get the site URL
    $site_url = parse_url(get_bloginfo('url'), PHP_URL_HOST);

    // Check if the site URL is exactly 'koolkatscience.net'
    if ($site_url === 'koolkatscience.net') {
        ?>
        <!-- Meta Pixel Code -->
        <script>
            !function(f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function() {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1123271415696787');
            fbq('track', 'PageView');
        </script>
        <noscript>
            <img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=1123271415696787&ev=PageView&noscript=1" />
        </noscript>
        <!-- End Meta Pixel Code -->
        <?php
    } else {
        // If the site URL is not 'koolkatscience.net', do nothing
        echo 'Site URL is not koolkatscience.net';
        return;
    }
}

add_action('wp_head', 'js_hook_scripts');
