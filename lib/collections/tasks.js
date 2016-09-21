/**
 * Created by Administrator on 2016/8/27.
 */
Tasks = new Mongo.Collection('tasks');
Tasks.allow({
    update: function(userId, task) { return ownsDocument(userId, task); },
    remove: function(userId, task) { return ownsDocument(userId, task); }
});
Meteor.methods({
    taskInsert: function(taskAttributes) {
        check(this.userId, String);
        check(taskAttributes,{
            task:String,
            auxiliary:{
                note:Match.Maybe(String),
                counters:Match.Maybe(Object),
                timer:Match.Maybe(Object)
            }
        });
        var user = Meteor.user();
        var task=_.extend(taskAttributes,{
            userId: user._id,
            createdAt: new Date(),
            join: false,
            day:0
        });
        if(task.auxiliary.timer){
            task=_.extend(task,{
                time:0
            })
        }
        Tasks.insert(task);
    }
});