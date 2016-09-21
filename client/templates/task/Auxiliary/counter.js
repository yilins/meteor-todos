/**
 * Created by Administrator on 2016/8/30.
 */
Template.counter.helpers({
    unit:function () {
        return  this.auxiliary.counters.unit;
    },
    counterNumber:function () {
        return  this.auxiliary.counters.counterNumber;
    }
});
Template.counter.events({
    'keyup [name=counterNumber]': function(e){
        e.preventDefault();
        var todoItem = parseInt($(event.target).val());
        if(!todoItem){
            todoItem="";
        }
        var counters = {
            _id:this._id,
            auxiliary:{counters:{counterNumber:todoItem}}
        };
        Meteor.call("todosUpdate",counters,function (error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }
        });
    },
    'click #add':function (e) {
        e.preventDefault();
        var counter =this.auxiliary.counters.counter;
        var superposition=this.auxiliary.counters.counterNumber+counter;
        var counters = {
            _id:this._id,
            auxiliary:{counters:{counterNumber:superposition}}
        };
        Meteor.call("todosUpdate",counters,function (error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }
        });
    },
    'click #minus':function (e) {
        e.preventDefault();
        var counter =this.auxiliary.counters.counter;
        var superposition=this.auxiliary.counters.counterNumber-counter;
        var counters = {
            _id:this._id,
            auxiliary:{counters:{counterNumber:superposition}}
        };
        Meteor.call("todosUpdate",counters,function (error) {
            if (error){
                throw new Meteor.Error(error.reason);
            }
        });
    }
});