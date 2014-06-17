jQuery(document).ready(function($) {

    // Find all of the list items in the admin tab
    $togglePSDListItem = $('#wp-admin-bar-toggle-psd').find('.toggle-psd-item');

    // Turn off the default behavior for a tag 
    $togglePSDListItem.on('click', 'a', function(e){
      e.preventDefault();
    });

    // Add the buttons to the options
    $togglePSDListItem.each(function(){
      $(this).prepend('<button class="toggle-state-hidden">O</button>');
    });


    // Find the data number of each admin bar
    $.fn.matchUpDataNumbers = function() {
        var imageNumber = $(this).find('.toggle-psd-overlay').data('psd-number');
        $('#listOfOverlays').find('.overlay-image').each(function(){
          var overlayNumber = $(this).data('psd-number');
          $overlayImage = $(this).find('img');
          // This value is for the image positioning
          $overlayWidth = $overlayImage.width();
          $positioningValue = '-' + $overlayWidth / 2 + 'px';

          // Set the negative value of the image for positioning
          $overlayImage.css( 'left', $positioningValue );

          // Check if it is already active
          if ( $overlayImage.hasClass('overlay-active') ) {
            $overlayImage.removeClass('overlay-active');
          } else {
            // Ensure all of the overlay-active classes are removed
            $overlayImage.removeClass('overlay-active');

            if ( imageNumber === overlayNumber ) {
              $overlayImage.toggleClass('overlay-active');
            }
          }
        });
    };

    // Remove state-active and add state-hidden
    $.fn.turnOff = function() {
      $activeOverlayImage = $('#listOfOverlays').find('.overlay-active').removeClass('overlay-active');
      clicks = 0;
       return $(this).removeClass('state-active').addClass('state-hidden').turnOffAdminBar();
    }; 

    // Remove state-active and add state-hidden
    $.fn.turnOn = function() {
      return $(this).addClass('state-active').removeClass('state-hidden').matchUpDataNumbers();
    }; 

    // Remove Admin Bar class
    $.fn.turnOffAdminBar = function() {
      $('#wp-admin-bar-toggle-psd').removeClass('top-level-overlay-active');
    }

    // Clicking the item
    $togglePSDListItem.on('click', function(){

      // Get state for the clicked item
      $activeClass = $(this).hasClass('state-active');
      $hiddenClass = $(this).hasClass('state-hidden');

      // Turn every item off and ensure they have state-hidden
      $togglePSDListItem.each(function(){
        $(this).turnOff();
      });

      // Add active state to the clicked item
      $(this).turnOn();

      // Check if the item has state-active
      // If so that means that this is their second click
      // So toggle it off dammit
      if ( $activeClass ) {
        $(this).turnOff();
      }
    });

    // Toggle the overlay via the top level admin bar button
    var clicks = 0;
    $('#wp-admin-bar-toggle-psd').on('click', function(){
      // Check which list item is active
      // If none are active, do not activate class
      var $activeOverlay = $(this).find('.state-active').val();
      if ( $activeOverlay !== 0 ) {
        return false;
      }

      // }
      console.log("IN");
      // If one is then toggle it up!
      // $(this).toggleClass('top-level-overlay-active').find('li.state-active').toggleClass('state-active');
      $(this).toggleClass('top-level-overlay-active');
      // If you click on the admin button
      // Find the active overlay
      // Turn it off
      if ( clicks <= 0 ) {
        // Get the active-overlay once and set the state
        // var clicks gets reset in turnOff function to reset state
        $activeOverlayImage = $('#listOfOverlays').find('.overlay-active');
      } else {
        $activeOverlayImage.toggleClass('overlay-active');
      }

      clicks++;
    });
});