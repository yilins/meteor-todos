/**
 * Created by Administrator on 2016/8/27.
 */
Meteor.publish('tasks', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Tasks.find({userId: this.userId}, options);
});
Meteor.publish('todos', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Todos.find({createdAt: {$gte:new Date((new Date()).toDateString())},join:true,userId: this.userId}, options);
});
Meteor.publish('joinTasks', function() {
    return Tasks.find({userId: this.userId,join:true});
});
Meteor.publish('tasksTodo', function() {
    return Todos.find({createdAt: {$gte:new Date((new Date()).toDateString())},userId: this.userId});
});
Meteor.publish('singleTask', function(id) {
    check(id, String);
    return Tasks.find(id);
});
Meteor.publish('completeTasks', function(id) {
    check(id, String);
    // var week=weekDate();,createdAt:{$gte: week[0], $lt:week[1]}
    return Todos.find({taskId:id}, {sort: {createdAt:1}});
});