define(function(require,exports,module){

	exports.addressMange = function(){
		// $("#layoutRight").load("modules/addressMange/addressMange.html",function(){

		// });
		//点击出现选项卡页面
		$('#layoutRight').tabs('add',{    
			title:'院线管理',   
			closable:true,
			href:"modules/addressMange/addressMange.html",
		});  

		

		
	}

});