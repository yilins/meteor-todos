/**
 * Created by Administrator on 2016/8/31.
 */
Template.timer.onCreated(function() {
    Session.set("timerId","");
    Session.set('taskTimer', false);
});
Template.timer.helpers({
    playTime:function () {
        return Session.get('taskTimer');
    }
    // time:function () {
    //     var a=Session.get('timer');
    //     return a.time.seconds;
    //     // .time.hours;
    // }
});

Template.timer.events({
    "click #playTime":function (e) {
        e.preventDefault();
        var t=(new Date()).getTime()/1000;
        tt = setInterval(function() {
            var tb=new Date().getTime()/1000;
            var nTime=tb-t;
            var hour=Math.floor(nTime%86400/3600), minute=Math.floor(nTime%86400%3600/60),
                second=Math.floor(nTime%86400%3600%60);
            $("#time").val(hour+":"+minute+":"+second);
        }, 1000);
        Session.set('taskTimer',true);
    },
    "click #pauseTime":function (e) {
        Session.set('taskTimer',false);
        clearTimeout(tt);
        var time= $('[name=time]').val();
        var a=time.split(":");
        var timer = {
            _id:this._id,
            auxiliary:{timer:{hours:parseInt(a[0]) ,minutes:parseInt(a[1]),seconds:parseInt(a[2])}}
        };
        Meteor.call("todosUpdate",timer,function (error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }
        });
    }
});