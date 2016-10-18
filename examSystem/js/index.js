/**
 * Created by zdh on 2016/9/22 0022.
 * 首页核心js文件
 */

// jquery:
// $(function () {
//    // 实现左侧导航动画效果
//     $(".baseUI>li>a").off("click");
//     $(".baseUI>li>a ").on("click",function () {
//             //console.log(this);
//         $(".baseUI>li>ul").slideUp();
//         $(this).next().slideDown(300);
//
//     });
//
//     //默认收起全部，展示第一个
//     $(".baseUI>li>ul").slideUp();
//     $(".baseUI>li>a").eq(0).trigger("click");
// });



$(function () {
    //解绑
    $(".baseUI>li>a").off("click");
    //给大标绑定事件，点击大标让其所属小标显示，同时让其他小标隐藏
    $(".baseUI>li>a").on("click",function () {
        //console.log(this);//this即a标签内容
        $(".baseUI>li>ul").slideUp();
            $(this).next().slideDown();
    });

    //默认让所有小标都隐藏
    $(".baseUI>li>ul").slideUp();
    //让第一个大标实现模拟点击，让其小标显示出
    $(".baseUI>li>a").eq(0).trigger("click");

    $(".baseUI>li>ul>li").off("click");
    $(".baseUI>li>ul>li").on("click",function () {
        if(!$(this).hasClass("current")){
            $(".baseUI>li>ul>li").removeClass("current");
            $(this).addClass("current");
        }

    });
    $(".baseUI>li>ul>li>a").eq(0).trigger("click");
})

//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    .controller("mainCtrl",["$scope",function ($scope) {

    }])

    .config(["$routeProvider",function ($routeProvider) {
        //更改路径，传递参数
        // a:类型id
        // b:难度id
        // c:方向id
        // d:知识点id
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"

        }).when("/SubjectAdd",{
            templateUrl:"tpl/subject/subjectAdd.html",
            controller:"subjectController"

        }).when("/SubjectDel/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectDelController"

        }).when("/SubjectCheck/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectCheckController"

        })
            .when("/PaperList",{
        templateUrl:"tpl/paper/paperManager.html",
            controller:"paperListController"

        }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"

        }).when("/PaperSubjectList",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"

        });
    }]);
