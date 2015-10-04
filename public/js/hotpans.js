var hotpansServices = angular.module("HotPans", ["ngRoute"]);
var mailAddress = "abc";
var gBakery = {};
var gBread = {};
var gImageFileSrc;

function initVariable(){
	mailAddress = "";
	gBakery = {};
	gBread = {};
	gImageFileSrc = undefined;
}

function hotpansRouteConfig($routeProvider){
	$routeProvider.
	when("/",{
		controller: StartController,
		templateUrl: "menu.html"
	}).
	when("/login",{
		controller: LoginController,
		templateUrl: "login.html"
	}).
	when("/logout",{
		controller: LogoutController,
		templateUrl: "logout.html"
	}).
	when("/landingPage",{
		templateUrl: "landingPage.html"
	}).
	when("/bakery",{
		controller: BakeryController,
		templateUrl: "bakery.html"
	}).
	when("/customer",{
		controller: CustomerController,
		templateUrl: "customer.html"
	}).
	when("/registedMailAddress",{
		controller: RegistedMailAddressController,
		templateUrl: "registedMailAddress.html"
	}).
	when("/showRegistInfo",{
		controller: ShowRegistInfoController,
		templateUrl: "showRegistInfo.html"
	}).
	when("/registBakeryInfo",{
		controller: RegistBakeryInfoController,
		templateUrl: "registBakeryInfo.html"
	}).
	when("/confirmBakeryInfo",{
		controller: ConfirmBakeryInfoController,
		templateUrl: "confirmBakeryInfo.html"
	}).
	when("/registedBakeryInfo",{
		controller: RegistedBakeryInfoController,
		templateUrl: "registedBakeryInfo.html"
	}).
	when("/registBreadInfo",{
		controller: RegistBreadInfoController,
		templateUrl: "registBreadInfo.html"
	}).
	when("/confirmBreadInfo",{
		controller: ConfirmBreadInfoController,
		templateUrl: "confirmBreadInfo.html"
	}).
	when("/registedBreadInfo",{
		controller: RegistedBreadInfoController,
		templateUrl: "registedBreadInfo.html"
	}).
	otherwise({
		redirectTo: "/"
	});
}

hotpansServices.config(hotpansRouteConfig);

function StartController($scope, $location) {
	checkLoginStatus($location);
	initVariable();
}

function LoginController($scope, $location) {
	initVariable();
}

function LogoutController($scope, $location) {
	initVariable();
	document.cookie = 'isLoginedHotpans=NG';
	document.cookie = 'bakeryId=0';
	//document.cookie = 'bakeryName=nothing';
}

function RegistedBreadInfoController($scope, $location) {
	initVariable();
	//document.cookie = 'isLoginedHotpans=NG';
}

function BakeryController($scope, $location) {
	checkLoginStatus($location);
}

function CustomerController($scope, $location) {
	checkLoginStatus($location);
}

function RegistedMailAddressController($scope, $location) {
	checkLoginStatus($location);
	$scope.mailAddress = mailAddress;
}

function RegistedBakeryInfoController($scope, $location) {
	//checkLoginStatus($location);
}


//hotpansServices.controller("ConfirmBakeryInfoController", function ($scope) {
//	$scope.bakery = gBakery;
//});

function ConfirmBakeryInfoController($scope, $http, $location) {
	//checkLoginStatus($location);
	$scope.bakery = gBakery;
	$scope.imageFileSrc = gImageFileSrc;


	$scope.registBakery = function(bakery){
		bakery.image = gImageFileSrc;
		console.log("■bakery.name=" + bakery.name);
		console.log("■bakery.image=" + bakery.image);

		var fd = new FormData();
		fd.append('name', bakery.name);
		fd.append('mailAddress', bakery.mailAddress);
		fd.append('address', bakery.address);
		fd.append('phoneNumber1', bakery.phoneNumber1);
		fd.append('phoneNumber2', bakery.phoneNumber2);
		fd.append('introduction', bakery.introduction);
		fd.append('loginId', bakery.loginId);
		fd.append('loginPassword', bakery.loginPassword);
		if(bakery.image === undefined){
			console.log("★undefined");
			// No Printingの画像
			fd.append('image', 'data:image/png;base64,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');
		}else{
			fd.append('image', bakery.image);
		}

		//fd.append('bakery', bakery);

		//console.log("■fd.name=" + fd.));
		//console.log("■fd.image=" + fd.image);
		//console.log("■fd=" + fd);

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/bakerys',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/bakerys',
//			data : bakery
			data : fd,
			headers : {'Content-type':undefined},
			transformRequest: null
		}).success(function(data) {
			//成功
			console.log("★成功");
			initVariable();
			$location.path("/registedBakeryInfo");
			//templateUrl: "registed.html"
		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("Error!! Please try again later.");
		});
	}

	$scope.back = function(bakery){
		gBakery = bakery;
		$location.path("/registBakeryInfo");
	}

}

function RegistBakeryInfoController($scope, $location) {
	//checkLoginStatus($location);
	$scope.bakery = gBakery;
}

function ShowRegistInfoController($scope, $http, $location) {
	checkLoginStatus($location);
	initVariable();	// 初期化
	$http.get('http://localhost:8080/api/bakerys').
	//$http.get('https://makopi23-hotpans-test.herokuapp.com/api/bakerys').
	success(function(data1, status, headers, config) {
		$scope.bakerys = data1;

	});

	$http.get('http://localhost:8080/api/customers').
	//$http.get('https://makopi23-hotpans-test.herokuapp.com/api/customers').
	success(function(data, status, headers, config) {
		$scope.customers = data;
	});

	$http.get('http://localhost:8080/api/breads').
	//$http.get('https://makopi23-hotpans-test.herokuapp.com/api/breads').
	success(function(data, status, headers, config) {
		$scope.breads = data;
	});

}

hotpansServices.controller("RegistMailAddressController", function ($scope, $http, $location){
	var bakery = {};
	var customer = {};

	$scope.registBakeryMailAddress = function(){
		bakery.mailAddress = $scope.bakery.mailAddress;
		//bakery.name = "nothing";
		console.log(bakery.mailAddress);

		var fd = new FormData();
		fd.append('name', "-");
		fd.append('mailAddress', $scope.bakery.mailAddress);
		fd.append('address', "-");
		fd.append('phoneNumber1', "-");
		fd.append('phoneNumber2', "-");
		fd.append('introduction', "-");
		fd.append('image', 'data:image/png;base64,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');


		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/bakerys',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/bakerys',
			//data : bakery
			data : fd,
			headers : {'Content-type':undefined},
			transformRequest: null
		}).success(function(data) {
			//成功
			console.log("★成功");
			mailAddress = bakery.mailAddress;
			//location.reload();
			$location.path("/registedMailAddress");
		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("Error!! Please try again later.");
		});
	}

	$scope.registCustomerMailAddress = function(){
		customer.mailAddress = $scope.customer.mailAddress;
		customer.name = "nothing";
		console.log(customer.mailAddress);
		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/customers',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/customers',
			data : customer
		}).success(function(data) {
			//成功
			console.log("★成功");
			mailAddress = customer.mailAddress;
			//location.reload();
			$location.path("registedMailAddress");
		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("Error!! Please try again later.");
		});
	}
});

hotpansServices.controller("InputBakeryInfoController", function ($scope, $http, $location){
	var bakery = {};

	$scope.confirmBakeryInfo = function(){
		gBakery = $scope.bakery
		console.log("★" + gBakery.name);
		$location.path("/confirmBakeryInfo");

	}

	$scope.$watch("imageFile", function (imageFile) {
        $scope.imageFileSrc = undefined;
        if (!imageFile || !imageFile.type.match("image.*")) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            $scope.$apply(function () {
                $scope.imageFileSrc = reader.result;
                gImageFileSrc = reader.result;
            });
        };
        reader.readAsDataURL(imageFile);
    });
});

hotpansServices.directive("fileModel", ["$parse", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            element.bind("change", function () {
                scope.$apply(function () {
                    model.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

function RegistBreadInfoController($scope, $location) {
	checkLoginStatus($location);
	$scope.bread = gBread;

	$scope.bread.bakeryId = getCookie("bakeryId");
	$scope.bread.bakeryName = getCookie("bakeryName");

//	$scope.bakeryId = getCookie("bakeryId");
//	$scope.bakeryName = getCookie("bakeryName");
//
//	console.log("★$scope.bakeryId=" + $scope.bakeryId);
//	console.log("★$scope.bakeryName=" + $scope.bakeryName);
}

hotpansServices.controller("InputBreadInfoController", function ($scope, $http, $location){
	checkLoginStatus($location);
	var bread = {};




	$scope.confirmBreadInfo = function(){
		gBread = $scope.bread

		// パン屋のログイン機能が未実装のため、#1「パン屋まこぴ」のパンとして登録します。
		//gBread.bakeryId = "1";

		console.log("★bread.name=" + gBread.name);
		console.log("★bread.bakeryId=" + gBread.bakeryId);
		$location.path("/confirmBreadInfo");

	}

	$scope.$watch("imageFile", function (imageFile) {
        $scope.imageFileSrc = undefined;
        if (!imageFile || !imageFile.type.match("image.*")) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            $scope.$apply(function () {
                $scope.imageFileSrc = reader.result;
                gImageFileSrc = reader.result;
            });
        };
        reader.readAsDataURL(imageFile);
    });
});

function ConfirmBreadInfoController($scope, $http, $location) {
	checkLoginStatus($location);
	$scope.bread = gBread;
	$scope.imageFileSrc = gImageFileSrc;


	$scope.registBread = function(bread){
		bread.image = gImageFileSrc;
		console.log("■bread.name=" + bread.name);
		console.log("■bread.image=" + bread.image);
		//console.log("■bread.bakeryId=" + bread.bakeryId);

		var fd = new FormData();
		fd.append('name', bread.name);
		fd.append('price', bread.price);
		fd.append('introduction', bread.introduction);
		//fd.append('bakeryId', "1");
		fd.append('bakeryId', bread.bakeryId);
		if(bread.image === undefined){
			console.log("★undefined");
			// No Printingの画像
			fd.append('image', 'data:image/png;base64,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');
		}else{
			fd.append('image', bread.image);
		}

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/breads',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/breads',
			data : fd,
			headers : {'Content-type':undefined},
			transformRequest: null
		}).success(function(data) {
			//成功
			console.log("★成功");
			initVariable();
			$location.path("/registedBreadInfo");


		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("Error!! Please try again later.");
		});
	}

	$scope.back = function(bread){
		gBread = bread;
		$location.path("/registBreadInfo");
	}

}

hotpansServices.controller("InputLoginInfoController", function ($scope, $http, $location){

	$scope.login = function(){
		console.log("★id: " + $scope.login.id);
		console.log("★password: " + $scope.login.password);
		//$location.path("/menu");

//		var fd = new FormData();
//		fd.append('id', $scope.login.id);
//		fd.append('password', $scope.login.password);

		$http.get('http://localhost:8080/api/bakerys')
		//url : 'https://makopi23-hotpans-test.herokuapp.com/api/bakerys',
		.success(function(data) {
			//成功
			console.log("★成功");

			console.log(data);

			console.log("★" + data[0].loginPassword);

			var path = "/login";
			for(i = 0; i < data.length; i++){
				console.log("id:" + data[i].login_id);
				console.log("password:" + data[i].login_password);

				if(data[i].loginId == $scope.login.id
						&& data[i].loginPassword == $scope.login.password){
					console.log("★一致");

//					document.cookie = 'hotpans_id=' +  $scope.login.id;
//					document.cookie = 'hotpans_password' + $scope.login.password;
//
//					console.log("cookie:id=" + getCookie("hotpans_id"));

					document.cookie = 'isLoginedHotpans=OK';
					console.log("★id=" + data[i].id);
					//console.log("★bakery.name=" + data[i].name);
					document.cookie = 'bakeryId=' + data[i].id;
					//document.cookie = 'bakeryName=' + data[i].name;

					//console.log("★ログイン状態：" + isLogined());

					path = "/menu";
				}
			}
			console.log("★ログイン状態：" + isLogined());
			initVariable();
			$scope.login.message = "IDまたはパスワードが違います";
			$location.path(path);


			//initVariable();
			//$location.path("/menu");
		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("Error!! Please try again later.");
		});
	}
});

function getCookie( name )
{
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 )
    {
        var startIndex = position + cookieName.length;

        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 )
        {
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
            allcookies.substring( startIndex, endIndex ) );
    }

    return result;
}

function isLogined(){
	console.log("★cookie:" + getCookie("isLoginedHotpans"));
	if(getCookie("isLoginedHotpans") == "OK"){
		return true;
	}else{
		return false;
	}
}

function checkLoginStatus($location){
	if(isLogined() == false){
		console.log("★false");
		$location.path("/login");
	}
}