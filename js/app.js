"use strict";

var app = angular.module("lection", ["ngRoute", "ngResource"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/page/:id", {
        templateUrl : function(page){
        	return "assets/page-"+page.id+".html"
        },
        controller: "pagesController"
    })
    .otherwise("/page/0");
})
.controller("pagesController",function($scope,$log,$rootScope,$routeParams,$interval){
	$scope.page=parseInt($routeParams.id) || 0;
	$scope.maxPages=5;
	$scope.date=new Date();
	$scope.money=12503.85;
	$scope.jsn={"title":"Пример", "value":100500, "fn":{"fn.title":"test","fn.value":"string"}};
	$scope.msg="ЧмАфФкИ ФсЕм в ЭтОм ЧаТиКе";
	$scope.list=[
		{"id":1, "name":"Merven", "age":79},
		{"id":21, "name":"Aelita", "age":43}, 
		{"id":3, "name":"Avella", "age":35},
		{"id":2, "name":"Lucas", "age":22},
		{"id":8, "name":"Xenia", "age":25}];

	$scope.ballPos={'X':0,'Y':0};
	var tictac, tic=0;
		
	$scope.callToFooter=function(){
		$rootScope.$emit('helloFooter');
	};

	$scope.start=function(){
		
		tictac=$interval(function(){
			tic++;
			$scope.ballPos.X=50*Math.sin(tic/50);
			$scope.ballPos.Y=20*Math.cos(tic/20);
		},50);	
	};
	$scope.stop=function(){
		$interval.cancel(tictac);
	};
	
})
.controller("footerController", function($scope,$log,$rootScope,$timeout){
	$scope.footerMessage=false;

	$rootScope.$on('helloFooter',function(){
		$scope.footerMessage=true;
		$timeout(function(){
			$scope.footerMessage=false;
		},2000)
	});
})
.directive("paginator", function(){
	return {
		templateUrl:"assets/directives/paginator.html",
		replace: true,
		restrict: 'E',
		scope:{
			current:'='
		},
		controller: function($scope){
			$scope.nextPage=function(){
				var next= 1+parseInt($scope.current);
			return next;
			};
			$scope.prevPage=function(){
				var prev= ($scope.current>0 ) ? parseInt($scope.current)-1 : 0;
			return prev;
			};		
		}
	}
})
.filter('plus', function(){
     return function(param){
        // некоторые действия над param
        return param+'+1';
    }
})