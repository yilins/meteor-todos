/**
 * Created by Administrator on 2016/8/27.
 */
Template.taskItem.onRendered(function() {
    this.$(".my-checkbox").bootstrapSwitch();
});
Template.taskItem.helpers({
    'checked':function(){
        if(this.join){
            return "checked";
        }else{
            return "";
        }
    },
    taskDay:function () {
        return this.day;
    }
});
Template.taskItem.events({
    'switch-change':function (e) {
        e.preventDefault();
        var task={
            taskId : this._id,
            day:this.day,
            join : this.join
        };
        if(task.join){
            Tasks.update({_id: task.taskId},{$set:{join: false}});
        }else{
            Tasks.update({_id: task.taskId},{$set: {join: true}});
        }
        Meteor.call('todosjoin', task, function(error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }
        })
    }
});



