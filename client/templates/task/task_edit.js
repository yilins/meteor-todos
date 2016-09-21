/**
 * Created by Administrator on 2016/9/7.
 */
Template.taskEdit.onRendered(function(){
    $('.taskEdit').validate();
});
Template.taskEdit.helpers({
    taskEditA: function() {
        return this.auxiliary.counters||this.auxiliary.timer ? false : true;
    },
    taskEditB: function() {
        // var taskEdit=Tasks.findOne(this._id);
        return this.auxiliary.counters ? true : false;
    },
    counter:function () {
        return this.auxiliary.counters.counter;
    },
    unit:function () {
        return this.auxiliary.counters.unit;
    },
    objectTime:function () {
        return this.auxiliary.timer.objectTime;
    }
});
Template.taskEdit.events({
    'submit form': function(e) {
        e.preventDefault();
        var currentTaskId=this._id;
        var taskProperties = {
            task: $(e.target).find('#task').val()
        };
        var counter=parseInt($('#counter').val()),
            unit=$('#unit').val(),
            objectTime=$('#objectTime').val();
        if(objectTime){
            $.extend(taskProperties,{ auxiliary:{timer:{time:0,objectTime:objectTime}}});
        }else if(counter){
            if(unit) {
                $.extend(taskProperties,{auxiliary:{counters:{counter:counter,unit:unit,counterNumber:0}}})
            }else{
                $.extend(taskProperties,{auxiliary:{counters:{counter:counter,unit:"",counterNumber:0}}})
            }
        }
        Tasks.update(currentTaskId, {$set: taskProperties}, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                console.log("ok");
                Router.go('tasksList');
            }
        })
        
    }
});