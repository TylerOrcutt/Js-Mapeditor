var canvas_width=512;
var canvas_height=384;
var spritesheet_canvas_width=320;
var spritesheet_canvas_height=384;

var camera={x:0,y:0};

var tool="cursor";
var layer="ground"; //ground scenery objects

var bg=new Image();
bg.src="bg.jpg";

var sp1 = new Image();
sp1.src="spritesheets/sp2.png";

var blkimg = new Image();
blkimg.src="grass1.png"

var blockedimg= new Image();
blockedimg.src="blocked.png";
var block = function(x,y,imgx,imgy){
	this.x=x;
	this.y=y;
	this.img=sp1;
	this.imgx=imgx;
	this.imgy=imgy;
	this.blocked=false;
}	
var ground=[]; // array of ground blocks -s 
var scenery=[]; //array of scenery blocks
var objects=[];//array  of object blocks
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
		//canvas.addEventListener("keydown",canvas_keydown,true);
		//canvas.addEventListener("keyup",canvas_keyup,false);
		
		spritesheet_canvas.width=spritesheet_canvas_width;
		spritesheet_canvas.height=spritesheet_canvas_height;
		spritesheet_canvas.addEventListener("click",spritesheet_canvas_click,false);
		var sp_selected={x:0,y:0};
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
	draw_grid(ctx,canvas_height,canvas_width);
	

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
			if(ground[i].blocked==true){
ctx.drawImage(blockedimg,0,0,32,32,ground[i].x-camera.x,ground[i].y-camera.y,32,32);	
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
 }else{

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
 }
}
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
$("img[id=tool_cursor]").click(function(e){
	//console.log("Tool switched to cursor");
	tool="cursor";
});

$("input[name=export]").click(function(e){
	
});
});
