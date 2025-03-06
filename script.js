document.getElementById('generate').addEventListener('click', generatePoster);

function generatePoster() {
    const canvas = document.getElementById('posterCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const bgIndex = Math.floor(Math.random() * 5) + 1;
    const imgIndex = Math.floor(Math.random() * 16) + 1;
    const textIndex = Math.floor(Math.random() * 10) + 1;
    
    const bg = new Image();
    bg.src = `assets/backgrounds/${bgIndex}.png`;
    bg.onload = () => {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        
        const img = new Image();
        img.src = `assets/image/${imgIndex}.png`;
        img.onload = () => {
            ctx.drawImage(img, 225, 480, 1080, 1080);
            
            fetch(`assets/text/${textIndex}.txt`)
                .then(response => response.text())
                .then(text => {
                    ctx.fillStyle = 'black';
                    ctx.font = '40px "Press Start 2P"';
                    ctx.fillText(text, 100, 200);
                });
        };
    };
}
