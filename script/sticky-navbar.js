// 顶部导航sticky状态针对滚动事件的响应
//// 立即执行!

!function () {
    let view = document.querySelector('.topNavBar')

    let controller = {
        view: null,
        init: function (view) {
            // 给 controller 绑定view
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            window.addEventListener('scroll', () => {
                if (document.documentElement.scrollTop > 0) {
                    this.active()
                }
                else {
                    this.deactive()
                }
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        },
    }

    controller.init(view)
}()