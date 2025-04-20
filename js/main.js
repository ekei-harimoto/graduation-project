"use strict";

/*---------- ハンバーガーメニュー ----------*/
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

/*---------- スライドショー ----------*/
$(function () {
  $(".video3").on("loadedmetadata", function () {
    var $video1 = $(".video1").get(0),
      $video2 = $(".video2").get(0),
      $video3 = $(".video3").get(0),
      videoTime1 = Math.floor($video1.duration * 1000),
      videoTime2 = Math.floor($video2.duration * 1000),
      videoTime3 = Math.floor($video3.duration * 1000);
    $video1.play();

    $(".slider")
      .slick({
        autoplay: true,
        arrows: false,
        fade: true,
        autoplaySpeed: videoTime1,
        swipe: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        dots: true,
        dotsClass: "video_dots",
      })
      .on("afterChange", function (event, slick, currentSlide, nextSlide) {
        switch (currentSlide) {
          case 0:
            $(this).slick("slickSetOption", "autoplaySpeed", videoTime1);
            $video1.play();
            $video2.pause();
            $video2.currentTime = 0;
            $video3.pause();
            $video3.currentTime = 0;
            break;
          case 1:
            $(this).slick("slickSetOption", "autoplaySpeed", videoTime2);
            $video2.play();
            $video1.pause();
            $video1.currentTime = 0;
            $video3.pause();
            $video3.currentTime = 0;
            break;
          case 2:
            $(this).slick("slickSetOption", "autoplaySpeed", videoTime3);
            $video3.play();
            $video1.pause();
            $video1.currentTime = 0;
            $video2.pause();
            $video2.currentTime = 0;
            break;
        }
      });
  });
});

/*---------- アコーディオン ----------*/

$(".acc-btn").click(function () {
  if ($(this).next().is(":hidden")) {
    $(".acc-content").slideUp("selected");
    $(this).next().slideDown("selected");
  } else {
    $(this).next().slideUp("selected");
  }
});

/*---------- クラス追加 ----------*/
$(function () {
  // 変数にクラスを入れる
  var section = $(".card2");

  //スクロールして、スクロール量が100を超えたら表示
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 1000) {
      section.addClass("change");
    } else {
      section.removeClass("change");
    }
  });
});

/*---------- タイピング ----------*/
// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
  $(".top_kv_copy").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); //spanタグを取得
      //spanタグの要素の１つ１つ処理を追加
      thisChild.each(function (i) {
        var time = 100;
        //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
        $(this)
          .delay(time * i)
          .fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); //delay処理を止める
        $(this).css("display", "none"); //spanタグ非表示
      });
    }
  });
}
// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  //spanタグを追加する
  var element = $(".top_kv_copy");
  element.each(function () {
    var text = $(this).html();
    var textbox = "";
    text.split("").forEach(function (t) {
      if (t !== " ") {
        textbox += "<span>" + t + "</span>";
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  TextTypingAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
