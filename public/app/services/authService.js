var myApp = angular.module('authService',[]);
myApp.factory('Auth', function($http, $q, AuthToken){

	var authFactory = {};

	authFactory.login =  function(username, password){

		return $http.post('/api/login', {
			username : username,
			password : password

		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		})

	}


	authFactory.logout = function(){
		AuthToken.setToken();
	}

	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken())
		{
			return true;
		}
		else{
			return false;
		}
	}

	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.get('/api/me');
		}
		else{
			return $q.reject({ message : "User doesn't have a token"});
		}
	}

	return authFactory;

})

myApp.factory('AuthToken',function($window){

	var authTokenFactory = {};

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}
	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token', token);
	}

	return authTokenFactory;

})


myApp.factory('AuthInterceptor',function($q, $location, AuthToken){

	var authInterceptorFactory = {};

	authInterceptorFactory.request = function(config){
		var token = AuthToken.getToken();

		if(token){
			config.headers['x-access-token'] = token;
		}

		return config;

	}

	authInterceptorFactory.responseError = function(response){

		if(response.status == 403)
			$location.path('/login');
		return $q.reject(response);


	}

	return authInterceptorFactory;

})
