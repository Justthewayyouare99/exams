/**
 * Created by zdh on 2016/9/22 0022.
 * 题目管理模块
 */

angular.module("app.subject",["ng","ngRoute"])
    .controller("subjectCheckController",["$routeParams","subjectService","$location",
        function ($routeParams,subjectService,$location) {
            //审核题目
            var id =$routeParams.id;
            var checkState =$routeParams.state;
            subjectService.checkSubjects(id,checkState,function (data) {
                alert(data);
                $location.path("/AllSubject/a/0/b/0/c/0/d/0");
            })

    }])
    .controller("subjectDelController",["$routeParams","subjectService","$location",
        function ($routeParams,subjectService,$location) {
            //alert(0);


            //删除题目
            var flag =confirm("确认删除吗？");
            if(flag){
                var id =$routeParams.id;
                subjectService.delSubjects(id,function (data) {
                       alert(data);
                    //页面发生跳转
                    $location.path("/AllSubject/a/0/b/0/c/0/d/0");
                })
            }
            else {
            //页面发生跳转
                $location.path("/AllSubject/a/0/b/0/c/0/d/0");
            }

    }])
    //controller("",[]):后面跟上[]是为了后期代码压缩,使得代码更不会乱。
    //注入路由参数，为了给后台传递及获取相应参数
    .controller("subjectController",["$scope","commonService","subjectService","$routeParams","$location",
        function ($scope,commonService,subjectService,$routeParams,$location) {

        //将路由参数绑定到作用域中
        $scope.params =$routeParams;
         console.log($routeParams);//后台打印参数，传给前台
        //添加页面绑定的对象
        $scope.subject ={
            typeId:3,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"", //题干
            answer:"", //简答题答案
            fx:"",  //分析
            choiceContent:[],  //选项内容
            choiceCorrect:["false","false","false","false"]  //选项是否勾选

        };
        $scope.submit=function () {
            subjectService.saveSubjects($scope.subject,function (data) {
                alert(data);
            });
            //重置作用域中绑定的表单默认值
            var subject ={
                typeId:3,
                levelId:1,
                departmentId:1,
                topicId:1,
                stem:"", //题干
                answer:"", //简答题答案
                fx:"",  //分析
                choiceContent:[],  //选项内容
                choiceCorrect:["false","false","false","false"] //选项是否勾选,默认未选

            };
            //重置表单样式
            angular.copy(subject,$scope.subject);

        };
            $scope.submitAndClose=function () {
                //保存数据
                subjectService.saveSubjects($scope.subject,function (data) {
                    alert(data);
                });
                $location.path("/AllSubject/a/0/b/0/c/0/d/0");
            };



        //获取所有题目类型,题目难度级别，题目所属部门，题目所属知识点
        commonService.getAllTypes(function (data) {
            $scope.types =data;

        });
        commonService.getAllDepartments(function (data) {
            $scope.departments =data;

        });
        commonService.getAllLevels(function (data) {
            $scope.levels =data;

        });
        commonService.getAllTopics(function (data) {
            $scope.topics =data;

        });


        //获取所有题目信息------------、、、、、
        subjectService.getAllSubjects($routeParams, function (data) {
            data.forEach(function (subject) {
                if(subject.subjectType){
                    //为每个选项添加序号A,B,C,D
                    subject.choices.forEach(function (choice,index) {
                        choice.no =commonService.convertIndexToNo(index);
                    })
                    //获取正确答案：，并修改answer属性
                    var answer =[];
                    if(subject.subjectType.id !=3){
                        subject.choices.forEach(function (choice) {
                            if(choice.correct ){
                                answer.push(choice.no);
                            }
                        })
                        subject.answer =answer.toString();
                        //subject.answer =answer.join(",");//与上面一行一样的功能

                    }
                }

            })

            $scope.subjects =data;
        });


    }])


    //获取所有题目信息,构造函数形式
    .service("subjectService",["$http","$httpParamSerializer",function ($http,$httpParamSerializer) {
        //审核题目
        this.checkSubjects =function (id,state,handler) {
            $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
                params:{
                    'subject.id':id,
                    'subject.checkState':state
                }

            }).success(function (data) {
                handler(data);
            })
        }



          //删除题目
        this.delSubjects =function (id,handler) {
            $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                params:{
                    'subject.id':id
                }
            }).success(function (data) {
                handler(data);
            })
        }

        this.saveSubjects =function (params,handler) {

            // 后台提供的参数params，给到obj作为属性，把原有绑定的值赋给obj的属性值，
            // 从而实现自己定义的值到后台所需要的属性及值的转换，后台提供的参数params如下：
            //     subject.department.id
            // subject.topic.id
            // subject.subjectType.id
            // subject.subjectLevel.id
            // subject.stem
            // subject.answer
            // subject.analysis

                //处理数据
            var obj ={};
            for(var key in params){
                var val=params[key];
                switch (key){
                    case "typeId":
                        obj['subject.subjectType.id']=val;
                        break;
                    case "levelId":
                        obj['subject.subjectLevel.id']=val;
                        break;
                    case "departmentId":
                        obj['subject.department.id']=val;
                        break;
                    case "topicId":
                        obj['subject.topic.id']=val;
                        break;
                    case "stem":
                        obj['subject.stem']=val;
                        break;
                    case "answer":
                        obj['subject.answer']=val;
                        break;
                    case "fx":
                        obj['subject.analysis']=val;
                        break;
                    case "choiceContent":
                        obj['choiceContent']=val;
                        break;
                    case "choiceCorrect":
                        obj['choiceCorrect']=val;
                        break;

                }
            }
            //！！注意！！用post方式提交时，必须用下面写的的请求头形式，
            // 还必须对obj进行表单形式的序列化（转化为字符串形式，而默认的是json格式）
            obj =$httpParamSerializer(obj);
            $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                }
            })
                .success(function (data) {
                handler(data);
            })
        }
        this.getAllSubjects =function (params, handler) {
            var data={};
            //循环遍历将data转换为后台能够识别的筛选对象
            for (var key in params){
                var val =params[key];
                //只有当val不等于0的时候，才设置筛选属性
                if(val!=0){
                    switch (key){
                        case "a":
                            data["subject.subjectType.id"]=val;
                            break;
                        case "b":
                            data["subject.subjectLevel.id"]=val;
                            break;
                        case "c":
                            data["subject.department.id"]=val;
                            break;
                        case "d":
                            data["subject.topic.id"]=val;
                            break;
                    }
                }
            }
            console.log(data);

            //$http.get("data/subjects.json").success(function (data) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                    params:data
                }).success(function (data) {

                handler(data);
            })
        };
    }])
    //放工厂函数形式
    .factory("commonService",["$http",function ($http) {
        return{
            //通过index(0,1,2,3)转换为(A,B,C,D)
            convertIndexToNo :function(index) {
            return index==0?"A":(index==1?"B":(index==2?"C":(index==3?"D":"E")))
        },

            getAllTypes:function (handler) {
                //$http.get("data/types.json").success(function (data) {
                    $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action").success(function (data) {
                    handler(data);
                })
            },getAllDepartments:function (handler) {
                //$http.get("data/departments.json").success(function (data) {
                    $http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action").success(function (data) {
                    handler(data);
                })
            },getAllLevels:function (handler) {
                //$http.get("data/levels.json").success(function (data) {
                    $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action").success(function (data) {
                    handler(data);
                })
            },getAllTopics:function (handler) {
                //$http.get("data/topics.json").success(function (data) {
                    $http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action").success(function (data) {
                    handler(data);
                })
            }


        }
    }]).filter("selectTopics",function () {
        //input:要过滤的内容，id：（过滤器冒号后面的东西）方向id
            return function (input,id) {
                console.log(input,id);
                //数组过滤
                if(input){
                    var result =input.filter(function (item) {
                        return item.department.id ==id;
                    })
                    //将过滤后的内容返回
                    return result;
                }

            }
    }).directive("selectOption",function () {
            return{
                restrict:"A",
                link:function (scope,element) {
                    //console.log(element);
                    element.on("change",function () {
                        var type =$(this).attr("type");
                        var val =$(this).val();
                        var isChecked=$(this).prop("checked");

                        //设置值
                        if(type=="radio"){
                            //重置
                            scope.subject.choiceCorrect=[false,false,false,false];
                            //alert(type+"--"+val);
                            for(var i=0;i<4;i++){
                                if(i==val){
                                    scope.subject.choiceCorrect[i]=true;
                                }
                            }

                        }else if(type=="checkbox"){
                            //不需要重置
                            for(var i=0; i<4;i++){
                                if(i==val){
                                    scope.subject.choiceCorrect[i]=true;
                                }
                            }
                        }
                        //强制消化，让其作用域改变，并绑上值
                        scope.$digest();


                    })
                }

                // compile:function () {
                //
                //     return function link() {
                //
                //     }
                // },
                // controller:function () {
                //
                // }
            }
})

// .provider("SubjectService",function () {
//     this.url ="";
//     this.setUrl =function (url) {
//         this.url =url;
//     };
//     this.$get =function ($http) {
//         var self =this;
//         return {
//             getAllSubjects :function (handler) {
//                 $http.get(self.url).success(function (data) {
//                     //console.log(self.url);
//                    // console.log(data);
//                     handler(data);
//                 })
//
//                 // $http.jsonp(self.url+"?callback=JSON_CALLBACK").success(function (result) {
//                 //     console.log("success",result);
//                 //     //handler(result);
//                 // })
//             }
//         }
//     }
// })









