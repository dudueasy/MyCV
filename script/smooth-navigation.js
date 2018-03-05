// 响应顶部导航栏点击事件的平滑滚动

//// 立即执行!
!function () {
    let view = document.querySelector('nav.menu')
    let controller = {
        view: null,
        init: function (view) {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            requestAnimationFrame(animate);
            let aTags = view.querySelectorAll('ul > li> a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (x) {
                    x.preventDefault()
                    let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
                    let currentTop = window.scrollY

                    // 80像素是预留给fixed顶部导航栏的高度.
                    let targetTop = top - 80

                    let coords = {y: currentTop};
                    let tween = new TWEEN.Tween(coords)
                        .to({y: targetTop}, 500)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(function () {
                            window.scrollTo(0, coords.y)
                        })
                        .start();
                }
            }
        }
    }
    controller.init(view)

}()