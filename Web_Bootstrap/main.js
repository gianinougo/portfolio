const app = document.getElementById('typewriter');


const typewriter = new Typewriter(app, {
    loop: true,
    delay: 75
});

typewriter
.typeString('La millor terreta del mon')
.pauseFor(200)
.start();