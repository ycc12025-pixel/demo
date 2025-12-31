// === HAVAİ FİŞEK SİSTEMİ ===
const fwCanvas = document.createElement("canvas");
const fwCtx = fwCanvas.getContext("2d");
document.body.appendChild(fwCanvas);

fwCanvas.style.position = "fixed";
fwCanvas.style.top = 0;
fwCanvas.style.left = 0;
fwCanvas.style.pointerEvents = "none";
fwCanvas.style.zIndex = 20;

function resizeFW(){
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
resizeFW();
window.addEventListener("resize", resizeFW);

class Firework {
  constructor(){
    this.x = Math.random() * fwCanvas.width;
    this.y = fwCanvas.height;
    this.targetY = Math.random() * fwCanvas.height * 0.5;
    this.color = `hsl(${Math.random()*360},100%,60%)`;
    this.exploded = false;
    this.particles = [];
  }

  update(){
    if(!this.exploded){
      this.y -= 8;
      if(this.y <= this.targetY){
        this.exploded = true;
        for(let i=0;i<40;i++){
          this.particles.push({
            x:this.x,
            y:this.y,
            vx:(Math.random()-0.5)*6,
            vy:(Math.random()-0.5)*6,
            life:60
          });
        }
      }
    } else {
      this.particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      });
    }
  }

  draw(){
    fwCtx.fillStyle = this.color;
    if(!this.exploded){
      fwCtx.fillRect(this.x,this.y,3,3);
    } else {
      this.particles.forEach(p=>{
        fwCtx.globalAlpha = p.life/60;
        fwCtx.fillRect(p.x,p.y,3,3);
      });
      fwCtx.globalAlpha = 1;
    }
  }

  done(){
    return this.exploded && this.particles.every(p=>p.life<=0);
  }
}

let fireworks = [];
let fwStartTime = 0;

function animateFW(){
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);

  if(Math.random() < 0.08){
    fireworks.push(new Firework());
  }

  fireworks.forEach(f=>{
    f.update();
    f.draw();
  });

  fireworks = fireworks.filter(f=>!f.done());

  if(Date.now() - fwStartTime < 5000){
  requestAnimationFrame(animateFW);
} else {
  fwCanvas.remove();

  // 🔊 Müzik başla
  if (typeof startMusic === "function") startMusic();

  // 🎄 Ağaç animasyonu başla
  gsap.globalTimeline.play();

  // 🎉 Final mesaj
  gsap.to("#endMessage", {
    opacity: 1,
    duration: 2,
    delay: 3
  });
}


// === DIŞARIDAN ÇAĞRILAN FONKSİYON ===
function startFireworks(){
  fwStartTime = Date.now();
  animateFW();
}


document.getElementById("startBtn").onclick = ()=>{
  document.getElementById("startBtn").remove();
  startFireworks();
};
document.getElementById("startBtn").onclick = ()=>{
  document.getElementById("startBtn").remove();
  startFireworks();
};

console.log("firework.js yüklendi");
