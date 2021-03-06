<?php

add_action( 'save_post', array( 'Toggle_PSD_Utils', 'update_transient' ) );

if( ! class_exists('Toggle_PSD_Utils') ){

    class Toggle_PSD_Utils {

        public static function parse_link( $link ){

            $protocol = substr($link, 0, 4);

            if( $protocol !== 'http' ){

                $link = 'http://' . $link;
            }

            return $link;
        }

        // @param - string (url)
        // @return - bool (does this link represent an external link)
        public static function is_link_external( $link ){

            $external = false;
            $protocol = substr($link, 0, 7);

            if ( $protocol === 'http://' || $protocol === 'https:/' ) {

               // link starts with http:// or https:/ protocol, assume external
               $external = true;
               $site_url = site_url();

               if (
                   strlen($link) >= strlen($site_url)  // the $link is longer (or equal) to site_url, might be internal
                   &&
                   substr($link, 0, strlen($site_url)) == $site_url // the beginning of $link matches $site_url, definitely internal
               ) {
                   $external = false;
               }
           }

           return $external;
        }

        /**
            * @param - string $transient_name
            * @param - array $query_args
            *
            * @return WP_Query instance
        */

        public static function get_transient( $transient_name, $query_args ){

            global $post;

            $the_transient = get_transient( $transient_name );

            if ( false === $the_transient )  {

                $custom_query = new WP_Query( $query_args );
                set_transient( $transient_name, $custom_query, 12 * HOUR_IN_SECONDS );
                $the_transient = get_transient( $transient_name );
            }

            return $the_transient;
        }

        public static function update_transient( $post_id ) {

            if ( 'toggle_psd' !== get_post_type( $post_id ) ) {

                return;
            }

            delete_transient( 'toggle-psd-overlays' );
        }
    }
}