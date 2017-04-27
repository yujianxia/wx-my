define(function(require,exports,module){


	//接收
	require('jquery');
	require('easyui')($);

  //表单不做跳转操作
    $('#loginBut').form({
        url:"/user_login",
        novalidate:true,
        success:function(data){
            $("#add_board").dialog("close");
            $("#main_table").datagrid('reload');
        }
    });

	

	//清空输入内容
	$('#emptyBut').click(function(){
		$('input').val('');
	});






















});
