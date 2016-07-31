var MyApp = angular.module('MyApp', ['mainCtrl', 'authService', 'appRoutes', 'userCtrl', 'userService', 'storyCtrl', 'storyService','reverseDirective'])

.config(function ($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');
})
