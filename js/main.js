jQuery(document).ready(function( $ ) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
    $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
    $('body').append( $mobile_nav );
    $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
    $('body').append( '<div id="mobile-body-overly"></div>' );
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e){
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e){
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
       if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if( $('#header').length ) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ( $(this).parents('.nav-menu').length ) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click ( function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function() {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

//Contact
  $('#subs-form').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.attr('checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else {

      openpgp.initWorker({ path:'openpgp.worker.js' });

      openpgp.config.aead_protect = true;

      var options, encrypted, that;

      var privKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: OpenPGP.js v2.6.0
        Comment: https://openpgpjs.org

        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
        =Kcjw
        -----END PGP PUBLIC KEY BLOCK-----`;

      options = {
          data: $(this).find('textarea').val(),
          publicKeys: openpgp.key.readArmored().keys
      };

      that = $(this);

      openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.data;
        var message = that.find('textarea').val();
        that.find('textarea').val(encrypted);
        var str = that.serialize();
        
        $.ajax({
          type: "POST",
          url: "contactform.php",
          data: str,
          success: function(msg) {
            alert(msg);
            if (msg == 'OK') {
              $("#sendmessage").addClass("show");
              $("#errormessage").removeClass("show");
              $('.contactForm').find("input, textarea").val("");
            } else {
              $("#sendmessage").removeClass("show");
              $("#errormessage").addClass("show");
              $('#errormessage').html(msg);
              $('.contactForm').find("input, textarea").val(message);
            }
          }
        });
      });
    }
    return false;
  });

  $("#btn-subscription").on('click', function() {
    $('#subs-form').submit();
  });

});
