angular.module('storyService',[])

.factory('Story',function($http){
	
	var storyFactory = {};

	storyFactory.create = function(storyData){

		return $http.post('api/',storyData);

	}


	storyFactory.getAllStories = function(){

		return $http.get('api/');

	}

	return storyFactory;
})

.factory('socketIo', function($rootScope){
	var socket = io.connect();
	return {
		on : function(eventName, callBack){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callBack.apply(socket,args);

				});
			});
		},

		emit : function(eventName, data, callBack){
			socket.emit(eventName, data,  function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callBack)
						callBack.apply(socket,args);

				});
			});
		}

	}
})