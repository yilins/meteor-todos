/**
 * Created by Administrator on 2016/8/18.
 */
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

dailyData =function () {
    if (Tasks.find({join:true}).count() !== 0){
        Tasks.find({join:true}).forEach(function (e) {
            if(e.updateTime!==(new Date()).toDateString()){
                var task={taskId:e._id};
                Tasks.update({_id:e._id},{$set :{updateTime:(new Date()).toDateString()}});
                Tasks.update({_id:e._id},{$inc :{day:1}});
                Meteor.call("todosInsert",task,function (error) {
                    if (error){
                        throw new Meteor.Error(error.reason);
                    }
                });
            }
        });
    }
};


weekDate=function () {
    var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayLong = 24*60*60*1000 ;
    var weeks=new Array(0);
    // var MondayTime = nowTime - (day-1)*oneDayLong  ;
    var SundayTime =  nowTime - day*oneDayLong ;
    for(var i=0;i<7;i++){
        weeks.push(new Date(new Date(SundayTime+i*oneDayLong).toDateString()));
    }
    // var SundayTime =  nowTime + (7-day)*oneDayLong ;

    // var tuesdayTime=nowTime+oneDayLong;
    //
    // var monday = new Date((new Date(MondayTime)).toDateString());
    // var sunday = new Date((new Date(SundayTime)).toDateString());
   
    return weeks
};


numberOfElements=function (array) {
    var counta = 0;
    var countb = 0;
    var countc = 0;
    for(var i=0;i<array.length;i++){
        if(array[i]===0){
            counta++
        }else if(array[i]===1) {
            countb++
        }else {
            countc++
        }
    }
    return [counta,countb,countc]
};
// numberOfElements=function (array) {
//     var temp = "";
//     var count = 0;
//     var arrNew = new Array(0);
//     for(var i=0;i<array.length;i++){
//
//         if(array[i]!=-1){
//
//             temp=array[i];
//
//             for(var j=0;j=array.length;j++){//再次循环数组，用第一次循环得到的temp与数组的每一个元素比较
//
//                 if(temp==array[j]){
//
//                     count++;//如果两个元素相同，count就自加一次
//
//                     array[j] = -1;//这个时候临时改变这次循环时元素变量的值，以便不参与下次循环
//
//                 }
//
//             }
//
//             arrNew.push(count);//把这次循环的元素以及出现的次数保存到新的数组中
//
//             count = 0;//让count的值重新等于0
//
//         }
//
//     }
//     return arrNew
// };