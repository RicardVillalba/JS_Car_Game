import { Car } from './Car.js'; // Asegúrate de que el archivo Car.js esté implementado y en la ruta correcta
import { GamePad } from './GamePad.js'; // Asegúrate de que el archivo GamePad.js esté implementado y en la ruta correcta
import { INIT_LIVES, FRAME_RATE, TRACK_SIZE } from './consts/consts.js'; // Importa las constantes necesarias

class GameApp {
    constructor(trackSelector, carSelector, livesSelector) {
        this.trackDom = document.querySelector(trackSelector);
        this.carDom = document.querySelector(carSelector);
        this.livesDom = document.querySelector(livesSelector);
        this.car = new Car(this.carDom);
        this.lives = INIT_LIVES;
        this.keypad = new GamePad();
        this.tick = null;
        this.init();
    }

    init() {
        this.lives = INIT_LIVES;
        this.livesDom.textContent = this.lives;
        this.car.reset();
        this.keypad.init();
        this.startGameLoop();
    }

    startGameLoop() {
        this.tick = setInterval(() => {
            this.render();
        }, FRAME_RATE);
    }

    render() {
        const keysPressed = this.keypad.getKeyList();
        const { x, y } = this.car.update(keysPressed);

        if (!this.isCarInBounds(x, y)) {
            this.crash();
        }

        // Actualiza la interfaz del juego aquí si es necesario
    }

    isCarInBounds(x, y) {
        return x >= 0 && x <= TRACK_SIZE && y >= 0 && y <= TRACK_SIZE;
    }

    crash() {
        this.lives -= 1;
        this.livesDom.textContent = this.lives;
        if (this.lives <= 0) {
            this.finish();
        } else {
            this.car.reset();
        }
    }

    finish() {
        clearInterval(this.tick);
        this.keypad.destroy();
        alert('Game Over!'); // Puedes cambiar esto por una lógica de finalización de juego más elaborada
    }
}

export { GameApp };