define(function(require, exports, module) {
	exports.showUser = function() {
		// 点击出现选项卡页面
		$('#layoutRight').tabs('add',{    
			title:'用户管理',   
			closable:true,
			id:'layoutRightUse'
		});


	     $("#layoutRightUse").load("modules/userManage/userManage.html",function(){
			initTable();
			initSearch();
			initDialog();
			initTableTool();
        });
	     var editFlag; // 编辑标记

	     	// 初始化基本表格
	function initTable(searchObj) {
		$('#mainTable').datagrid({
			url: '/user',
			fitColumns: true,
			striped: "true", 
			pagination: true,
			singleSelect: false,
			idField: '_id',
			pageSize: 10,
			pageList: [10, 20, 30, 40, 50],
			columns: [
				[{
					field: 'acc',
					title: '用户名',
					width: 16,
					editor: {
						type: 'text',
						option: {}
					}
				}, {
					field: 'tel',
					title: '电话',
					width: 12,
					editor: {
						type: 'textnumberbox',
						option: {}
					}
				}, {
					field: 'email',
					title: '邮箱',
					width: 12,
					editor: {
						type: 'text',
						option: {}
					}
				}, {
					field: 'birth',
					title: '出生年月',
					width: 22,
					editor: {
						type: 'text',
						option: {}
					}
				}]
			],

		});
	}

	// 初始化工具条
	function initTableTool() {
		$('#mainTable').datagrid({
			toolbar: [{
				iconCls: 'icon-add',
				text: '增加',
				handler: table_add
			}, '-', {
				iconCls: 'icon-remove',
				text: '删除',
				handler: table_del
			}, '-', {
				iconCls: 'icon-edit',
				text: '修改',
				handler: table_edit
			}, '-', {
				iconCls: 'icon-save',
				text: '保存',
				handler: table_save
			}]
		});
	}

	// 点击“编辑”按钮
	function table_edit() {
		var rows = $('#mainTable').datagrid('getChecked');
		// 只选中一行，进入编辑
		if(rows.length == 1) {
			if(editFlag != undefined) {
				// 非undefine状态，关闭编辑状态
				$('#mainTable').datagrid('endEdit', editFlag);
			} else if(editFlag == undefined) {
				var index = $('#mainTable').datagrid('getRowIndex', rows[0]);
				$('#mainTable').datagrid('beginEdit', index);
				editFlag = index;
			}
		}
	}

	// 点击“保存”按钮
	function table_save() {
		// 退出编辑状态
		$('#mainTable').datagrid('endEdit', editFlag);
		editFlag = undefined;
		// var selectRow = $('#mainTable').datagrid('getChecked')[0];
		var selectRow = $('#mainTable').datagrid('getChecked')[0];
		console.log(selectRow)
		$.ajax({
			type: 'POST',
			url: '/user/update',
			data: selectRow,
			success: function(data) {
				$.messager.alert('操作', '修改成功');
			}
		});
		// 退出选中状态
		$('#mainTable').datagrid('clearChecked');
	}

	// 删除
	function table_del() {

		var ids = [];
		var names = [];
		var selectedItems = $('#mainTable').datagrid('getChecked'); // 被选中的object数组
		for(var i = 0; i < selectedItems.length; i++) {
			ids.push(selectedItems[i]._id);
			names.push(selectedItems[i].name)
		}

		console.log(names)

		$.messager.confirm('确认', '您确认想要删除 ' + names + ' ' + names.length + '条记录吗？', function(r) {
			if(r) {
				$.ajax({
					type: 'POST',
					url: '/user/del',
					data: {
						allId: JSON.stringify(ids)
					},
					success: function(data) {
						if(data == 'delSuccess') {
							$('#mainTable').datagrid('reload');
						}
					}
				});
			}
		});
	}

	// 初始化增加事件的弹框
	function table_add() {
		$('#infoBoxForm input').val('');
		// 放置弹框内表单跳转
		$('#infoBoxForm').form({
			url: '/user/add',
			novalidate: false,
			success: function(data) {
				if(data == 'success') {
					$('#stusTable').datagrid('reload');
					$('#infoBox').dialog('close');
				}
			}
		});
		$('#infoBox').dialog('open');
	}

	// 初始化搜索栏
	function initSearch() {
		var search = {
				"acc": $('#searchAcc').val(),
				"tel": $('#searchTel').val()
			};
		
		$('#searchBtn').click(function() {
			
			$.ajax({
				type: 'POST',
				url: '/user/find',
				data: search,
				success: function(data) {
					$('#mainTable').datagrid('loadData', data);
				}
			});
		});
	}
       //清空输入框的值
		$('#clearBtn').click(function() {
	        $("#_easyui_textbox_input1").val("");
			$("#_easyui_textbox_input2").val(" ");
			$("#mainTable").datagrid("load", {});
		
		});
	
	

	// 初始化“增加”弹框
	function initDialog() {
		$('#infoBox').dialog({
			title: '增加',
			closable: true,
			closed: true,
			cache: false,
			modal: true,
			buttons: [{
				text: '提交',
				handler: function() {
					//提交表单
					$('#infoBoxForm').submit();
				}
			}, {
				text: '关闭',
				handler: function() {
					$("#infoBox").dialog('close');
				}
			}]
		});
	}


	}
});