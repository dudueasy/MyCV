// 用于控制 leancloud 的脚本
//// 立即执行!
!function () {
    let view = View('section.message')

    let model = {
        init: function () {
            // 初始化 leanCloud AV 对象
            let APP_ID = 'u6evWlV1eKl06LPxfhhnrcbL-gzGzoHsz';
            let APP_KEY = 'ryrfwoInyc4xw6Vuolkwoc7u';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: (dataTableName) => {
          let query = new AV.Query(dataTableName).descending("createdAt").limit(10);  
          let results = query.find()
          console.log('result: ', results)
          return  results
        },
        save: (dataTableName, commentData, username) => {
            let queryObj = AV.Object.extend(dataTableName)
            let obj = new queryObj()

            return obj.save({
                data: commentData,
                user: username
            })
        }
    }
    let controller = {
        view: null,
        model: null,
        messageContainer: null,
        dataTableName: null,
        commentData: '',
        username: '',
        form: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.model.init()
            this.messageContainer = document.querySelector('#message-list > ul')
            this.dataTableName = 'usercomment'
            this.form = view.querySelector('#user-comments-form')
            this.loadMessages(this.dataTableName, this.messageContainer)
            this.bindEvents(this.form, this.submitHandler)
        },

        loadMessages: function (dataTableName, messageContainer) {

            model.fetch(dataTableName).then((objects) => {
                    let dataList = []

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
        },
        submitHandler: function (e) {
            this.commentData = this.form.querySelector('#comment-data').value
            this.username = this.form.querySelector('#comment-user-name').value

            model.save(this.dataTableName, this.commentData, this.username)
                .then((response) => {
                        console.log('提交成功');

                        // 更新页面评论数据
                        let li = document.createElement('li')
                        li.innerText = `${response.attributes.user} : ${response.attributes.data}`
                        this.messageContainer.prepend(li)
                        this.messageContainer.lastChild.remove()
                        this.form.querySelector('#comment-data').value = ''
                    }
                    ,
                    () => {
                        console.log('提交失败')
                    })
        },
        bindEvents: function () {

            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.submitHandler(e)
            })
        }
    }

    controller.init(view, model)
}()
