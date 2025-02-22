/*
Template Name: Halping - Online Find Caregiving Jobs Mobile Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 0.1
*/

/*
- landing slider
- interview
- profile
*/

(function($) {
    "use strict"; // Start of use strict

    // Sidebar
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');

    var defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: 'Halping',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
    };

    // call our plugin
    var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

    // landing slider
    $('.landing-slider').slick({
        arrows: false,
        autoplay: true,
        dots: true,
    });

    // interview
    $('.favorites-slider').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 4.5,
        slidesToScroll: 3,
        arrows: false,
    });

    // profile
    $('.personal-img').slick({
        arrows: false,
        autoplay: true,
    });



})(jQuery);