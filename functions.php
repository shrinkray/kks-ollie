<?php

// Remove layout_block added by the Ed School plugin

if ( ! function_exists( 'plugin_prefix_unregister_post_type' ) ) {
	function plugin_prefix_unregister_post_type() {
		unregister_post_type( 'layout_block' );
	}
}
add_action( 'init', 'plugin_prefix_unregister_post_type' );


// Enqueue custom stylesheet and load last

add_action( 'wp_enqueue_scripts', 'kks_enqueue_styles', 20 );
function kks_enqueue_styles() {
	$css_rel_path = '/dist/koolkatscience.css';
	$css_abs_path = get_stylesheet_directory() . $css_rel_path;
	$css_ver      = file_exists( $css_abs_path ) ? filemtime( $css_abs_path ) : wp_get_theme()->get( 'Version' );
	wp_enqueue_style(
		'kks-custom',
		get_stylesheet_directory_uri() . $css_rel_path,
		array( 'ollie' ),
		$css_ver
	);
}
// Enqueue custom javascript and load last
function kks_enqueue_scripts() {
	$js_rel_path = '/dist/koolkatscience.js';
	$js_abs_path = get_stylesheet_directory() . $js_rel_path;
	$js_ver      = file_exists( $js_abs_path ) ? filemtime( $js_abs_path ) : wp_get_theme()->get( 'Version' );
	wp_enqueue_script( 'kks-custom-js', get_stylesheet_directory_uri() . $js_rel_path, array(), $js_ver, true );
}
add_action( 'wp_enqueue_scripts', 'kks_enqueue_scripts', 999 );

/**
 * Guard against corrupted attachment metadata (missing sizes[*]['file']).
 * This can otherwise trigger PHP warnings in `wp_calculate_image_srcset()`.
 */
add_filter(
	'wp_calculate_image_srcset_meta',
	function ( $image_meta ) {
		if ( empty( $image_meta['sizes'] ) || ! is_array( $image_meta['sizes'] ) ) {
			return $image_meta;
		}

		foreach ( $image_meta['sizes'] as $size_name => $size_meta ) {
			if ( is_array( $size_meta ) && ! isset( $size_meta['file'] ) ) {
				unset( $image_meta['sizes'][ $size_name ] );
			}
		}

		return $image_meta;
	},
	10,
	1
);


// Remove title support from images

add_filter( 'wp_get_attachment_image_attributes', 'remove_image_title_text' );
function remove_image_title_text( $attr ) {
	unset( $attr['title'] );
	return $attr;
}

/**
 * This function modifies the main WordPress archive query for categories
 * and tags to include an array of post types instead of the default 'post' post type.
 *
 * @param object $query The main WordPress query.
 */
function tg_include_custom_post_types_in_archive_pages( $query ) {
	if ( $query->is_main_query() && ! is_admin() && ( is_category() || is_tag() ) && empty( $query->query_vars['suppress_filters'] ) ) {
		$query->set( 'post_type', array( 'teachers', 'case-study' ) );
	}
}
add_action( 'pre_get_posts', 'tg_include_custom_post_types_in_archive_pages' );



// Add custom image sizes
function kks_add_image_sizes() {
	add_image_size( 'post-thumbnail', 200, 120, true ); //
	add_image_size( 'post-thumbnail-square', 120, 120, true ); //
	add_image_size( 'post-featured-full', 768, 467, true ); // in post featured image
	add_image_size( 'post-featured-mobile', 665, 400, true ); // in post featured image mobile
	add_image_size( 'post-portrait-image', 185, 240, true ); // inline post portrait image
	add_image_size( 'story-inline-image', 210, 210, true ); //  inline story image
	add_image_size( 'page-inline-1col', 354, 200, true ); //  inline page image
	add_image_size( 'page-inline-sq-1col', 354, 354, true ); //  inline page square
	add_image_size( 'page-inline-2col', 808, 606, true ); //  inline page image
	add_image_size( 'page-inline-2col-edp', 378, 190, true ); //  EDP inline page image
	add_image_size( 'page-inline-1col-image', 410, 302, true ); // 4:3 on col image inline page image
}
add_action( 'after_setup_theme', 'kks_add_image_sizes' );



// Add custom image sizes to media library
function kks_custom_sizes( $sizes ) {
	return array_merge(
		$sizes,
		array(
			'post-thumbnail'         => __( 'Post Thumbnail' ),
			'post-thumbnail-square'  => __( 'Post Thumbnail Square' ),
			'post-featured-full'     => __( 'Post Featured Full' ),
			'post-featured-mobile'   => __( 'Post Featured Mobile' ),
			'post-portrait-image'    => __( 'Post Portrait Image' ),
			'story-inline-image'     => __( 'Story Inline Image' ),
			'page-inline-1col'       => __( 'Page Inline 1 Col' ),
			'page-inline-sq-1col'    => __( 'Page Inline Square 1 Col' ),
			'page-inline-2col'       => __( 'Page Inline 2 Col' ),
			'page-inline-2col-edp'   => __( 'Page Inline 2 Col EDP' ),
			'page-inline-1col-image' => __( 'Page Inline 1 Col Image' ),
		)
	);
}
add_filter( 'image_size_names_choose', 'kks_custom_sizes' );

// Enable featured images
add_theme_support( 'post-thumbnails' );

// Add new image sizes in theme
the_post_thumbnail( 'post-featured-full' );

// Add Facebook Pixel to site per KKS request 3/4/2024

function js_hook_scripts() {
	// Get the site URL
	$site_url = wp_parse_url( get_bloginfo( 'url' ), PHP_URL_HOST );

	// Check if the site URL is exactly 'koolkatscience.net'
	if ( 'koolkatscience.net' === $site_url ) {
		// Meta Pixel account ID, configurable via the KKS_META_PIXEL_ID env var
		// (falls back to the existing production pixel if unset).
		$meta_pixel_id = getenv( 'KKS_META_PIXEL_ID' );
		if ( ! $meta_pixel_id ) {
			$meta_pixel_id = '5582662448427098';
		}
		?>
		<!-- Meta Pixel Code -->
		<!-- Meta Pixel Code -->
		<script>
		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window, document,'script',
		'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '<?php echo esc_js( $meta_pixel_id ); ?>');
		fbq('track', 'PageView');
		</script>
		<noscript><img height="1" width="1" style="display:none"
		src="www.facebook.com/…"
		/></noscript>
<!-- End Meta Pixel Code -->
		<!-- End Meta Pixel Code -->
		<?php
	} else {
		// If the site URL is not 'koolkatscience.net', do nothing
		echo '<!-- Site URL is not koolkatscience.net -->';
		return;
	}
}

add_action( 'wp_head', 'js_hook_scripts' );

/**
 * Adjust WordPress heartbeat settings
 */
function kks_heartbeat_settings( $settings ) {
	// Increase the interval to 60 seconds (default is 15-60)
	$settings['interval'] = 60;

	// Set a minimum interval to prevent too frequent requests
	$settings['minimalInterval'] = 60;

	return $settings;
}
add_filter( 'heartbeat_settings', 'kks_heartbeat_settings' );

/**
 * Extend session lifetime
 */
function kks_extend_session_lifetime( $lifetime ) {
	// Extend session lifetime to 24 hours (default is 2 hours)
	return 86400;
}
add_filter( 'auth_cookie_expiration', 'kks_extend_session_lifetime' );

/**
 * Extend the auth cookie without rotating the session token.
 *
 * Rotating the token (calling wp_set_auth_cookie without the current token)
 * invalidates WordPress nonces — which breaks WP Migrate DB Pro mid-migration.
 */
function kks_refresh_session() {
	if ( ! is_user_logged_in() ) {
		return;
	}

	$user_id = get_current_user_id();
	$token   = wp_get_session_token();

	if ( ! $user_id || ! $token ) {
		return;
	}

	wp_set_auth_cookie( $user_id, true, '', $token );
}
add_action( 'wp_ajax_heartbeat', 'kks_refresh_session', 1 );


add_filter(
	'jwt_auth_whitelist',
	function ( $endpoints ) {
		$endpoints = is_array( $endpoints ) ? $endpoints : array();

		$wp_migrate_db_pro_endpoints = array(
			'/wp-json/mdb-api/v1/*',
		);

		return array_unique( array_merge( $endpoints, $wp_migrate_db_pro_endpoints ) );
	}
);
