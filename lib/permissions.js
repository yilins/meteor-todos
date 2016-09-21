/**
 * Created by Administrator on 2016/8/19.
 */
// 检查ID指定用户拥有的文件
ownsDocument = function(userId, doc) {
    console.log(userId);
    return doc && doc.userId === userId;
};


// if(e.updateTime!==(new Date()).toDateString()){
//     Tasks.update({_id:e._id},{$set :{updateTime:(new Date()).toDateString()}});
//     Tasks.update({_id:e._id},{$set :{completed:false}});
//     if(e.counters){
//         Tasks.update({_id:e._id},{$set :{'counters.counterNumber':0}});
//     }else if(e.timer){
//         Tasks.update({_id:e._id},{$inc :{"timer.day": 1}});
//         Timer.insert({taskId:e._id, day:e.timer.day+1, time:{hours:0 ,minutes:0,seconds:0},
//             createdAt: new Date()})
//     }
// }