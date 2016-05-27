var canvas_width=512;
var canvas_height=384;
var spritesheet_canvas_width=320;
var spritesheet_canvas_height=384;

var camera={x:0,y:0};
var mousedown=false;


var tool="cursor";
var layer="ground"; //ground scenery objects



var sp1 = new Image();
sp1.src="spritesheets/sp2.png";



var blockedimg= new Image();
blockedimg.src="images/blocked.png";
var Spawnimg= new Image();
Spawnimg.src="images/spawn.png";
var redflagimg= new Image();
redflagimg.src="images/redflag.png";
var blueflagimg= new Image();
blueflagimg.src="images/blueflag.png";
var block = function(x,y,imgx,imgy){
	this.x=x;
	this.y=y;
	this.img=sp1;
	this.imgx=imgx;
	this.imgy=imgy;
	this.blocked=false;
	this.spawnPoint=false;
	this.redflag=false;
	this.blueflag=false;
this.isteleport=false;
this.teleporttomap="";
this.teleportloc_x=0;
this.teleportloc_y=0;
}
var ground=[]; // array of ground blocks -s
var layer2=[]; //array of scenery blocks
var layer3=[];//array  of object blocks
$(document).ready(function(e) {
    var canvas=document.getElementById('canvas');
	var spritesheet_canvas=document.getElementById('spritesheet_canvas');

		var ctx=canvas.getContext('2d');
		var sctx=spritesheet_canvas.getContext('2d');

		 document.body.appendChild(canvas);
		document.body.appendChild(spritesheet_canvas);

		canvas.width=canvas_width;
		canvas.height=canvas_height;
		canvas.addEventListener("click",canvas_click,false);
		canvas.addEventListener("mousedown",canvas_mousedown,false);
		canvas.addEventListener("mouseup",canvas_mouseup,false);
		canvas.addEventListener("mousemove",canvas_mousemove,false);
		canvas.addEventListener("mouseout",canvas_mouseout,false);
		//canvas.addEventListener("keydown",canvas_keydown,true);
		//canvas.addEventListener("keyup",canvas_keyup,false);

		spritesheet_canvas.width=spritesheet_canvas_width;
		spritesheet_canvas.height=spritesheet_canvas_height;
		spritesheet_canvas.addEventListener("click",spritesheet_canvas_click,false);
		var sp_selected={x:0,y:0};
		var canvas_selected={x:0,y:0};
	window.setInterval(main_loop,1000/32);

function main_loop(){
	render();
}
function render(){
ctx.beginPath();
//ctx.drawImage(bg,0,0,canvas_width,canvas_height);
	ctx.clearRect(0,0,canvas_width,canvas_height);
	draw_blocks();

	draw_blocked();
	draw_Spawn();
	draw_flags();
	if($("input[name=drawgrid]").is(":checked")){

	draw_grid(ctx,canvas_height,canvas_width);
	}
	if(tool=="cursor"){
	draw_canvas_selected();
	}
	ctx.closePath();
//sprite_sheet_canvas


	sctx.beginPath();
	sctx.clearRect(0,0,spritesheet_canvas_width,spritesheet_canvas_height);
	sctx.drawImage(sp1,0,0);

	draw_grid(sctx,spritesheet_canvas_height,spritesheet_canvas_width);
	draw_selected();
	sctx.closePath();
}


function draw_blocks(){
for (var i=0;i<ground.length;i++){
	if(ground[i].x>camera.x-32 && ground[i].x<camera.x+canvas_width){
		if(ground[i].y>camera.y-32&& ground[i].y<camera.y+canvas_height){ //ONLY render blocks within camera view
ctx.drawImage(ground[i].img,ground[i].imgx,ground[i].imgy,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);
		}}
}
}

function draw_blocked(){
for (var i=0;i<ground.length;i++){
	if(ground[i].x>camera.x-32 && ground[i].x<camera.x+canvas_width){
		if(ground[i].y>camera.y-32&& ground[i].y<camera.y+canvas_height){ //ONLY render blocks within camera view
			if(ground[i].blocked==true || ground[i].blocked=="true" ){
ctx.drawImage(blockedimg,0,0,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);
			}
		}}
}
}
function draw_Spawn(){
for (var i=0;i<ground.length;i++){
	if(ground[i].x>camera.x-32 && ground[i].x<camera.x+canvas_width){
		if(ground[i].y>camera.y-32&& ground[i].y<camera.y+canvas_height){ //ONLY render blocks within camera view
			if(ground[i].spawnPoint==true || ground[i].spawnPoint=="true" ){
ctx.drawImage(Spawnimg,0,0,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);
			}
		}}
}
}
function draw_flags(){
for (var i=0;i<ground.length;i++){
	if(ground[i].x>camera.x-32 && ground[i].x<camera.x+canvas_width){
		if(ground[i].y>camera.y-32&& ground[i].y<camera.y+canvas_height){ //ONLY render blocks within camera view
			if(ground[i].redflag==true || ground[i].redflag=="true" ){
ctx.drawImage(redflagimg,0,0,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);
			}
			if(ground[i].blueflag==true || ground[i].blueflag=="true" ){
ctx.drawImage(blueflagimg,0,0,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);
			}
		}}
}
}


function draw_selected(){
	sctx.strokeStyle='blue';
	sctx.lineWidth=3;
	//sctx.moveTo(0,0);
	//sctx.rect(0,0,32,32);
	sctx.strokeRect(sp_selected.x,sp_selected.y,32,32);

}
function draw_canvas_selected(){
	ctx.strokeStyle='blue';
	ctx.lineWidth=3;
	//sctx.moveTo(0,0);
	//sctx.rect(0,0,32,32);
	ctx.strokeRect(canvas_selected.x-camera.x,canvas_selected.y-camera.y,32,32);

}
function draw_grid(ct,height,width){
	ct.strokeStyle='black';
	ct.lineWidth=1;
for(var i=32;i<=width-32;i+=32){
	ct.moveTo(i,0);
	ct.lineTo(i,height);
	ct.stroke();
}
for(var i=32;i<=height-32;i+=32){
	ct.moveTo(0,i);
	ct.lineTo(width,i);
	ct.stroke();
}
}

//INPUTS
 $(document).keydown(function(key){
if(key.keyCode==83){

camera.y+=32;
}
if(key.keyCode==87){

camera.y-=32;
}
if(key.keyCode==68){

camera.x+=32;
}
if(key.keyCode==65){

camera.x-=32;
}
	//console.log(key.keyCode);

});
// Mouse Inputs
function canvas_mouseout(e){
mousedown=false;
}
function canvas_mousedown(e){
 mousedown=true;
}
function canvas_mouseup(e){
mousedown=false;
}

function canvas_mousemove(e){

if(mousedown){
	canvas_click(e);
}

}

function canvas_click(e){
	var x;
    var y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft +
           document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
           document.documentElement.scrollTop;
    }
	x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
	var cblkx=0;
	var cblky=0;
	for(var i=0;i<canvas_width;i+=32){
		if(x>=i &&x<(i+32)){
			cblkx=i; break;
		}
	}
	for(var i=0;i<canvas_height;i+=32){
		if(y>=i &&y<(i+32)){
			cblky=i; break;
		}
	}
cblkx-=camera.x*-1;
	cblky-=camera.y*-1;
	//console.log(x + ":" + y);
	//console.log(cblkx + ":" + cblky);

 if(tool=="blocked"){
	 for(var i=0;i<ground.length;i++){
		if(cblkx==ground[i].x && cblky==ground[i].y){ if(ground[i].blocked==true){ground[i].blocked=false;}else{ ground[i].blocked=true;} break;}
	}
	}else if(tool=="spawn"){
		 for(var i=0;i<ground.length;i++){
			if(cblkx==ground[i].x && cblky==ground[i].y){ if(ground[i].spawnPoint==true){ground[i].spawnPoint=false;}else{ ground[i].spawnPoint=true;} break;}
		 }
	 }else if(tool=="redflag"){
			for(var i=0;i<ground.length;i++){
			 if(cblkx==ground[i].x && cblky==ground[i].y){ if(ground[i].redflag==true){ground[i].redflag=false;}else{ ground[i].redflag=true;} break;}
			}
		}else if(tool=="blueflag"){
			 for(var i=0;i<ground.length;i++){
				if(cblkx==ground[i].x && cblky==ground[i].y){ if(ground[i].blueflag==true){ground[i].blueflag=false;}else{ ground[i].blueflag=true;} break;}
			 }
 }else if(tool=="brush"){

//check if block exists
var block_exist=false;
	for(var i=0;i<ground.length;i++){
		if(ground[i].x ==cblkx && ground[i].y==cblky){
		ground[i].imgx=sp_selected.x;
		ground[i].imgy=sp_selected.y;
		//console.log("block: " + cblkx + ","+ cblky + " image changed.");
		block_exist=true;
		break;
		}
	}
	if(!block_exist){
 var blk = new block(cblkx,cblky,sp_selected.x,sp_selected.y);
	ground.push(blk);
	}
	//console.log(blocks);
 }else{

	 for(var i=0;i<ground.length;i++){
		if(ground[i].x ==cblkx && ground[i].y==cblky){
	 canvas_selected.x=cblkx;
	 canvas_selected.y=cblky;
	 var iwin="Block Posistion: X:" + ground[i].x + "Y: "+ ground[i].y + "<br>"
	 +"Blocked: "+ground[i].blocked;
	 if(ground[i].isteleport){
		iwin=iwin+"<br>Teleport:  <input type=checkbox checked=CHECKED name='istele'/> <br />";
	 }else{
		iwin=iwin+"<br>Teleport:  <input type=checkbox  name='istele'/> <br />";
	 }
	 iwin=iwin+ "Teleport To Map: <input type=text name=tmap>.txt<br>";
	 iwin=iwin+ "Teleport coords: X<input type=text name=coordx> <br><span style='text-align:right'>Y:<input type=text name=coordy></span>";
	 iwin=iwin+ "<input type=button name=btnapply value=Apply>";
	//document.body.appendChild($("input[name=btnapply]"));
	 $("#inspectwin").html(iwin);
		break;
		}
	}
 }
}
//
$("input[name=btnapply]").click(function(e){
console.log("Apply button click");
});



function spritesheet_canvas_click(e){
	var x;
    var y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft +
           document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
           document.documentElement.scrollTop;
    }
	x -= spritesheet_canvas.offsetLeft;
    y -= spritesheet_canvas.offsetTop;
	var cblkx=0;
	var cblky=0;
	for(var i=0;i<spritesheet_canvas_width;i+=32){
		if(x>=i &&x<(i+32)){
			cblkx=i; break;
		}
	}
	for(var i=0;i<spritesheet_canvas_height;i+=32){
		if(y>=i &&y<(i+32)){
			cblky=i; break;
		}
	}
	sp_selected.x=cblkx;
	sp_selected.y=cblky;
}

$("img[id=tool_blocked]").click(function(e){
	//console.log("Tool switched to blocked");
	tool="blocked";

});
$("img[id=tool_Spawn]").click(function(e){
	console.log("Tool switched to spawn point");
	tool="spawn";

});
$("img[id=tool_redflag]").click(function(e){
	console.log("Tool switched to redflag point");
	tool="redflag";

});
$("img[id=tool_blueflag]").click(function(e){
	console.log("Tool switched to blueflag point");
	tool="blueflag";

});
$("img[id=tool_cursor]").click(function(e){
	//console.log("Tool switched to cursor");
	tool="cursor";
});
$("img[id=tool_paintbrush]").click(function(e){
	//console.log("Tool switched to cursor");
	tool="brush";

});
$("input[name=export]").click(function(e){
	var data="";
	for(var i=0;i<ground.length;i++){
	data=data+"Newblock:posx="+ground[i].x + ";posy="+ground[i].y+ ";img=" + ";imgx="+ground[i].imgx + ";imgy="+ground[i].imgy+ ";blocked="+ground[i].blocked+";spawnPoint="+ground[i].spawnPoint+";\n";
	}
	  $.generateFile({
            filename	: 'map.txt',
            content		: data,
            script		: 'export.php'
        });

});
  $.generateFile = function(options){

        options = options || {};

        if(!options.script || !options.filename || !options.content){
            throw new Error("Please enter all the required config options!");
        }

        // Creating a 1 by 1 px invisible iframe:

        var iframe = $('<iframe>',{
            width:1,
            height:1,
            frameborder:0,
            css:{
                display:'none'
            }
        }).appendTo('body');

        var formHTML = '<form action="" method="post">'+
            '<input type="hidden" name="filename" />'+
            '<input type="hidden" name="content" />'+
            '</form>';

        // Giving IE a chance to build the DOM in
        // the iframe with a short timeout:

        setTimeout(function(){

            // The body element of the iframe document:

            var body = (iframe.prop('contentDocument') !== undefined) ?
                            iframe.prop('contentDocument').body :
                            iframe.prop('document').body;	// IE

            body = $(body);

            // Adding the form to the body:
            body.html(formHTML);

            var form = body.find('form');

            form.attr('action',options.script);
            form.find('input[name=filename]').val(options.filename);
            form.find('input[name=content]').val(options.content);

            // Submitting the form to download.php. This will
            // cause the file download dialog box to appear.

            form.submit();
        },50);
    };
//------------Import-----------//
$("input[name=import]").click(function(e){
	//clear blocks
	if($("input[name=fimport]").val()!=""){
	ground=[];
		var file=document.getElementById("fimport").files[0];
	if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {

   // console.log(evt.target.result);
   load_map(evt.target.result.toString());
	}
    reader.onerror = function (evt) {

	   console.log("error reading file");
    }
}
	}

});
function load_map(map){
	var keys=["posx=","posy=","imgx=","imgy=","blocked=","spawnPoint="];
	for(var i=0;i<=map.length;i++){
		if(map.substr(i,9)=="Newblock:"){
			i=i+9;
				var blk=new block();
				//console.log("New block");
					for(var n=i;n<=map.length && map.substr(n,9)!="Newblock:";n++){
					  for(var k=0;k<keys.length;k++){
						  if(map.substr(n,keys[k].length)==keys[k]){
							//Found key!
							//console.log("found key!");
							  var value="";
							  	for(v=n+keys[k].length;v<=map.length&&map[v]!=";";v++){
									value=value+map[v];
								}
								   if(keys[k].substr(0,keys[k].length-1)=="posx"){
									blk.x=value;
									//console.log(blk.x);
									}else if(keys[k].substr(0,keys[k].length-1)=="posy"){
										blk.y=value;
									}else if(keys[k].substr(0,keys[k].length-1)=="blocked"){
										if(value=="true"){
											blk.blocked=true;
										}
									}else if(keys[k].substr(0,keys[k].length-1)=="spawnPoint"){
										if(value=="true"){
											blk.spawnPoint=true;
										}
									}else{
								blk[keys[k].substr(0,keys[k].length-1)] =value;
								}

							}//end found key

					}//End Key Search
				}//END NB
				//console.log(blk.blocked);
		ground.push(blk);
	}//END NEW BLOCK
	}//MAIN LOOP


	}
});
