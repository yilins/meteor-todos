/**
 * Created by Administrator on 2016/8/27.
 */
Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'loading',
    notFoundTemplate:'notFound'
});

ListController = RouteController.extend({
    increment: 5,
    Limit: function() {
        return parseInt(this.params.Limit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.Limit()};
    }
});

TasksListController = ListController.extend({
    template: 'tasksList',
    subscriptions: function() {
        Meteor.subscribe('tasksTodo');
        this.tasksSub =Meteor.subscribe('tasks', this.findOptions());
    },
    tasks: function() {
        return Tasks.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.tasks().count() === this.Limit();
        return {
            tasks: this.tasks(),
            tasksCount:this.tasks().count(),
            ready: this.tasksSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    },
    sort: { join:-1,createdAt:-1,_id: -1},
    nextPath: function() {
        return Router.routes.tasksList.path({Limit: this.Limit() + this.increment})
    }
});

TodoListController = ListController.extend({
    template: 'todoList',
    subscriptions: function() {
         Meteor.subscribe('joinTasks');
        this.todosSub =Meteor.subscribe('todos', this.findOptions());
    },
    todos: function() {
        return Todos.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.todos().count() === this.Limit();
        return {
            todos: this.todos(),
            ready: this.todosSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    },
    sort: {completed:1,createdAt:-1,_id: -1},
    nextPath: function() {
        return Router.routes.todoList.path({Limit: this.Limit() + this.increment})
    }
});

Router.route('/',{name:'home'});
Router.route('/login',{name:'login'});
Router.route('/tasksList/:Limit?',{name:'tasksList'});
Router.route('/taskSubmit',{name:'taskSubmit'});
Router.route('/tasks/:_id/edit',{
    name:'taskEdit',
    waitOn: function() {
        return Meteor.subscribe('singleTask', this.params._id);
    },
    data: function() { return Tasks.findOne(this.params._id); }
});
Router.route('/todoList/:Limit?',{name:'todoList'});
Router.route('/tasks/:_id/chart',{
    name:'taskChart',
    waitOn: function() {
        return Meteor.subscribe('completeTasks', this.params._id);
    },
    data: function() { return Todos.find({taskId:this.params._id} ,{sort: {createdAt: 1}}); }
});
var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin,{only: ['taskSubmit','tasksList','taskEdit']});