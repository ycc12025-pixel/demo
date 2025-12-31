const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position="fixed";
canvas.style.top=0;
canvas.style.left=0;
canvas.style.pointerEvents="none";
canvas.style.zIndex=5;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener("resize",resize);
const flakes=[];
for(let i=0;i<150;i++)flakes.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1,d:Math.random()+0.5});
(function anim(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="rgba(255,255,255,.8)";
ctx.beginPath();
for(const f of flakes){
 ctx.moveTo(f.x,f.y);
 ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
 f.y+=f.d;
 if(f.y>canvas.height){f.y=-10;f.x=Math.random()*canvas.width}
}
ctx.fill();
requestAnimationFrame(anim);
})();