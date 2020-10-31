$(document).ready(function(){
    $('.slider_main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        dots: false,
        fade: true,
        asNavFor: '.slider_small',
        focusOnSelect: true,
        draggable: false,
        swipe: false
    });



    $('.slider_small').slick({
        asNavFor: '.slider_main',
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        rows: 1,
        adaptiveHeight: true,
        focusOnSelect: true
    });


    $('.main_slider').slick({
        arrows: true,
        variableWidth: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        waitForAnimate: false,
        centerMode: true,
        infinite: true,
        slidesToShow: 3
    });

    $('.popup_link').magnificPopup();
});
