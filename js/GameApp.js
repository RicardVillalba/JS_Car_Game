import { Car } from './Car.js'; 
import { GamePad } from './GamePad.js'; 
import { INIT_LIVES, FRAME_RATE, TRACK_SIZE } from './consts/consts.js'; 

class GameApp {
    constructor(trackSelector, carSelector, livesSelector) {
        this.trackDom = document.querySelector(trackSelector);
        this.carDom = document.querySelector(carSelector);
        this.livesDom = document.querySelector(livesSelector);
        this.car = new Car(this.carDom);
        this.lives = INIT_LIVES;
        this.keypad = new GamePad();
        this.tick = null;
        this.#init();
    }

    #init() {
        this.lives = INIT_LIVES;
        this.livesDom.textContent = this.lives;
        this.car.reset();
        this.keypad.init();
        this.#startGameLoop();
    }

    #startGameLoop() {
        this.tick = setInterval(() => {
            this.#render();
        }, FRAME_RATE);
    }

    #render() {
        const keysPressed = this.keypad.getKeyList();
        this.car.update(keysPressed);

        if (!this.#isCarInBounds()) {
            this.#crash();
        }
    }

    #isCarInBounds() {
        const carRect = this.carDom.getBoundingClientRect();
        const trackRect = this.trackDom.getBoundingClientRect();

        return carRect.left >= trackRect.left &&
               carRect.right <= trackRect.right &&
               carRect.top >= trackRect.top &&
               carRect.bottom <= trackRect.bottom;
    }

    #crash() {
        this.lives -= 1;
        this.livesDom.textContent = this.lives;

        if (this.lives <= 0) {
            setTimeout(() => {
                this.#finish();
            }, 0);
        } else {
            this.car.reset();
        }
    }

    #finish() {
        clearInterval(this.tick);
        this.keypad.destroy();
        document.getElementById('gameOverPopup').classList.add('show');
    }

    restartGame() {
        this.lives = INIT_LIVES;
        this.livesDom.textContent = this.lives;
        this.car.reset();
        this.keypad.init();
        this.#startGameLoop();
        document.getElementById('gameOverPopup').classList.remove('show');
    }
}

export { GameApp };
