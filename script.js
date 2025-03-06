@font-face {
    font-family: 'ZI_SQUARE';
    src: url('assets/fonts/ZI_SQUARE.ttf') format('truetype');
}

body {
    background-color: black;
    color: white;
    font-family: 'ZI_SQUARE', sans-serif;
    text-align: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

button {
    font-size: 16px;
    padding: 10px 20px;
    margin: 10px;
    border: 2px solid white;
    background: black;
    color: white;
    cursor: pointer;
    font-family: 'ZI_SQUARE', sans-serif;
}

.image-container {
    position: relative;
    width: 500px;
    height: 500px;
    overflow: hidden; /* Обрезка всего, что выходит за границы */
    border: 4px solid white;
}

canvas {
    max-width: 100%;
    height: auto;
}
