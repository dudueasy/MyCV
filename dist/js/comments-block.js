// 用于控制 leancloud 的脚本
//// 立即执行!
!function () {
    var view = View('section.message');

    var model = {
        init: function init() {
            // 初始化 leanCloud AV 对象
            var APP_ID = 'u6evWlV1eKl06LPxfhhnrcbL-gzGzoHsz';
            var APP_KEY = 'ryrfwoInyc4xw6Vuolkwoc7u';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function fetch(dataTableName) {
            var query = new AV.Query(dataTableName).descending("createdAt").limit(10);
            var results = query.find();
            console.log('result: ', results);
            return results;
        },
        save: function save(dataTableName, commentData, username) {
            var queryObj = AV.Object.extend(dataTableName);
            var obj = new queryObj();

            return obj.save({
                data: commentData,
                user: username
            });
        }
    };
    var controller = {
        view: null,
        model: null,
        messageContainer: null,
        dataTableName: null,
        commentData: '',
        username: '',
        form: null,
        init: function init(view, model) {
            this.view = view;
            this.model = model;
            this.model.init();
            this.messageContainer = document.querySelector('#message-list > ul');
            this.dataTableName = 'usercomment';
            this.form = view.querySelector('#user-comments-form');
            this.loadMessages(this.dataTableName, this.messageContainer);
            this.bindEvents(this.form, this.submitHandler);
        },

        loadMessages: function loadMessages(dataTableName, messageContainer) {

            model.fetch(dataTableName).then(function (objects) {
                var dataList = [];

                objects.map(function (item) {
                    dataList.push(item.attributes);
                });

                dataList.forEach(function (value) {
                    var li = document.createElement('li');
                    li.innerText = value.user + ' : ' + value.data;
                    messageContainer.appendChild(li);
                });
            }, function (error) {
                console.log('遇到异常', error);
            });
        },
        submitHandler: function submitHandler(e) {
            var _this = this;

            this.commentData = this.form.querySelector('#comment-data').value;
            this.username = this.form.querySelector('#comment-user-name').value;

            model.save(this.dataTableName, this.commentData, this.username).then(function (response) {
                console.log('提交成功');

                // 更新页面评论数据
                var li = document.createElement('li');
                li.innerText = response.attributes.user + ' : ' + response.attributes.data;
                _this.messageContainer.prepend(li);
                _this.messageContainer.lastChild.remove();
                _this.form.querySelector('#comment-data').value = '';
            }, function () {
                console.log('提交失败');
            });
        },
        bindEvents: function bindEvents() {
            var _this2 = this;

            this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                _this2.submitHandler(e);
            });
        }
    };

    controller.init(view, model);
}();