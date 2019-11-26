<?php
/**
 * Plugin Name: WP Plugin with Gutenberg Packages
 * Description: WordPress example plugin that uses Gutenberg packages as frontend framework.
 * Version: 1.0.0
 * Author: Edi Amin
 * Author URI: https://github.com/ediamin
 * Text Domain: wp-guten
 * Domain Path: /languages/
 */

// Plugin constants
define( 'WP_GUTEN_PLUGIN_FILE' ,  __FILE__ );
define( 'WP_GUTEN_PLUGIN_ROOT' ,  dirname( WP_GUTEN_PLUGIN_FILE ) );
define( 'WP_GUTEN_PLUGIN_ROOT_URL', plugins_url( '', WP_GUTEN_PLUGIN_FILE ) );

// Register an admin menu
add_action( 'admin_menu', 'wp_guten_add_admin_menu' );

function wp_guten_add_admin_menu() {
    $hook = add_menu_page(
        __( 'WP Guten', 'wp-guten' ),
        __( 'WP Guten', 'wp-guten' ),
        'manage_options',
        'wp-guten',
        'wp_guten_admin_page'
    );

    add_action( $hook, 'wp_guten_enqueue_scripts' );
}

// Admin page content callback
function wp_guten_admin_page() {
    echo '<div id="wp-guten"></div>';
}

// Enqueue admin page scripts
function wp_guten_enqueue_scripts() {
    $asset = require_once WP_GUTEN_PLUGIN_ROOT . '/assets/js/wp-guten-admin.asset.php';

    // enqueue admin styles
    wp_enqueue_style(
        'wp-guten-admin',
        WP_GUTEN_PLUGIN_ROOT_URL . '/assets/css/wp-guten-admin.css',
        [ 'wp-components' ], // required since we're using @wordpress/components
        $asset['version']
    );

    // enqueue admin script
    wp_enqueue_script(
        'wp-guten-admin',
        WP_GUTEN_PLUGIN_ROOT_URL . '/assets/js/wp-guten-admin.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );
}
