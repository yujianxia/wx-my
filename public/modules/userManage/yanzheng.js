
	//扩展easyui表单的验证
	$.extend($.fn.validatebox.defaults.rules, {
		//用户名
		ACC: {
			validator: function (value) {
				var reg = /^\w{2,8}$/;
				return reg.test(value);
			},
			message: '输入2-8位用户名'
		},
		//手机号
		TEL: {
			validator: function (value) {
				var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
				return reg.test(value);
			},
			message: '输入11位正确手机号码'
		},
		//密码
		PWD: {
			validator: function (value) {
				var reg = /^\d{6,12}$/;
				return reg.test(value);
			},
			message: '输入6-12位密码'
		},
		//确认密码
		
    equals: {    
        validator: function(value,rpwdId){    
            return value == $("#rpwdId").val();    
alert(2);
        },    
        message: '两次密码不一致'   
    } ,   

		//邮箱
		EMAIL: {
			validator: function (value) {
				var reg =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				return reg.test(value);
			},
			message: 'xxx@xx.xx格式'
		},
		//出生日期
		BIRTH: {
			validator: function (value) {
				var reg = /^[0-9]{4}-[1-12]{1,2}-[1-31]{1,2}$/;
				return reg.test(value);
			},
			message: 'xxxx-xx-xx格式  如:1996-03-23'
		}
 
  
});  

