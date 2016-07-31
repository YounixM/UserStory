angular.module('storyCtrl',['storyService'])

.controller('StoryController', function(Story, socketIo){
	
	 var vm = this;
	 Story.getAllStories()
	 	.success(function(data){
	 		vm.stories = data;

	 	})

	 vm.createStory = function(){
		
		Story.create(vm.storyData)
			.success(function(data){

				vm.storyData = '';

				vm.message = data.message;
				vm.stories.push(data);
			});
	 };

	 socketIo.on('story', function(data){
	 		vm.stories.push(data); 
	 })

})
