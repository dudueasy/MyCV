// 响应顶部导航栏点击事件的平滑滚动

//// 立即执行!
!function () {
    var view = View('nav.menu');
    var controller = {
        view: null,
        init: function init(view) {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            requestAnimationFrame(animate);
            var aTags = view.querySelectorAll('ul > li> a');
            for (var i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (x) {
                    x.preventDefault();
                    var top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop;
                    var currentTop = window.scrollY;

                    // 80像素是预留给fixed顶部导航栏的高度.
                    var targetTop = top - 80;

                    var coords = { y: currentTop };
                    var tween = new TWEEN.Tween(coords).to({ y: targetTop }, 500).easing(TWEEN.Easing.Quadratic.In).onUpdate(function () {
                        window.scrollTo(0, coords.y);
                    }).start();
                };
            }
        }
    };
    controller.init(view);
}();