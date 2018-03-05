// 初始化动作: 1. 页面加载动画特效的延时删除 2. 初始导航栏高亮
setTimeout(() => {
    siteWelcome.classList.remove('active')
    elementSinkAndNavListHighlighting()
}, 1000)


window.onload = function () {
    // 顶部导航栏鼠标事件移入移出的动效
    let liTags = document.querySelectorAll('nav.menu >ul >li')

    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (e) {
            e.currentTarget.classList.add('active')
        }

        liTags[i].onmouseleave = function (e) {
            e.currentTarget.classList.remove('active')
        }
    }
}

