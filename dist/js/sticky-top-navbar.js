// 顶部导航sticky状态针对滚动事件的响应
//// 立即执行!

!function () {
    var view = View('.topNavBar');

    var controller = {
        view: null,
        init: function init(view) {
            // 给 controller 绑定view
            this.view = view;
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var _this = this;

            window.addEventListener('scroll', function () {
                if (document.documentElement.scrollTop > 0) {
                    _this.active();
                } else {
                    _this.deactive();
                }
            });
        },
        active: function active() {
            this.view.classList.add('sticky');
        },
        deactive: function deactive() {
            this.view.classList.remove('sticky');
        }
    };

    controller.init(view);
}();