$(document).ready(function(e) {
    
		$("#panel_right").animate({width:"0px"},"fast",function(e){
			$(this).hide();
		});
		

		$("#right_menubar").mouseenter(function(e){
			$("#panel_right").stop();
			$("#panel_right").show();
				$("#panel_right").animate({width:"275px"},"slow");	
		});
		$("#panel_right").mouseenter(function(e){
			$("#panel_right").stop();
			$("#panel_right").show();
				$("#panel_right").animate({width:"275px"},"slow");	
		});
		
		$("#panel_right").mouseleave(function(e){
			$("#panel_right").stop();
		$("#panel_right").animate({width:"0px"},"slow",function(e){
			$(this).hide();
		});
		});
	
});