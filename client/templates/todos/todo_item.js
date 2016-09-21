/**
 * Created by Administrator on 2016/8/31.
 */
Template.todoItem.helpers({
    todoName:function () {
        return this.task;
    },
    toolOptions:function () {
        return this.auxiliary.counters||this.auxiliary.timer ?  true:false;
    },
    tool:function () {
        return this.auxiliary.counters ?  true:false;
    },
    'checked':function(){
        var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        }else{
            return "";
        }
    }
});
Template.todoItem.events({
    'change [type="checkbox"]':function (e) {
        e.preventDefault();
        var todoId = this._id;
        var isCompleted = this.completed;
        if(isCompleted){
            Todos.update({_id: todoId},{$set:{completed: false}});
            console.log("todo marked as complete：false.");
        }else{
            Todos.update({_id: todoId},{$set: {completed: true}});
            console.log("todo marked as complete:true.");
        }
    }
});