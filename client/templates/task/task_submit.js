/**
 * Created by Administrator on 2016/8/28.
 */
Template.taskSubmit.onCreated(function() {
    Session.set('taskSubmit', {a:true,b:""});
});
Template.taskSubmit.onRendered(function(){
    $('.taskSubmit').validate();
});

Template.taskSubmit.helpers({
    auxiliarys:function () {
        var AsArray = [
            { name: "默认", val: 0 },
            { name: "计数器", val: 1 },
            { name: "计时器", val: 2 }
        ];
        return AsArray;
    },
    taskSubmitA: function() {
        var taskSubmit=Session.get('taskSubmit');
        return taskSubmit.a;
    },
    taskSubmitB: function() {
        var taskSubmit=Session.get('taskSubmit');
        return taskSubmit.b;
    }
});
Template.taskSubmit.events({
    'change #auxiliary':function(e){
        e.preventDefault();
        var auxiliary=$('#auxiliary').val();
        if( auxiliary==='0'){
            Session.set('taskSubmit', {a:true})
        }else{
            auxiliary==='1' ?  Session.set('taskSubmit', {a:false,b:true}) : Session.set('taskSubmit',{a:false,b:false});
        }
        
    },
    'submit form': function(e) {
        e.preventDefault();
        var task = {
            task: $(e.target).find('#task').val()
        };
        var counter=$('#counter').val(),
            unit=$('#unit').val(),
            objectTime=$('#objectTime').val();

        if((Session.get('taskSubmit')).a){
            $.extend(task,{auxiliary:{note:""}});
        }else if(!(Session.get('taskSubmit')).b){
            $.extend(task,{ auxiliary:{timer:{time:0,objectTime:objectTime}}});
        }
        else{
            if(unit&&counter) {
             $.extend(task,{auxiliary:{counters:{counter:counter,unit:unit,counterNumber:0}}})
            }else if(counter&&!unit){
            $.extend(task,{auxiliary:{counters:{counter:counter,unit:"",counterNumber:0}}})
            }else if(!counter&&unit){
            $.extend(task,{auxiliary:{counters:{counter:1,unit:unit,counterNumber:0}}})
            }else {
            $.extend(task,{auxiliary:{counters:{counter:1,unit:"",counterNumber:0}}})
            }
        }
        Meteor.call('taskInsert', task, function(error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }else {
                Router.go('tasksList')
            }
        })
    }
});