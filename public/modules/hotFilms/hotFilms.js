define(function(require,exports,c){
	exports.show = function(){
		//选项卡
		$('#layoutRight').tabs('add',{    
		    title:'热映电影',    
		    id:"hotFilms_part",    
		    closable:true    
		});  
		//增删功能
		$('#hotFilms_part').load('modules/hotFilms/hotFilms.html',function(){
			$("#hotFilms_table").datagrid({
			url:'/hotFilms/find',
			pagination:true, 
		    singleSelect:false,
		    pageSize:10,
		    pageList:[5,10,20,30],
		    idField:'_id', 
		    columns:[[    
		        {field:'name',title:'中文名',width: 100,editor:{
		        	type:'text',
		        	options:{}
		        }},    
		        {field:'eName',title:'英文名',width: 100,editor:{
		        	type:'text',
		        	options:{}
		        }},    
		        {field:'type',title:'类型',width: 60,editor:{
		        	type:'text',
		        	options:{}
		        }},
		        {field:'area',title:'区域',width: 60,editor:{
		        	type:'text',
		        	options:{}
		        }},
		         {field:'age',title:'年代',width: 60,editor:{
		        	type:'text',
		        	options:{}
		        }},
		         {field:'time',title:'时长',width: 60,editor:{
		        	type:'text',
		        	options:{}
		        }},
		         {field:'release',title:'上映时间',width: 80,editor:{
		        	type:'text',
		        	options:{}
		        }},
		         {field:'upArea',title:'上映区域',width: 80,editor:{
		        	type:'text',
		        	options:{}
		        }},
		         {field:'money',title:'票房',width: 60,editor:{
		        	type:'numberbox',
		        	options:{}
		        }},
		         {field:'desc',title:'剧情简介',width: 100,editor:{
		        	type:'text',
		        	options:{}
		        }}  
		    	]],
	    	toolbar:[{
	    		iconCls:'icon-add',
	    		text:"添加",
	    		handler:add
	    	},'-',{
	    		iconCls:'icon-remove',
	    		text:"删除",
	    		handler:remove
	    	}]
			});
		});	
		//增加
		function add(){
			$("#hotFilms_div").dialog("open");
		}
		//删除
		function remove(){
			var selectOptions = $("#hotFilms_table").datagrid('getChecked');
			var ids = [];
			for(var i = 0;i < selectOptions.length;i++){
				ids.push(selectOptions[i]._id);
			}
			$.ajax({
				type:"POST",
				url:"/hotFilms/del",
				data:{ids:JSON.stringify(ids)},
				success:function(data){
					if(data == "ok"){
						$('#hotFilms_table').datagrid('reload');
					}
				}
			});
		}
		$("#hotFilms_div").dialog({
	        title:"增加",
	        closable:true,
	        closed: true,
	        cache: false,
	        modal: true,
	        buttons:[{
	            text:'添加',
	            handler:function(){
	                $('#hotFilms_form').submit();
	            }
	        },{
	            text:'关闭',
	            handler:function(){
	                $("#hotFilms_div").dialog("close");
	            }
	        }]
	    });
	    $('#hotFilms_form').form({
	        url:"/hotFilms/add",
	        novalidate:true,
	        success:function(data){
	            $("#hotFilms_div").dialog("close");
	            $("#hotFilms_table").datagrid('reload');
	        }
	    }); 
		
	}
});