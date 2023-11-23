$(window).on("load", function() {
    "use strict";



    /*=================== Video Play and Pause Button ===================*/
    $(".play-video").on("click", function() {
        $(this).parent().addClass("active");
        return false;
    });
    $(".pause-video").on("click", function() {
        $(this).parent().removeClass("active");
        return false;
    });


    /*=================== Daan Volunteer Adjustment from left ===================*/
    var gap = $(".container").offset().left;
    $(".daan-volunteers").css({
        "padding-left": gap
    });



    /*=================== Project Tabs ===================*/
    function project_tabs(){
        var getContent = $(".project-img.active").find(".get-content").html();
        $(".project-details .project-content").hide().html(getContent).fadeIn('slow');
    }

    project_tabs();

    $(".project-img").on("click",function(){
        $(this).closest(".project-selectors").find(".project-img").removeClass("active");
        $(this).addClass("active");
        project_tabs();
    });



    /*=================== Sticky Header ===================*/
    var header_stick;
    if ($("header").hasClass('stick')) {
        var header_stick = $("header").offset().top;
    }
    if ($(window).width() > 980) {
        $(window).on("scroll",function() {
            var scroll = $(window).scrollTop();
            if (scroll > header_stick) {
                $("header.stick").addClass("sticky");
                var header_height = $("header.stick").innerHeight();
                $(".menu-height").css({
                    "height": header_height
                });
            } else {
                $("header.stick").removeClass("sticky");
                $(".menu-height").css({
                    "height": 0
                });
            }
        });
    }




    /*=================== Responsive Topbar Button ===================*/
    $("#topbar-btn").on("click", function() {
        $(".responsive-header .topbar").slideToggle();
        $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        return false;
    });


    /*=================== Responsive Menu Button ===================*/
    $("#menu-btn").on("click", function() {
        $(".menu-links").toggleClass("slidein");
        return false;
    });


    /*================== Responsive Menu Dropdown =====================*/
    $(".menu-links ul ul").parent().addClass("menu-item-has-children");
    $(".menu-links ul li.menu-item-has-children > a").on("click", function() {
        $(this).parent().toggleClass("active").siblings().removeClass("active").find("ul").slideUp();
        $(this).next("ul").slideToggle();
        return false;
    });


    /*=================== Dropdown Class ===================*/
    $("nav li ul").parent().addClass("has-children");



    /*=================== Accordion ===================*/
    var elementsLength = $(".accordions").length;
    for (var i = 0; i < elementsLength; i++) {
        $(".accordions").find('.content').hide();
        $(".accordions").find('h2:first').addClass('active').next().slideDown(500).parent().addClass("activate");
        $('h2', ".accordions").on("click",function() {
            if ($(this).next().is(':hidden')) {
                $(this).parent().parent().find("h2").removeClass('active').next().slideUp(500).removeClass('animated fadeInUp').parent().removeClass("activate");
                $(this).toggleClass('active').next().slideDown(500).addClass('animated fadeInUp').parent().toggleClass("activate");
            }
        });
    }



    /* ============ Project Selectors ================*/
    $('.project-selectors').owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        loop: false,
        dots: false,
        nav: false,
        margin: 0,
        mouseDrag: true,
        items: 4,
        autoHeight: true,
        responsive :{
            1366:{items:4},            
            1200 :{items:3},            
            980 :{items:3},         
            767 :{items:3},            
            480 :{items:2},                
            0 :{items:1}      
        }    
    });


    var project_height = $(".project-selectors").innerHeight();
    $(".project-details").css({
        "height":project_height
    });


    /* ============ Limited Carosuel ================*/
    $('.limited-carousel').owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        loop: true,
        dots: false,
        nav: false,
        margin: 0,
        mouseDrag: false,
        items: 1,
        singleItem: true,
        autoplayHoverPause: true,
        URLhashListener: true,
        autoHeight: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });


    /* ============ Testimonials Carosuel ================*/
    var owl = $('.testimonials-carousel').owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        loop: false,
        dots: false,
        nav: true,
        margin: 0,
        mouseDrag: true,
        items: 1,
        singleItem: true,
        autoplayHoverPause: true,
        URLhashListener: true,
        autoHeight: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });


    /*=================== Daan Volunteer Adjustment from left ===================*/
    function SetPostion() {
        var testimonials_height = $('.testimonials-carousel-wrapper').innerHeight();
        $(".testimonials-title").css({
            "height": testimonials_height
        })
    }
    SetPostion();
    owl.on('change.owl.carousel', function(event) {
        setTimeout(function() {
            SetPostion();
        }, 500);
    });


    /*=================== Daan Popup and Page Functions ===================*/
    $(".open-popup").on("click",function(){
        $(".popup-wrapper").fadeIn();
        return false;
    });
    $("html, .close").on("click",function(){
        $(".popup-wrapper").fadeOut();
    });
    $(".daan-popup, .open-popup").on("click",function(e){
        e.stopPropagation();
    });


    function changeAmount(){
        var amount = $(".your-donation li a.active").html()
        $(".your-donation textarea").val(amount)
    }
    changeAmount();

    $(".choose-one li a, .select-one li a").on("click",function(){
        $(this).parent().siblings().find('a').removeClass("active");
        $(this).addClass("active");
        changeAmount();
        return false;
    });




    /*================== Map =====================*/
    var myLatlng = new google.maps.LatLng(34.1049669, 74.6609769);
    var mapOptions = {
        zoom: 8,
        disableDefaultUI: true,
        scrollwheel: false,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var image = '';
    var myLatLng = new google.maps.LatLng(34.1049669, 74.6609769);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });





    /* =============== Ajax Contact Form ===================== */
    $('#contactform').submit(function(){
        var action = $(this).attr('action');
        $("#message").slideUp(750,function() {
        $('#message').hide();
            $('#submit')
            .after('<img src="images/ajax-loader.gif" class="loader" />')
            .attr('disabled','disabled');
        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            comments: $('#comments').val(),
            verify: $('#verify').val()
        },
            function(data){
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
                $('#submit').removeAttr('disabled');
                if(data.match('success') != null) $('#contactform').slideUp('slow');

            }
        );
        });
        return false;
    });

    $(".boxed-style").on("click",function(){
        $(".theme-layout").addClass("boxed");
        $("body").prepend('<div class="fixed-bg bg4"></div>');
    });

    $(".full-width").on("click",function(){
        $(".theme-layout").removeClass("boxed");
        $("body").find('<div class="fixed-bg bg4"></div>').remove();
    });

    $(".side-panel-sec > a").on("click",function(){
        $(this).parent().toggleClass('active');
        return false;
    });

});