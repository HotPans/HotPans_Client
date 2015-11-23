var hotpansServices = angular.module("HotPans", ["ui.router"]);
var gMailAddress = "";
var gBakery = {};
var gCustomer = {};
var gBread = {};
var gAdministrator = {};
var gImageFileSrc;
var gBakeryLoginInfo = {};
var gCustomerLoginInfo = {};
var gAdministratorLoginInfo = {};

function initVariable(){
	mailAddress = "";
	gBakery = {};
	gCustomer = {}
	gBread = {};
	gImageFileSrc = undefined;
}

function hotpansRouteConfig($stateProvider){
	$stateProvider.
	state('top', {
		url: "/",
		controller: StartController,
		templateUrl: "start.html"
	}).
	state('loginForBakery', {
		url: "/loginForBakery",
		controller: LoginForBakeryController,
		templateUrl: "loginForBakery.html"
	}).
	state('loginForCustomer', {
		url: "/loginForCustomer",
		//controller: LoginForCustomerController,
		templateUrl: "loginForCustomer.html"
	}).
	state('loginForAdministrator', {
		url: "/loginForAdministrator",
		//controller: LoginForCustomerController,
		templateUrl: "loginForAdministrator.html"
	}).
	state('logout', {
		url: "/logout",
		controller: LogoutController,
		templateUrl: "logout.html"
	}).
	state('landingPage', {
		url: "/landingPage",
		templateUrl: "landingPage.html"
	}).
	state('landingPageForBakery', {
		url: "/landingPageForBakery",
		controller: LandingPageForBakeryController,
		templateUrl: "landingPageForBakery.html"
	}).
	state('landingPageForCustomer', {
		url: "/landingPageForCustomer",
		controller: LandingPageForCustomerController,
		templateUrl: "landingPageForCustomer.html"
	}).
	state('registedMailAddress', {
		url: "/registedMailAddress",
		controller: RegistedMailAddressController,
		templateUrl: "registedMailAddress.html"
	}).
	state('showRegistInfo', {
		url: "/showRegistInfo",
		controller: ShowRegistInfoController,
		templateUrl: "showRegistInfo.html"
	}).
	state('registBakeryInfo', {
		url: "/registBakeryInfo",
		controller: RegistBakeryInfoController,
		templateUrl: "registBakeryInfo.html"
	}).
	state('registCustomerInfo', {
		url: "/registCustomerInfo",
		controller: RegistCustomerInfoController,
		templateUrl: "registCustomerInfo.html"
	}).
	state('registBreadInfo', {
		url: "/registBreadInfo",
		controller: RegistBreadInfoController,
		templateUrl: "registBreadInfo.html"
	}).
	state('confirmBakeryInfo', {
		url: "/confirmBakeryInfo",
		controller: ConfirmBakeryInfoController,
		templateUrl: "confirmBakeryInfo.html"
	}).
	state('confirmCustomerInfo', {
		url: "/confirmCustomerInfo",
		controller: ConfirmCustomerInfoController,
		templateUrl: "confirmCustomerInfo.html"
	}).
	state('confirmBreadInfo', {
		url: "/confirmBreadInfo",
		controller: ConfirmBreadInfoController,
		templateUrl: "confirmBreadInfo.html"
	}).
	state('registedBakeryInfo', {
		url: "/registedBakeryInfo",
		controller: RegistedBakeryInfoController,
		templateUrl: "registedBakeryInfo.html"
	}).
	state('registedCustomerInfo', {
		url: "/registedCustomerInfo",
		controller: RegistedCustomerInfoController,
		templateUrl: "registedCustomerInfo.html"
	}).
	state('registedBreadInfo', {
		url: "/registedBreadInfo",
		controller: RegistedBreadInfoController,
		templateUrl: "registedBreadInfo.html"
	}).
	state('menuForBakery', {
		url: "/menuForBakery",
		controller: MenuForBakeryController,
		templateUrl: "menuForBakery.html"
	}).
	state('menuForCustomer', {
		url: "/menuForCustomer",
		controller: MenuForCustomerController,
		templateUrl: "menuForCustomer.html"
	}).
	state('menuForAdministrator', {
		url: "/menuForAdministrator",
		controller: MenuForAdministratorController,
		templateUrl: "menuForAdministrator.html"
	}).
    state('GoogleLoginSuccess', {
    	url: "/access_token=:accessToken",
    	controller: GoogleLoginSuccessController,
    	templateUrl: "access_ok.html"
    }).
    state('GoogleLoginFail', {
    	url: "/error=:errorToken",
    	controller: GoogleLoginFailController,
    	templateUrl: "access_ng.html"
    });
}

function defaultRouteConfig($urlRouterProvider){
	$urlRouterProvider.otherwise('/');
}

hotpansServices.config(hotpansRouteConfig);
hotpansServices.config(defaultRouteConfig);

function StartController($scope, $location, $http) {
	console.log("★StartController");
	//goLoginPageIfNotBakeryLogin($location, $http);
	initVariable();
}

function LoginForBakeryController($scope, $location) {
	initVariable();
}

function LogoutController($scope, $location) {
	initVariable();
	gBakeryLoginInfo = {};
	gCustomerLoginInfo = {};
	gAdministratorLoginInfo = {};
}

function RegistedBreadInfoController($scope, $location) {
	initVariable();
}

function LandingPageForBakeryController($scope, $location, $http) {
	//goLoginPageIfNotBakeryLogin($location, $http);
}

function LandingPageForCustomerController($scope, $location, $http) {
	//goLoginPageIfNotBakeryLogin($location, $http);
}

function RegistedMailAddressController($scope, $location, $http) {
	//goLoginPageIfNotBakeryLogin($location, $http);
	$scope.mailAddress = mailAddress;
}

function RegistedBakeryInfoController($scope, $location) {
	goLoginPageIfNotBakeryLogin($location, $http);
}

function RegistedCustomerInfoController($scope, $location) {
	goLoginPageIfNotCustomerLogin($location, $http);
}

function ConfirmBakeryInfoController($scope, $http, $location) {
	goLoginPageIfNotBakeryLogin($location, $http);
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

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/bakerys',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/bakerys',
			data : fd,
			headers : {'Content-type':undefined},
			transformRequest: null
		}).success(function(data) {
			// POST成功
			console.log("★POST成功");
			initVariable();
			$location.path("/registedBakeryInfo");
		}).error(function(data, status, headers) {
			// POST失敗
			console.log("★POST失敗");
			console.log(status);

			if(status == 409){
				alert("そのログインIDは登録済みです。他のログインIDにしてください。");
			}else{
				alert("パン屋さんの情報登録POST失敗！");
			}
		});
	}

	$scope.back = function(bakery){
		gBakery = bakery;
		$location.path("/registBakeryInfo");
	}

}

function ConfirmCustomerInfoController($scope, $http, $location) {
	goLoginPageIfNotCustomerLogin($location, $http);
	$scope.customer = gCustomer;

	$scope.registCustomer = function(customer){
		//customer.image = gImageFileSrc;
		console.log("■customer.name=" + customer.name);
		//console.log("■customer.image=" + customer.image);

		var fd = new FormData();
		fd.append('name', customer.name);
		fd.append('mailAddress', customer.mailAddress);
		fd.append('loginId', customer.loginId);
		fd.append('loginPassword', customer.loginPassword);

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/customers',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/customers',
			data : customer
		}).success(function(data) {
			// POST成功
			console.log("★POST成功");
			initVariable();
			$location.path("/registedCustomerInfo");
		}).error(function(data, status, headers) {
			// POST失敗
			console.log("★POST失敗");
			console.log(status);

			if(status == 409){
				alert("そのログインIDは登録済みです。他のログインIDにしてください。");
			}else{
				alert("パン屋お客さんの情報登録POST失敗！");
			}
		});
	}

	$scope.back = function(customer){
		gCustomer = customer;
		$location.path("/registCustomerInfo");
	}

}

function RegistBakeryInfoController($scope, $location) {
	//goLoginPageIfNotBakeryLogin($location, $http);
	$scope.bakery = gBakery;
}

function RegistCustomerInfoController($scope, $location, $http) {
	//console.log("RegistCustomerInfoController");
	$scope.customer = gCustomer;
}

function ShowRegistInfoController($scope, $http, $location) {
	goLoginPageIfNotAdministratorLogin($location, $http)

	initVariable();	// 初期化
	$http.get('http://localhost:8080/api/bakerys').
	//$http.get('https://makopi23-hotpans-test.herokuapp.com/api/bakerys').
	success(function(data, status, headers, config) {
		$scope.bakerys = data;

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

function MenuForBakeryController($location, $http, $scope) {
	//$scope.bakery.name = gBakeryLoginInfo.name;
	goLoginPageIfNotBakeryLogin($location, $http);
	$scope.bakery = gBakeryLoginInfo;
}

function MenuForCustomerController($location, $http, $scope) {
	goLoginPageIfNotCustomerLogin($location, $http);
	$scope.customer = gCustomerLoginInfo;
}

function MenuForAdministratorController($location, $http, $scope) {
	goLoginPageIfNotAdministratorLogin($location, $http);
	$scope.administrator = gAdministratorLoginInfo;
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
		fd.append('loginId', $scope.bakery.mailAddress);
		fd.append('loginPassword', "$scope.bakery.mailAddress");
		fd.append('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAIAAAAGpIFSAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA2jSURBVHjaYlSWV2AYBaOABgAggFiA+M6D+6MBMQqoC1QUFAECiGk0FEYBjQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaIg1MmTYzLDxSRUExJTVj1559dLP3/YePtfWNHh5eFmYWhUWlV6/dGPxhBRBAjMryCnce3CdeAzBMD+zeiSwSGZ/Q3FiPqfL4ydOx4WHIIgVlFTlZ6bTzDDDK8clqaMrIyqmqqfp4e2traZBhfmd37+ypU5BFps2Z6+biRId4AibocydPwLkiYuKr1q6Rk5UZtAkLGBcAAUSFcmv5wgX0zMFkgzs3rgNzBTBx+Ht5ArM+sCQg1QS0hAUEq1auoro7Hz1+smDRUrRcipywgODNq5ebNm8d5AEOEEAsVDGlrqpKQ31QZyM0sHndmqdPn8ycOUNQgH+QOAmYP8+fP79/715gHgByE+Kih3r7ASCAqNPeAmajpqaWoeVzYEmwdNkKkrQ4uLqjiRgYGlLuEmDjCViDZKUkA8tFSMJCAxrqasBKEE3Q2NhokIcwQABRrS0PrG6A7dxBV+traAIThJG5BVbZLZs2kmRad3cnsHEJ56Zm51Cl+fjp82f8CoCF69wFC+ApG5jOOvsnWpqbDvK0BRBALFQ0a0JXh6ODPXnNZHhvCBKU1HKSj58/JPqBZUNyQgKwfEVrgQEbN8RX5UCHAXstQAR0J6mOJMkiTAAM1TmzZ0CCiHZWk2E4HgAQQCzUTarFRUXLVywnyX3AWF+xcuXpkyeRqwNgeWNqbp6akkytNhwwbgJDQzEb40+fPQdaAewA3r51G1nc08srONAPWBIDyzagwyA9XFzKgIy16zdt37YNWQrYIS0vLQb6rr9/ArxnDSxBC4uK4EUORNenTx+x9schDEiSgnPhoLCwAJKNcbkK2IDr6+mBh6pvUEhhYT5meALT06zZc9avXg3JeMBCERhQaakppaXluGwkEgAEEJXTFtAnff0TsA5JYM0lQF9hxjfEHCAC9kCB9Q4whqjiNm5uHlxSwLhBG1gBNqRq6xuBDiCoDMJ4/vw5mhQk6ZQX5qM18mLDwxavXAVJXlh1wdsYeLhAkJySTJLjgd2X40cOb9+1EznnYxbnQDYwRjDNRLaRSAAQQNQfOyV+SCI9PQNrwkLr9mNmWfLAy5cvMAWlpSSxKr5w/jxa3JAKnjx+1N3ehlWqv6+Ppg2dQwcPYHU8MN0AMzNy3sZsJ+BKymQAgACiQtpCbt7ChySAdTx+XcDqBm3Mhqa9BGByxwxuYM2Lq86lPHCB5S7WaIOUXjQdWMcTsMC6D84G1jC4XEgVABBAVEhbtra2wEgiaUgCmGOWLJiPJgis6YHJFIgw+9tAxWQMdUK6F8DuPaSHj7WlT+teKrBORwscWDvvGZCUlJTE1Y0FikMQeVYDNWINSWDUQEISSGIt24C6gC0zqngfIICo0N7i5eWtb2xEm94B5ntJHNUNEOzbfxAzx/RPngxphUSEh/t7eaKFCFALpNVMLQCM0eioCDwKgBETk5BobGx09uw5NTVVcpoH4G4NsF1samCAJnXr1m03Fyegj4AIc3IM3oQn22sQ7cBsj5mpbty8BQxnYHhiauzsnwgJZH0Dg5a6GgpDGCCAqNPeAroVmEExG1641APbsJjBAe89ATsjmPn1zp3b1C1R6uvr8fdn5y5YAOwbAl0FJMmYNAR6AWI+kCS7+CEP2Nk7QBh4nI0ZBcAwgedeqswKAAQQ1drywN4criFKrC1lNBE+PgLDFmjdbAobiMASBX93GlgvUDJQN/jB3Tt30ERkZOXQcjuFVgAEEDXHIIAlAa5+B1VqXvLKJ3iQqaqpqqioOjnaEzP8pqyiwjCswWdCkwGfPn6k0AqAAKJm2gJm9IycXGLqaQNDQ7SOGNr4IeZwInmRDR+XHwVoAJjT8EQBsKWPdWaTJAAQQFQe3wLW08S0LYD9I8xuM7BJC2FjLikBAvJa00MXEBzEoRBgjiQjj4yQOouPFQAEEAvVHd3d3enpdgF/zQismIC9MDQ1hbm5rp6g7uHu7dsxu2ymJsbDNRnxYavu01LTHJ2dga1MSjqMeADWZRTAJg0wCr58/rJ53RrKrQAIIOqnLWBrpqmtLQvv/ABQDbB7P6GrA22gAVfXEqh48Cy0ojoAtiUwcxpk1ot2lgL7v8DGKJoVeKKADAAQQDRZLw/s+mIOSaABYDOIyJ4IsJId9m0mYOahv6VFJSU0NR8ggGi1FyMtNQXreDQymDlzBsEhYGAaBVayw751FR0VQXmfn4wiAHO+DgI6+ydSbj5AAJFcJ6pitKmxNheAVVhvX19//wQ8TXigmv6+7rDwsG3btmFdYxMRHk7SIBNmNwKz00Ckp7BqxKMMMnuDSzFB84FBAcxpwBY0ZEkPXBye9zC9Bg92/Ibj0QgEzY31tra2c2bPhneegOqTU5KBNSbaCg4G3PP6uABAAJG8z4emgOprA4coAPbX6D9yi7yEEHN1EDC379ixjXjTVBQUAQJocO1PBKaq0YQFad3Tx6Ip02bCFwHAE9bxk6cxVwcBqxFSDQcIoMFVbo0COgPIjk5gzQsfmj508ADWJTr7Dh8maQ0w0GSAAGIZDd9RQHA0q6CsgozF5QABNLpnfxQQAMC+JHljQAABNFpujQLc9ZqGZlFJCdmHEgAE0GjaGtGgpqnlyOHDVy6izNE5uLpLSkna2tpSeNQFQACNtuVHAa16CQABNNreGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABBALEKsoKI4GxCigOgAIMABZbFcANAGuBAAAAABJRU5ErkJggg==');


		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/bakerys',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/bakerys',
			data : fd,
			headers : {'Content-type':undefined},
			transformRequest: null
		}).success(function(data) {
			//成功
			console.log("★POST成功");
			mailAddress = bakery.mailAddress;
			//location.reload();
			$location.path("/registedMailAddress");
		}).error(function(data) {
			//失敗
			console.log("★POST失敗");
			alert("メールアドレス登録のPOST失敗！");
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
			$location.path("registedMailAddress");
		}).error(function(data) {
			//失敗
			console.log("★失敗");
			alert("メールアドレス登録のPOST失敗！");
		});
	}
});


hotpansServices.controller("InputBakeryInfoController", function ($scope, $http, $location){
	var bakery = {};

	$scope.confirmBakeryInfo = function(){
		gBakery = $scope.bakery
		console.log("★" + gBakery.name);

		console.log("loginPassword = " + $scope.bakery.loginPassword);
		console.log("loginPassword2 = " + $scope.bakery.loginPassword2);

		// 入力した２つのパスワードが不一致の場合
		if($scope.bakery.loginPassword != $scope.bakery.loginPassword2){
			$scope.bakery.message = "入力した２つのパスワードが異なります。";
			$location.path("/registBakeryInfo");
		}else{
			$scope.bakery.message = "";
			$location.path("/confirmBakeryInfo");
		}

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

hotpansServices.controller("InputCustomerInfoController", function ($scope, $http, $location){
	var customer = {};

	$scope.confirmCustomerInfo = function(){
		gCustomer = $scope.customer
		console.log("★" + gCustomer.name);

		console.log("loginPassword = " + $scope.customer.loginPassword);
		console.log("loginPassword2 = " + $scope.customer.loginPassword2);

		// 入力した２つのパスワードが不一致の場合
		if($scope.customer.loginPassword != $scope.customer.loginPassword2){
			$scope.customer.message = "入力した２つのパスワードが異なります。";
			$location.path("/registCustomerInfo");
		}else{
			$scope.customer.message = "";
			$location.path("/confirmCustomerInfo");
		}

	}
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

function RegistBreadInfoController($scope, $location, $http) {
	goLoginPageIfNotBakeryLogin($location, $http);
	$scope.bread = gBread;
	$scope.bread.bakeryId = gBakeryLoginInfo.id;
}


hotpansServices.controller("InputBreadInfoController", function ($scope, $http, $location){
	goLoginPageIfNotBakeryLogin($location, $http);
	var bread = {};

	$scope.confirmBreadInfo = function(){
		gBread = $scope.bread
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
	goLoginPageIfNotBakeryLogin($location, $http);
	$scope.bread = gBread;
	$scope.imageFileSrc = gImageFileSrc;


	$scope.registBread = function(bread){
		bread.image = gImageFileSrc;
		console.log("■bread.name=" + bread.name);
		console.log("■bread.image=" + bread.image);

		var fd = new FormData();
		fd.append('name', bread.name);
		fd.append('price', bread.price);
		fd.append('introduction', bread.introduction);
		fd.append('bakeryId', bread.bakeryId);
		if(bread.image === undefined){
			console.log("★undefined");
			// No Printingの画像
			fd.append('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAIAAAAGpIFSAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA2jSURBVHjaYlSWV2AYBaOABgAggFiA+M6D+6MBMQqoC1QUFAECiGk0FEYBjQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaIg1MmTYzLDxSRUExJTVj1559dLP3/YePtfWNHh5eFmYWhUWlV6/dGPxhBRBAjMryCnce3CdeAzBMD+zeiSwSGZ/Q3FiPqfL4ydOx4WHIIgVlFTlZ6bTzDDDK8clqaMrIyqmqqfp4e2traZBhfmd37+ypU5BFps2Z6+biRId4AibocydPwLkiYuKr1q6Rk5UZtAkLGBcAAUSFcmv5wgX0zMFkgzs3rgNzBTBx+Ht5ArM+sCQg1QS0hAUEq1auoro7Hz1+smDRUrRcipywgODNq5ebNm8d5AEOEEAsVDGlrqpKQ31QZyM0sHndmqdPn8ycOUNQgH+QOAmYP8+fP79/715gHgByE+Kih3r7ASCAqNPeAmajpqaWoeVzYEmwdNkKkrQ4uLqjiRgYGlLuEmDjCViDZKUkA8tFSMJCAxrqasBKEE3Q2NhokIcwQABRrS0PrG6A7dxBV+traAIThJG5BVbZLZs2kmRad3cnsHEJ56Zm51Cl+fjp82f8CoCF69wFC+ApG5jOOvsnWpqbDvK0BRBALFQ0a0JXh6ODPXnNZHhvCBKU1HKSj58/JPqBZUNyQgKwfEVrgQEbN8RX5UCHAXstQAR0J6mOJMkiTAAM1TmzZ0CCiHZWk2E4HgAQQCzUTarFRUXLVywnyX3AWF+xcuXpkyeRqwNgeWNqbp6akkytNhwwbgJDQzEb40+fPQdaAewA3r51G1nc08srONAPWBIDyzagwyA9XFzKgIy16zdt37YNWQrYIS0vLQb6rr9/ArxnDSxBC4uK4EUORNenTx+x9schDEiSgnPhoLCwAJKNcbkK2IDr6+mBh6pvUEhhYT5meALT06zZc9avXg3JeMBCERhQaakppaXluGwkEgAEEJXTFtAnff0TsA5JYM0lQF9hxjfEHCAC9kCB9Q4whqjiNm5uHlxSwLhBG1gBNqRq6xuBDiCoDMJ4/vw5mhQk6ZQX5qM18mLDwxavXAVJXlh1wdsYeLhAkJySTJLjgd2X40cOb9+1EznnYxbnQDYwRjDNRLaRSAAQQNQfOyV+SCI9PQNrwkLr9mNmWfLAy5cvMAWlpSSxKr5w/jxa3JAKnjx+1N3ehlWqv6+Ppg2dQwcPYHU8MN0AMzNy3sZsJ+BKymQAgACiQtpCbt7ChySAdTx+XcDqBm3Mhqa9BGByxwxuYM2Lq86lPHCB5S7WaIOUXjQdWMcTsMC6D84G1jC4XEgVABBAVEhbtra2wEgiaUgCmGOWLJiPJgis6YHJFIgw+9tAxWQMdUK6F8DuPaSHj7WlT+teKrBORwscWDvvGZCUlJTE1Y0FikMQeVYDNWINSWDUQEISSGIt24C6gC0zqngfIICo0N7i5eWtb2xEm94B5ntJHNUNEOzbfxAzx/RPngxphUSEh/t7eaKFCFALpNVMLQCM0eioCDwKgBETk5BobGx09uw5NTVVcpoH4G4NsF1samCAJnXr1m03Fyegj4AIc3IM3oQn22sQ7cBsj5mpbty8BQxnYHhiauzsnwgJZH0Dg5a6GgpDGCCAqNPeAroVmEExG1641APbsJjBAe89ATsjmPn1zp3b1C1R6uvr8fdn5y5YAOwbAl0FJMmYNAR6AWI+kCS7+CEP2Nk7QBh4nI0ZBcAwgedeqswKAAQQ1drywN4criFKrC1lNBE+PgLDFmjdbAobiMASBX93GlgvUDJQN/jB3Tt30ERkZOXQcjuFVgAEEDXHIIAlAa5+B1VqXvLKJ3iQqaqpqqioOjnaEzP8pqyiwjCswWdCkwGfPn6k0AqAAKJm2gJm9IycXGLqaQNDQ7SOGNr4IeZwInmRDR+XHwVoAJjT8EQBsKWPdWaTJAAQQFQe3wLW08S0LYD9I8xuM7BJC2FjLikBAvJa00MXEBzEoRBgjiQjj4yQOouPFQAEEAvVHd3d3enpdgF/zQismIC9MDQ1hbm5rp6g7uHu7dsxu2ymJsbDNRnxYavu01LTHJ2dga1MSjqMeADWZRTAJg0wCr58/rJ53RrKrQAIIOqnLWBrpqmtLQvv/ABQDbB7P6GrA22gAVfXEqh48Cy0ojoAtiUwcxpk1ot2lgL7v8DGKJoVeKKADAAQQDRZLw/s+mIOSaABYDOIyJ4IsJId9m0mYOahv6VFJSU0NR8ggGi1FyMtNQXreDQymDlzBsEhYGAaBVayw751FR0VQXmfn4wiAHO+DgI6+ydSbj5AAJFcJ6pitKmxNheAVVhvX19//wQ8TXigmv6+7rDwsG3btmFdYxMRHk7SIBNmNwKz00Ckp7BqxKMMMnuDSzFB84FBAcxpwBY0ZEkPXBye9zC9Bg92/Ibj0QgEzY31tra2c2bPhneegOqTU5KBNSbaCg4G3PP6uABAAJG8z4emgOprA4coAPbX6D9yi7yEEHN1EDC379ixjXjTVBQUAQJocO1PBKaq0YQFad3Tx6Ip02bCFwHAE9bxk6cxVwcBqxFSDQcIoMFVbo0COgPIjk5gzQsfmj508ADWJTr7Dh8maQ0w0GSAAGIZDd9RQHA0q6CsgozF5QABNLpnfxQQAMC+JHljQAABNFpujQLc9ZqGZlFJCdmHEgAE0GjaGtGgpqnlyOHDVy6izNE5uLpLSkna2tpSeNQFQACNtuVHAa16CQABNNreGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABNBo2hoFtAIAATSatkYBrQBAAI2mrVFAKwAQQKNpaxTQCgAE0GjaGgW0AgABNJq2RgGtAEAAjaatUUArABBAo2lrFNAKAATQaNoaBbQCAAE0mrZGAa0AQACNpq1RQCsAEECjaWsU0AoABBALEKsoKI4GxCigOgAIMABZbFcANAGuBAAAAABJRU5ErkJggg==');
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
			alert("パン登録のPOST失敗！");
		});
	}

	$scope.back = function(bread){
		gBread = bread;
		$location.path("/registBreadInfo");
	}

}

hotpansServices.controller("InputBakeryLoginInfoController", function ($scope, $http, $location){

	$scope.login = function(){
		console.log("★id: " + $scope.login.id);
		console.log("★password: " + $scope.login.password);

		var fd = new FormData();
		fd.append('id', $scope.login.id);
		fd.append('password', $scope.login.password);

		var loginData = {};
		loginData.loginId = $scope.login.id;
		loginData.loginPassword = $scope.login.password;

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/login/bakery',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/bakery',
			data : loginData
		}).success(function(data) {
			//成功
			console.log("★POST成功");
			initVariable();
			console.log("★Response:");
			console.log(data);

			// ログイン成功の場合は、ログイン認証済みのトークンが返される。
			// ログイン失敗の場合は、トークンに NG が設定されて返される。

			// ログイン成功の場合
			if(data.tokenForCertification != 'NG'){
				console.log("★パン屋さんログイン成功");
				gBakeryLoginInfo.id = data.id;	// ログインIDではなく、主キー（整数）を格納
				gBakeryLoginInfo.tokenForCertification = data.tokenForCertification;
				gBakeryLoginInfo.name = data.name;
				console.log("gBakeryLoginInfo.id: " + gBakeryLoginInfo.id);
				console.log("gBakeryLoginInfo.name: " + gBakeryLoginInfo.name);
				console.log("gBakeryLoginInfo.tokenForCertification: " + gBakeryLoginInfo.tokenForCertification);
				$location.path("/menuForBakery");
			}else{
				// ログイン失敗の場合
				console.log("★ログイン失敗");
				$scope.login.message = "IDまたはパスワードが違います";
				$location.path("/loginForBakery");
			}

		}).error(function(data) {
			//失敗
			console.log("★POST失敗");
			console.log("★Response:");
			console.log(data);
			alert("ログイン認証のPOST失敗！");
		});
	}
});

hotpansServices.controller("InputCustomerLoginInfoController", function ($scope, $http, $location){

	$scope.login = function(){
		console.log("★id: " + $scope.login.id);
		console.log("★password: " + $scope.login.password);

		var loginData = {};
		loginData.loginId = $scope.login.id;
		loginData.loginPassword = $scope.login.password;

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/login/customer',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/customer',
			data : loginData
		}).success(function(data) {
			//成功
			console.log("★POST成功");
			initVariable();
			console.log("★Response:");
			console.log(data);

			// ログイン成功の場合は、ログイン認証済みのトークンが返される。
			// ログイン失敗の場合は、トークンに NG が設定されて返される。

			// ログイン成功の場合
			if(data.tokenForCertification != 'NG'){
				console.log("★ログイン成功");
				gCustomerLoginInfo.id = data.id;	// ログインIDではなく、主キー（整数）を格納
				gCustomerLoginInfo.name = data.name;
				gCustomerLoginInfo.tokenForCertification = data.tokenForCertification;
				console.log("gCustomerLoginInfo.id: " + gCustomerLoginInfo.id);
				console.log("gCustomerLoginInfo.tokenForCertification: " + gCustomerLoginInfo.tokenForCertification);
				$location.path("/menuForCustomer");
			}else{
				// ログイン失敗の場合
				console.log("★ログイン失敗");
				$scope.login.message = "IDまたはパスワードが違います";
				$location.path("/loginForCustomer");
			}

		}).error(function(data) {
			//失敗
			console.log("★POST失敗");
			console.log("★Response:");
			console.log(data);
			alert("ログイン認証のPOST失敗！");
		});
	}
});

hotpansServices.controller("InputAdministratorLoginInfoController", function ($scope, $http, $location){

	$scope.login = function(){
		console.log("★id: " + $scope.login.id);
		console.log("★password: " + $scope.login.password);

		var loginData = {};
		loginData.loginId = $scope.login.id;
		loginData.loginPassword = $scope.login.password;

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/login/administrator',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/administrator',
			data : loginData
		}).success(function(data) {
			//成功
			console.log("★POST成功");
			initVariable();
			console.log("★Response:");
			console.log(data);

			// ログイン成功の場合は、ログイン認証済みのトークンが返される。
			// ログイン失敗の場合は、トークンに NG が設定されて返される。

			// ログイン成功の場合
			if(data.tokenForCertification != 'NG'){
				console.log("★管理者さんとしてログイン成功");
				gAdministratorLoginInfo.id = data.id;	// ログインIDではなく、主キー（整数）を格納
				gAdministratorLoginInfo.name = data.name;
				gAdministratorLoginInfo.tokenForCertification = data.tokenForCertification;
				console.log("administratorLoginInfo.id: " + gAdministratorLoginInfo.id);
				console.log("administratorLoginInfo.tokenForCertification: " + gAdministratorLoginInfo.tokenForCertification);
				$location.path("/menuForAdministrator");
			}else{
				// ログイン失敗の場合
				console.log("★ログイン失敗");
				$scope.login.message = "IDまたはパスワードが違います";
				$location.path("/loginForAdministrator");
			}

		}).error(function(data) {
			//失敗
			console.log("★POST失敗");
			console.log("★Response:");
			console.log(data);
			alert("ログイン認証のPOST失敗！");
		});
	}
});

hotpansServices.controller("AdministratorLoginForGoogleAccountController", function ($scope, $http, $location){

	$scope.loginForGoogleAccount = function(){
		console.log("★Google Login");

        var client_id = "789086735509-lhn2hfpm3sef9pa7ov3gvemdv13a46r1.apps.googleusercontent.com";
        var scope = "email";
        var redirect_uri = "http://localhost:18080/HotPans_Client/public";
        var response_type = "token";
        var url="https://accounts.google.com/o/oauth2/auth?scope=" + scope
        	+ "&client_id=" + client_id
        	+ "&redirect_uri=" + redirect_uri
        	+ "&response_type=" + response_type;
        window.location.replace(url);
	}

});

function goLoginPageIfNotBakeryLogin($location, $http, $scope){
	console.log("★goLoginPageIfNotBakeryLogin");

	var bakery = {};
	bakery.id = gBakeryLoginInfo.id;
	bakery.tokenForCertification = gBakeryLoginInfo.tokenForCertification;
	console.log("bakery.id = " + bakery.id);
	console.log("bakery.tokenForCertification = " + bakery.tokenForCertification);

	$http({
		method : 'POST',
		url : 'http://localhost:8080/api/login/bakery/isLogined',
		//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/bakery/isLogined',
		data : bakery
	}).success(function(data) {
		//成功
		console.log("★パン屋さんログインステータス取得成功");
		console.log("★パン屋さんのログインステータス:" + data);

		// 未ログインの場合、ログイン画面へ
		if(data == false){
			$location.path("/loginForBakery");
			//$route.reload();
		}

	}).error(function(data) {
		//失敗
		console.log("★パン屋さんログインステータス取得失敗");
		console.log(data);
		alert("サーバとの通信に失敗しました。ログインステータスが取得できません。");
	});

}

function goLoginPageIfNotCustomerLogin($location, $http, $scope){
	console.log("★goLoginPageIfNotCustomerLogin");

	var customer = {};
	customer.id = gCustomerLoginInfo.id;
	customer.tokenForCertification = gCustomerLoginInfo.tokenForCertification;
	console.log("customer.id = " + customer.id);
	console.log("customer.tokenForCertification = " + customer.tokenForCertification);

	$http({
		method : 'POST',
		url : 'http://localhost:8080/api/login/customer/isLogined',
		//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/customer/isLogined',
		data : customer
	}).success(function(data) {
		//成功
		console.log("★パン屋のお客さんログインステータス取得成功");
		console.log("★パン屋さんのお客さんログインステータス:" + data);

		// 未ログインの場合、ログイン画面へ
		if(data == false){
			$location.path("/loginForCustomer");
		}

	}).error(function(data) {
		//失敗
		console.log("★パン屋のお客さんログインステータス取得失敗");
		console.log(data);
		alert("サーバとの通信に失敗しました。ログインステータスが取得できません。");
	});

}

function goLoginPageIfNotAdministratorLogin($location, $http, $scope){
	console.log("★goLoginPageIfNotAdministratorLogin");

	var administrator = {};
	administrator.id = gAdministratorLoginInfo.id;
	administrator.tokenForCertification = gAdministratorLoginInfo.tokenForCertification;
	console.log("administrator.id = " + administrator.id);
	console.log("administrator.tokenForCertification = " + administrator.tokenForCertification);

	$http({
		method : 'POST',
		url : 'http://localhost:8080/api/login/administrator/isLogined',
		//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/administrator/isLogined',
		data : administrator
	}).success(function(data) {
		//成功
		console.log("★管理者さんログインステータス取得成功");
		console.log("★管理者さんログインステータス:" + data);

		// 未ログインの場合、ログイン画面へ
		if(data == false){
			$location.path("/loginForAdministrator");
		}

	}).error(function(data) {
		//失敗
		console.log("★管理者さんログインステータス取得失敗");
		console.log(data);
		alert("サーバとの通信に失敗しました。ログインステータスが取得できません。");
	});

}

function GoogleLoginSuccessController($scope, $rootScope, $location, $http) {
	console.log("★GoogleLoginSuccessController")
	console.log("$location.path: " + $location.path());
	console.log("$location.absUrl(): " + $location.absUrl());

	var hash = $location.path().substr(1);
	console.log("hash: " + hash);

	var splitted = hash.split('&');
	var params = {};

	for (var i = 0; i < splitted.length; i++) {
	  var param  = splitted[i].split('=');
	  var key    = param[0];
	  var value  = param[1];
	  console.log("key: " + key + ", value: " + value);
	  params[key] = value;
	  $rootScope.accesstoken = params;
	}

	window.localStorage.setItem("access_token", params["access_token"]);
	console.log("localStorage: " + window.localStorage.getItem("access_token"));
	$rootScope.accesstokenstr = $rootScope.accesstoken["access_token"];

	$http.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + params["access_token"]).
	success(function(data, status, headers, config) {
		console.log("★あなたのメールアドレス：" + data.email);

		var administrator = {};
		administrator.mailAddress = data.email;

		$http({
			method : 'POST',
			url : 'http://localhost:8080/api/login/administrator/GoogleAccount',
			//url : 'https://makopi23-hotpans-test.herokuapp.com/api/login/administrator/GoogleAccount',
			data : administrator
		}).success(function(data) {
			//成功
			console.log("★管理者さんログインステータス取得成功");
			console.log("★data=");
			console.log(data);

			// Googleメールアドレスが未登録の場合、ログインを認めない
			if(data == null){
				$location.path("/loginForAdministrator");
			}else{
				// Googleメールアドレスが登録済の場合、ログインを認める
				gAdministratorLoginInfo.id = data.id;	// ログインIDではなく、主キー（整数）を格納
				gAdministratorLoginInfo.tokenForCertification = data.tokenForCertification;
				gAdministratorLoginInfo.name = data.name;
				$location.path("/menuForAdministrator");
			}

		}).error(function(data) {
			//失敗
			console.log("★管理者さんログインステータス取得失敗");
			console.log(data);
			alert("サーバとの通信に失敗しました。ログインステータスが取得できません。");
		});

	});


}

function GoogleLoginFailController($scope, $rootScope, $location, $http) {
	console.log("★LoginFailController")
	console.log("$location.path: " + $location.path());
	console.log("$location.absUrl(): " + $location.absUrl());
}