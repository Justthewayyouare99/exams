/**
 * Created by Administrator on 2016/9/28 0022.
 * 试卷模块
 * ng:核心模块
 */
angular.module("app.paper",["ng","app.subject"])

    //试卷查询控制器
    .controller("paperListController",["$scope",function ($scope) {

    }])
    //试卷添加控制器
    .controller("paperAddController",["$scope","commonService","$routeParams","paperModel","paperService",
        function ($scope,commonService,$routeParams,paperModel,paperService) {
        console.log("$routeParams值为：",$routeParams);//$routeParams值为：
            // （一个对象） Object { id="0",  stem="0",  type="0",  更多...}
            alert($routeParams.id);
        commonService.getAllDepartments(function (data) {
            $scope.dps =data;
        });
        // paper.department.id
        // paper.title
        // paper.description
        // paper.totalPoints
        // paper.answerQuestionTime
        //
        // scores 		[2,4,5,2]
        // subjectIds 	[1,2,3,4]
        //双向绑定的模板
        $scope.pmodel = paperModel.model;

            var subjectId =$routeParams.id;
            if(subjectId!=0){
                //将要添加的题目添加到数组中
                paperModel.addSubjectId(subjectId);
                paperModel.addSubject(angular.copy($routeParams));
            };

            $scope.submit =function () {
                paperService.savePaperSubject($scope.pmodel ,function (data) {
                        alert(data);

                })
            }




    }])
    //试卷删除控制器
    .controller("paperDelController",["$scope",function ($scope) {

    }])
    .factory("paperService",function ($httpParamSerializer,$http) {


           return {
               savePaperSubject:function (param,handler) {
                   var obj={};

                   // departmentId:1,
                   //     title:"",
                   //     desc:"",
                   //     total:100,
                   //     aqt:0,
                   //     scores:[],
                   //     subjectIds:[],
                   //     subjects:[]

                   for(var key in param){
                       var val= param[key];
                       switch (key){
                           case "departmentId":
                               obj['paper.department.id']=val;
                               break;
                           case "title":
                               obj['paper.title']=val;
                               break;
                           case "desc":
                               obj['paper.description']=val;
                               break;
                           case "total":
                               obj['paper.totalPoints']=val;
                               break;
                           case "aqt":
                               obj['paper.answerQuestionTime']=val;
                               break;
                           case "scores":
                               obj['scores']=val;
                               break;
                           case "subjectIds":
                               obj['subjectIds']=val;
                               break;




                       }
                   }

                        var obj =$httpParamSerializer(obj);
                       $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",obj,{
                           headers:{
                              "content-type":"application/x-www-form-urlencoded"

                           }
                       }).success(function (data) {
                           handler(data);
                       })



               }
           }
    })
    //服务有两个特点（单例和延迟）所以可以使保留原有对象，而不发生重置
    .factory("paperModel",function () {
        return{
            model:{
                departmentId:1,
                title:"",
                desc:"",
                total:100,
                aqt:0,
                scores:[],
                subjectIds:[],
                subjects:[]

            },
            addSubjectId:function (id) {
                this.model.subjectIds.push(id);
            },
            addSubject:function (subject) {
                this.model.subjects.push(subject);
            }
        }
    });
