// 用于控制 leancloud 的脚本

// 初始化 AV 对象
let APP_ID = 'u6evWlV1eKl06LPxfhhnrcbL-gzGzoHsz';

let APP_KEY = 'ryrfwoInyc4xw6Vuolkwoc7u';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


// 初始化一个表单和查询的数据表名称
let form = document.querySelector('#user-comments-form')
let className = 'usercomment'

// 初始化用户评论容器
let messageContainer = document.querySelector('#message-list > ul')

// 初始化评论数据
RetriveData(className, messageContainer)

// 给表单绑定提交事件监听器
form.addEventListener('submit', (e) => {
    submitHandler(e)
})


// 表单提交事件处理函数
function submitHandler(e) {
    e.preventDefault()
    let commentData = form.querySelector('#comment-data').value
    let username = form.querySelector('#comment-user-name').value
    let queryObj = AV.Object.extend(className)
    let obj = new queryObj()

    createData(commentData, username, 'usercomment', messageContainer)
}


//-------------------- CRUD --------------------
////-----CREATE 写入数据, className 是数据表名.-----
function createData(commentData, username, className, messageContainer) {

    let queryObj = AV.Object.extend(className)
    let obj = new queryObj()

    obj.save({
        data: commentData,
        user: username
    }).then(
        (response) => {
            console.log('提交成功');
            console.log(response);
            // 更新页面评论数据
            let li = document.createElement('li')
            li.innerText = `${response.attributes.user} : ${response.attributes.data}`
            messageContainer.appendChild(li)
            form.querySelector('#comment-data').value = ''
        }
        ,
        () => {
            console.log('提交失败')
        })
}

////-----Retrieve 批量获取数据.-----
////// 使用 AV.QUERY API
//////  参数分别为查询的 数据表名, 用于展示数据的 DOM 元素
function RetriveData(className, messageContainer) {
    // 定义查询的数据表
    let query = new AV.Query(className);
    let dataList
    query.find().then(function (objects) {
            dataList = []

            objects.map(item => {
                dataList.push(item.attributes)
            })

            dataList.forEach((value) => {
                let li = document.createElement('li')
                li.innerText = `${value.user} : ${value.data}`
                messageContainer.appendChild(li)
            })
        }
        ,
        function (error) {
            console.log('遇到异常', error)
        });
}

