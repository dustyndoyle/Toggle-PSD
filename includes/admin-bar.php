<?php
// Adds the admin bar
// Only on the front end
// There is an issue with when you try to create a new post
// It will automatically fill in the post/page content with a Toggle PSD
// This is a patch
if ( !is_admin() ) {

    add_action( 'wp_before_admin_bar_render', 'add_toggle_psd_admin_bar' );
}

function add_toggle_psd_admin_bar() {

    global $wp_admin_bar;

    // Adding the top level "Toggle PSD" tab
    $args = array(
        'id'    => 'toggle-psd',
        'title' => 'Toggle PSD',
        'href'  => '',
        'meta'  => array(
            // 'class' => 'state-hidden'
        ),
    );

    $wp_admin_bar->add_node( $args );

    add_toggle_psd_admin_bar_subnodes();
}

function add_toggle_psd_admin_bar_subnodes() {

    global $wp_admin_bar;
    global $post;

    $custom_query = Toggle_PSD::get_psds();
    $count = 0;

    while( $custom_query->have_posts() ) :

        $custom_query -> the_post();

        $title = get_the_title( $post->ID );

        $args =  array(
            'id'    => 'toggle-psd-' . $count,
            'title' => $title,
            'href'  => '',
            'parent'=> 'toggle-psd',
            'meta'      => array(
                'class'     => 'toggle-psd-node-container',
                'html'      => '
                    <div class="toggle-psd-node location-admin-bar" data-state="hidden" data-node-id="' . $count . '"></div>'
                ,
            ),
        );

        $wp_admin_bar->add_node( $args );

        $count++;

    endwhile;
    wp_reset_query();
}