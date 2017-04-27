define(function (require,exports,module){
	require("jquery");
	require("easyui")($);
	var addressMange = require("addressMange");
	var hotFilms=require("hotFilms");
	var infoMes=require("infoMes");
	var movieMange=require("movieMange");
	var userManage=require("userManage");

	$('#tt').tree({
		onClick: function(node){
			if (node.id == "user") {
                userManage.showUser();
			}else if (node.id == "infoMes") {
				infoMes.showTab();
			}else if (node.id == "movieMange") {
				movieMange.showTab();
			}else if (node.id == "addressMange") {
				addressMange.addressMange();
			}else if (node.id == "maMatch") {
				addressMange.addressMange();
			}else if (node.id == "movieHot") {
				hotFilms.show();
			}else if (node.id == "movieSoon") {
				addressMange.addressMange();
			}else if (node.id == "movieHotPlay") {
				addressMange.addressMange();
			}
		}
	});

});