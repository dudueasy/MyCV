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
    let commentData = document.querySelector('#comment-data').value
    let queryObj = AV.Object.extend(className)
    let obj = new queryObj()

    createData(commentData, 'usercomment')
    RetriveData(className, messageContainer)

}


//-------------------- CRUD --------------------
////-----CREATE 写入数据, className 是数据表名.-----
function createData(commentData, className) {

    let queryObj = AV.Object.extend(className)
    let obj = new queryObj()

    obj.save({data: commentData})
        .then(
            (response) => {
                console.log('提交成功');
                console.log(response);
                RetriveData(className);

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

            // 每次展示数据前先清理原数据
            while (messageContainer.firstChild) {
                messageContainer.removeChild(messageContainer.firstChild)
            }

            objects.map(item => {
                dataList.push(item.attributes.data)
            })

            dataList.forEach((value) => {
                let li = document.createElement('li')
                li.innerText = value
                messageContainer.appendChild(li)
            })
        }
        ,
        function (error) {
            console.log('遇到异常', error)
        });
}

