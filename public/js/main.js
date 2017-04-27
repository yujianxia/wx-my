define(function(require,exports,module) {
	// 引入类库
	require('jquery');
	require('easyui')($);

	// 引入modules
	var user = require('user');


	// nav 点击事件绑定
	$('#user').on('click',userClick);


	// 定义各个点击事件
	function userClick() {
		user.execute();
	}

	
});