const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = [
    
    'rgba(255,255,255,0.5',
   'rgba(255,255,255,0.8)'
   /*
    'rgba(173,216,230,0.8)',
    'rgba(211,211,211,0.8'*/
];
const maxSize = 60;
const minSize = 0;
const mouseRadius = 100;

let mouse = {
    x: null,
    y: null
};
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    //console.log(mouse);
})
setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
      
    }
    update(){
        if(this.x + this.size * 2 > canvas.width || 
            this.y - this.size * 2 < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y + this.size * 2 > canvas.height ||
            this.y - this.size * 2 < 0) {
                this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        // mouse interactivity
        if (mouse.x - this.x < mouseRadius
            && mouse.x - this.x > -mouseRadius
            && mouse.y - this.y < mouseRadius
            && mouse.y - this.y > -mouseRadius) {
                if (this.size < maxSize) {
                    this.size +=3;
                }
            } else if (this.size > minSize) {
                this.size -= 0.5;
            }
         if (this.size < 0) {
                this.size = 0;
            }
            
    }

}

function init(){
    particlesArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}
init();
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    console.log(window.innerHeight, window.innerWidth)
})

window.addEventListener('scroll', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    console.log(window.innerHeight)
})