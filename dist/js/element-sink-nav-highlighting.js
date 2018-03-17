// 立即执行!

!function () {
    window.addEventListener('scroll', function () {
        elementSinkAndNavListHighlighting();
    });

    // 元素下沉和导航高亮
    // == 实现了: 1. 元素下沉特效 2. 顶部导航栏高亮
    window.elementSinkAndNavListHighlighting = function () {
        var specialTags = document.querySelectorAll('[data-x]');

        // minIndex:离页面顶部最近元素的索引
        var minIndex = 0;
        for (var i = 0; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i;
            }
        }

        // 页面滚动时的元素下沉特效:
        // == 给离页面顶部最近的元素移除 .offset 样式 ( transform: translateY(100px) => transform: translateY(0) )
        specialTags[minIndex].classList.remove('offset');
        var id = specialTags[minIndex].id;

        var a = document.querySelector('a[href="#' + id + '"]');
        var li = a.parentNode;
        var liSiblings = li.parentNode.children;

        // 顶部导航栏标签高亮
        for (var _i = 0; _i < liSiblings.length; _i++) {
            liSiblings[_i].classList.remove('highlight');
        }
        li.classList.add('highlight');
    };
}();