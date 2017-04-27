define(function (require,exports,module){
	var editNum;
	var imgTJ="";
    var showTab=function(){
        $('#layoutRight').tabs('add',{    
		    title:'电影管理',       
		    closable:true,
		    id:"movieMagTab"    
        });

        $("#movieMagTab").load("modules/movieMange/movieMange.html",function(){
        	initSearchBox(); //初始搜素框
        	initTableData(); //初始化表格
        	$("#selSimg").on("click",initTP);
        	$("#selAimg").on("click",initTJ);
        	$("#addt").on("click",subTJ);

        })      
    }


    function initTP(){
	$(".pbtn11").click();
	$(".pbtn11").on("change",function(){
			var str=$(".pbtn11").val();
			$(".pbtn1").val(str);

	});

}


	function initTJ(){
	$(".pbtn22").click();
	$(".pbtn22").on("change",function(){
			var str=$(".pbtn22").val();
			$(".pbtn2").val(str);
	});	
	}



	function subTJ(){
		$('#addFormTJ').submit();
		$(".pbtn2").val("");
	}


   //初始搜素框函数
    function initSearchBox(){
		$('#smInput').searchbox({ 
		searcher:function(value,name){
		if(name=="name"){
			var findObj={name:value};
		}
		else if(name="type"){
			var findObj={type:value};			
		}
		$.ajax({
			type:'POST',
			url:'/films/find',
			data: findObj,
			success:function(data){
                    $("#movieMag").datagrid('loadData',data);
			}
		});
		}, 
		menu:'#smSelect', 
		prompt:'请输内容' 
		}); 
    }
  


 //创建初始化表格函数
	function initTableData(){
		$("#movieMag").datagrid({    
		method:'get',   
	    url:'/films/find',
	    rownumbers:true,
	    pagination:true,
	    autoRowHeight:false,
	    pageSize:10,
	    pageList:[5,10,15,20],
	    columns:[[    
	        {field:'name',title:'中文名',width:100,editor:{type:'text',options:{}}},    
	        {field:'eName',title:'英文名',width:100,editor:{type:'text'}},    
	        {field:'type',title:'类型',width:100,editor:{type:'text',options:{}}},    
	        {field:'area',title:'区域',width:100,align:'right',editor:{type:'text',options:{}}},    
	        {field:'age',title:'年代',width:100,align:'right',editor:{type:'numberbox'}},    
	        {field:'time',title:'时长',width:100,align:'right',editor:{type:'numberbox'}},      
	        {field:'release',title:'上映时间',width:100,align:'right',editor:{type:'numberbox'}},      
	        {field:'upArea',title:'上映地区',width:100,align:'right',editor:{type:'text'}},      
	        {field:'money',title:'票房',width:100,align:'right',editor:{type:'numberbox'}},      
	        {field:'desc',title:'剧情简介',width:100,align:'right',editor:{type:'text'}},
	        {field:'operate',title:'操作',width:100,align:'center',  
				        formatter:function(value, row, index){  
				        var str = '<button id="rowEdit" class="rowEdit"></button>';
				        return str;  
					}}     
		]],
		onLoadSuccess:function(data){  
		        $('.rowEdit').linkbutton({text:'编辑',plain:true,iconCls:'icon-save'});
		        $('.rowEdit').css("margin-top","-4px");
		        $(".rowEdit").on("click",function(){
		        	$("#movieMag").datagrid('endEdit', editNum);
			        editNum=undefined;
			        $('.rowEdit').linkbutton({text:'编辑',plain:true,iconCls:'icon-save'});
			        $('.rowEdit').css("margin-top","-4px");
		        });  
          } ,
		toolbar: [{
					iconCls: 'icon-add',
					handler: addDatapal
				},'-',{
					iconCls: 'icon-remove',
					handler: removeData
				}],
		onDblClickRow:function(index,field){
						if(editNum==undefined){
							$(this).datagrid('beginEdit', index);
							editNum=index;
						}						
					},
		onAfterEdit: function(index, row, changes){
			$.ajax({
					type:"post",
					url:"/films/update",
					data:row,
					success:function(data){
						alert("数据修改成功!");
					}
			});			
	      }
    });
           
}





function addDatapal(){
		// 表单不做跳转操作
	    $('#addForm').form({	        
	        url:'/upload',
	        novalidate:true,
	        success:function(data){
	        	console.log(data);
	        	var addobj={};
	        	var imgS=data;
	        	console.log(imgS);
	        	addobj.name=$("#addForm input:eq(0)").val();
	        	addobj.eName=$("#addForm input:eq(1)").val();
	        	addobj.age=$("#addForm input:eq(2)").val();
	        	addobj.time=$("#addForm input:eq(3)").val();
	        	addobj.release=$("#addForm input:eq(4)").val();
	        	addobj.upArea=$("#addForm input:eq(5)").val();
	        	addobj.money=$("#addForm input:eq(6)").val();
	        	addobj.desc=$("#addForm input:eq(7)").val();
	        	addobj.type=$("#addForm input:eq(8)").val();
	        	addobj.area=$("#addForm input:eq(9)").val();
	        	addobj.selSimg=imgS;
	        	console.log(addobj.selSimg);
	        	addobj.selAimg=imgTJ;
	        	console.log(addobj.selAimg);
    			$.ajax({
						type:'POST',
						url:'/films/add',
						data: addobj,
						success:function(data){
							console.log("werewr");
			                    $("#addPal").dialog("close");
					            $('#addForm input').val("");
					            $("#movieMag").datagrid('reload');
						}
					});
				}

	    });


	    // 表单不做跳转操作
	    $('#addFormTJ').form({
	        url:'/upload',
	        novalidate:true,
	        success:function(data){
	        	// console.log(data);
	        	imgTJ=imgTJ+data+",";
	        	// console.log(imgTJ);

	        }
	    });

		$("#addPal").dialog({    
		    title: '增加',    
		    width: 500,    
		    height: 500,    
		    closed: false,    
		    cache: false,       
		    modal: true ,
		    buttons:[{
				text:'Save',
				handler:function(){
					$('#addForm').submit();
				}
				
			},{
				text:'Close',
				handler:function(){
					$("#addPal input").val("");
					$("#addPal").dialog("close");
				}
			}]  
		});

		$('#addt').linkbutton({    
           iconCls: 'icon-add'   
        }); 
	}


function removeData(){
	var rowsData=$("#movieMag").datagrid('getChecked');
	console.log(rowsData);
	var ids=[];
	for(var i=0;i<rowsData.length;i++){
		ids.push(rowsData[i]._id)
	}
	$.ajax({
		type:'POST',
		url:'/films/del',
		data: {ids: JSON.stringify(ids)},
		success:function(data){
	      if(data == "suc"){
                //刷新表格数据
                $("#movieMag").datagrid('reload');
            }
		}	
	});
}






    exports.showTab=showTab;

});