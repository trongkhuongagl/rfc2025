(function ($, window) {
  "use strict";
  var bp = 737;

  // wrapperの中のtargetに一番大きいheightを追加
  var sameheight = function (wrapper, target) {
    $(wrapper).each(function (i, box) {
      var maxHeight = 0;
      $(box).find(target).each(function () {
        $(this).height('auto');
        if ($(this).height() > maxHeight) maxHeight = $(this).height();
      });
      $(box).find(target).height(maxHeight);
    });
  };

  var hidespnav = function () {
    $('body').removeClass('m-spnav-close m-spnav-open');
    $('body').addClass('m-spnav-close');
    count_a = 0;
    //count_b = 0;
    //count_d = 0;
  };

  var hidespmegamenu = function () {
    $('body').removeClass('m-spmegamenu-close m-spmegamenu-open m-megamenu_products-open m-megamenu_shop-open');
    $('body').addClass('m-spmegamenu-close');
  };


  // ハンバーガーメニュー開閉
  var count_a = 0;
  $(".spnav__menuopner").click(function () {
    count_a++;
	//20210427
    $("body")
      .toggleClass("m-spnav-close", count_a % 2 == 0)
      .toggleClass("m-spnav-open", count_a % 2 == 1);
    hidespmegamenu();
	return false;
  });

  
  // 商品紹介開く
  $(".megamenu_products .navigation__list__item__anchor").click(function () {
    $('body').addClass('m-megamenu_products-open');
    if ($('body').hasClass('m-sp')) {
      return false;
    }
  });

  // 店舗検索開く
  $(".megamenu_shop .navigation__list__item__anchor").click(function () {
    $('body').addClass('m-megamenu_shop-open');
    if ($('body').hasClass('m-sp')) {
      return false;
    }
  });

  // 商品紹介と店舗検索を閉じる
  $(".megamenu_back").click(function () {
    $('body').removeClass('m-megamenu_products-open m-megamenu_shop-open');
  });

  
  // footerメニュー
  var hidespfootermenu = function () {
    $('body').removeClass('m-spfooterproduct-close m-spfooterproduct-open m-spfootershop-close m-spfootershop-open');
    $('body').addClass('m-spfooterproduct-close m-spfootershop-close');
  };


  var count_c = 0;
  $(".colorchart__opener").click(function () {
    count_c++;
    $(".colorchart")
      .toggleClass("m-close", count_c % 2 == 0)
      .toggleClass("m-open", count_c % 2 == 1);
  });

  var addlayoutclass = function () {
    var w = $(window).width();
    $('body').removeClass('m-pc m-sp');
    if (w < bp) {
      $('body').addClass('m-sp');
      if ($('body').hasClass('home')) {
      }
    } else if (w > bp) {
      $('body').addClass('m-pc');
    }
  };
  
  var naviBg = function () {
	 if($(window).scrollTop() > 0){
		$('.navigation').removeClass("nav-bg");
	 }else{
		$('.navigation').addClass("nav-bg");
	 }
  };
  $(window).on('load resize', function () {
    var w = $(window).width();
    if ($('body').hasClass('home')) {
      if (w < bp) {
        $('body').removeClass("nav-relative");
        $('body').removeClass("nav-firstview");
        $('body').addClass("nav-fixed");
      } else if (w > bp) {
        $('body').addClass("nav-relative");
        $('body').addClass("nav-firstview");
        $('body').removeClass("nav-fixed");
        if ($('body').hasClass('nav-firstview')) {
          $('.body').css('margin-top', 'auto');
        }
      }
    } else {
      if (w < bp) {
        $('body').removeClass("nav-relative");
        $('body').removeClass("nav-firstview");
      }
    }
  });

  $(window).on('load resize', function () {
    addlayoutclass();
    hidespnav();
    hidespmegamenu();
    hidespfootermenu();
	naviBg();
    $('.m-pc .subnavigation__list__item').hover(
      function () {
        $('.subnavigation__list__item').removeClass('active');
        $(this).addClass('active');
      }
    );

    $(".subnavigation__list__item__anchor").click(
      function () {
        $('.subnavigation__list__item').removeClass('active');
        $(this).parent().addClass('active');
        return false;
      }
    );

    $(".m-sp li.contents__item.product > span").click(
      function () {
        $('body').removeClass('m-spfootershop-open');
        $('body').removeClass('m-spfooterproduct-close');
        $('body').addClass('m-spfootershop-close');
        $('body').addClass('m-spfooterproduct-open');
        return false;
      }
    );
    $(".m-sp li.contents__item.shop > span").click(
      function () {
        $('body').removeClass('m-spfooterproduct-open');
        $('body').removeClass('m-spfootershop-close');
        $('body').addClass('m-spfooterproduct-close');
        $('body').addClass('m-spfootershop-open');
        return false;
      }
    );

    $(".subcontents__close").click(
      function () {
        $('body').removeClass('m-spfooterproduct-open m-spfootershop-open');
        $('body').addClass('m-spfooterproduct-close m-spfootershop-close');
      }
    );

    $(".pagetop").click(
      function () {
        $('body,html').animate({
          scrollTop: 0
        }, 500, 'swing');
      }
    );

    $('a[href^="#"]').click(
      function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({
          scrollTop: position
        }, speed, "swing");
        return false;
      }
    );

    $(".hasmodal .newsitem__image").click(
      function () {
        $('body').addClass('m-showmodalbg');
        $(this).siblings('.newsitem__modal').addClass('m-showmodal');
      }
    );
    
    $(".hasmodal .newsitem__modal__close").click(
      function () {
        $('body').removeClass('m-showmodalbg');
        $(this).parent().removeClass('m-showmodal');
      }
    );
    

    if ($(".home div").hasClass('pickup__items')) {
      sameheight('.pickup__items', '.item__about');
    }

    var glovalNav = $('.navigation');
    var navHeight = glovalNav.outerHeight(true);
    var navOffset = glovalNav.offset().top;
    var timer = false;

    $(window).scroll(function () {
		naviBg();
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        //var scroll_top = $(this).scrollTop(); //. スクロール位置
        if ($(this).scrollTop() > navOffset + navHeight) {
          $('body').removeClass("nav-relative");
          $('body').removeClass("nav-firstview");
          $('body').addClass("nav-fixed");
          //$('.body').css('margin-top', navHeight);
        } else {
          if ($('body').hasClass('home') && ($(window).width() < bp)) {
          } else if ($('body').hasClass('home') && ($(window).width() > bp)) {
            $('body').addClass("nav-relative");
            $('.body').css('margin-top', 'auto');
            $('body').addClass("nav-firstview");
          } else {
            //$('.body').css('margin-top', navHeight);
//            $('body').addClass("nav-relative");
//            $('.body').css('margin-top', 'auto');
//            $('body').addClass("nav-firstview");
          }
        }
      }, 100);
    });

    $('.m-pc .has_megamenu').bind('mouseenter mouseleave', function () {
      $('body').toggleClass('showMegaMenuBg');
    });
  });

  
  //20190116更新対応
  $(function () {
    // 商品詳細アコーディオン開閉
    if($('body').hasClass('product-detail')){
      $('.acd-btn').on("click", function () {
        $(this).next('.acd-box').slideToggle(600);
        $(this).toggleClass('active'); //追加部分
      });
    }
  });
  //20190822更新対応
  $(function () {
    // クチュール商品詳細アコーディオン開閉
    if($('body').hasClass('couture-product-detail')){
      $('.acd-btn').on("click", function () {
        $(this).next('.acd-box').slideToggle(600);
        $(this).toggleClass('active'); //追加部分
      });
    }
  });
  
  //20190315更新対応
  $(function () {
    // スペシャルページ関連商品誘導バナー　オフ
    if($('body').hasClass('special-index') || $('body').hasClass('special-detail')){
      $('.relateditem-banner .close-btn').on("click", function () {
        $('.relateditem-banner').fadeOut(400);
      });
    }
  });
  //20190326更新対応
  $(function () {
    // 美的タイアップ誘導バナー　オフ
    if($('body').hasClass('home')){
      $('.biteki-tieup .close-btn').on("click", function () {
        $('.biteki-tieup').fadeOut(400);
      });
    }
  });
  //20200414更新対応
  $(function () {
    // メゾンコーセー誘導バナー　オフ
    if($('body').hasClass('series-index') || $('body').hasClass('couture')){
      $('.maison-kose-banner .close-btn').on("click", function () {
        $('.maison-kose-banner').fadeOut(400);
      });
    }
  });
  
}(jQuery, window));
