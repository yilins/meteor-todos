/**
 * Created by Administrator on 2016/9/8.
 */

Template.taskChart.onCreated(function () {
    if($(window).width()<480){
        Session.set('canvasWidth',200);
    }else {
        Session.set('canvasWidth',400);
    }
});
Template.taskChart.onRendered(function () {
    var ctx = $("#lineChart").get(0).getContext("2d");
    var ctt=$("#pieChart").get(0).getContext("2d");
    var weeks=weekDate();
    console.log(weeks);
    var todoNow=(Todos.findOne({createdAt: {$gte:new Date((new Date()).toDateString())}}));
    var todoData=new Array(0);
    for(var i=0;i<7;i++){
        if(Todos.findOne({createdAt: {$gte:weeks[i],$lt:weeks[i+1]}})){
            if(todoNow.auxiliary.timer){
                todoData.push(Todos.findOne({createdAt: {$gte:weeks[i],$lt:weeks[i+1]}}).auxiliary.timer.time)
            }else if(todoNow.auxiliary.counters){
                todoData.push(Todos.findOne({createdAt: {$gte:weeks[i],$lt:weeks[i+1]}}).auxiliary.counters.counterNumber)
            }else {
                 todoData.push(0);
            }
        }else{
            todoData.push(0)
        }
    }
    var completedData=new Array(0);
    for(i=0;i<7;i++){
        if(Todos.findOne({createdAt: {$gte:weeks[i],$lt:weeks[i+1]}})){
            if(Todos.findOne({createdAt: {$gte:weeks[i],$lt:weeks[i+1]}}).completed){
                completedData.push(1)
            }else {
                completedData.push(2)
            }
        }else{
            completedData.push(0)
        }
    }
    var completedNumberData=numberOfElements(completedData);
    var lineData = {

        labels: ["Monday", "Tuesday ", "Wednesday ", "Thursday", "Friday", "Saturday","Sunday"],

        datasets: [

            {fillColor: "rgba(220,220,220,0.2)",

            strokeColor: "rgba(0,102,51,1)",

            pointColor: "rgba(220,220,220,1)",

            pointStrokeColor: "#339933",

            pointHighlightFill: "#339933",

            pointHighlightStroke: "rgba(220,220,220,1)",

            data: todoData}
        ]
    };
    var pieData=[
    {
        value: completedNumberData[0],
            color:"#E0E4CC"
    },
    {
        value : completedNumberData[1],
            color : "#69D2E7"
    },
    {
        value : completedNumberData[2],
            color : "#ff0000"
    }];

    var lineNewChart = new Chart(ctx).Line(lineData,{

            scaleOverlay : true,

            bezierCurveTension: 0,

        // 是否使用贝塞尔曲线? 即:线条是否弯曲
            bezierCurve: false,

            //自定义背景小方格、y轴每个格子的单位、起始坐标

            scaleOverride: true,

            scaleSteps: 10,


            scaleStepWidth: 1,

            scaleStartValue: 0
        });
    var pieNewChart =new Chart(ctt).Pie(pieData);
    });


Template.taskChart.helpers({
    canvasWith:function () {
        return  Session.get('canvasWidth');
    }
});