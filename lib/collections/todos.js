/**
 * Created by Administrator on 2016/9/5.
 */
Todos = new Mongo.Collection('todos');
Todos.allow({
    update: function(userId, todo) { return ownsDocument(userId, todo); },
    remove: function(userId, todo) { return ownsDocument(userId, todo); }
});
Meteor.methods({
    todosInsert:function (todosAttributes) {
        check(this.userId, String);
        check(todosAttributes,{
            taskId:String
        });
        var user = Meteor.user();
        var task=Tasks.findOne(todosAttributes.taskId);
        if (!task) {throw new Meteor.Error('invalid-todos', '无效的任务！')}
        var todos=_.extend(todosAttributes,{
            task:task.task,
            userId: user._id,
            createdAt: new Date(),
            join:true,
            completed: false,
            day:task.day,
            auxiliary:task.auxiliary
        });
        var b =Todos.insert(todos);
        console.log(b);
    },
    todosUpdate:function (todosAttributes) {
        check(this.userId, String);
        check(todosAttributes,{
            _id:String,
            auxiliary:{
            note:Match.Maybe(String),
            counters:Match.Maybe(Object),
            timer:Match.Maybe(Object)
            }
        });
        var todos=Todos.findOne(todosAttributes._id);
        console.log(todos);
        var task=Tasks.findOne({_id:todos.taskId});
        if (!task) {throw new Meteor.Error('invalid-timer', '无效的任务！')}

        var auxiliary=todos.auxiliary;

        if(auxiliary.note){
            auxiliary.note=todosAttributes.auxiliary.note
        }else if(todos.auxiliary.counters){
            auxiliary.counters.counterNumber=todosAttributes.auxiliary.counters.counterNumber
        }else{
            var addTime=todosAttributes.auxiliary.timer;
            if(addTime.seconds+auxiliary.timer.seconds>=60){
                addTime.minutes+=parseInt((addTime.seconds+auxiliary.timer.seconds)/60);
                auxiliary.timer.seconds=(addTime.seconds+auxiliary.timer.seconds)%60;
            }else {
                auxiliary.timer.seconds+=addTime.seconds;
            }

            if(addTime.minutes+auxiliary.timer.minutes>=60){
                addTime.hours+=parseInt((addTime.minutes+auxiliary.timer.minutes)/60);
                auxiliary.timer.minutes=(addTime.minutes+auxiliary.timer.minutes)%60;
            }else{
                auxiliary.timer.minutes += addTime.minutes;
            }
            auxiliary.timer.hours+=addTime.hours;
            auxiliary.timer.time=auxiliary.timer.hours;
            Tasks.update({_id:todos.taskId},{$inc:{"time": auxiliary.timer.hours}});
        }
        Todos.update({_id:todos._id},{$set:{auxiliary:auxiliary}});
        console.log("Update!!");
    },

    todosjoin:function (todosAttributes) {
        check(this.userId, String);
        check(todosAttributes,{
            taskId:String,
            join:Boolean,
            day:Number
        });
        var todos=Todos.findOne({taskId:todosAttributes.taskId,day:todosAttributes.day});
        Todos.update({_id:todos._id},{$set:{join:!todosAttributes.join}});
    }
});
