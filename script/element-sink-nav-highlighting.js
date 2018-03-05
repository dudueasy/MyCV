// 立即执行!

!function () {
    window.addEventListener('scroll', () => {
        elementSinkAndNavListHighlighting()
    })


// 元素下沉和导航高亮
// == 实现了: 1. 元素下沉特效 2. 顶部导航栏高亮
    window.elementSinkAndNavListHighlighting = function() {
        let specialTags = document.querySelectorAll('[data-x]')

        // minIndex:离页面顶部最近元素的索引
        let minIndex = 0
        for (let i = 0; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }

        // 页面滚动时的元素下沉特效:
        // == 给离页面顶部最近的元素移除 .offset 样式 ( transform: translateY(100px) => transform: translateY(0) )
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id

        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let liSiblings = li.parentNode.children

        // 顶部导航栏标签高亮
        for (let i = 0; i < liSiblings.length; i++) {
            liSiblings[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }
}()