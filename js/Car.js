import { SPEED_LIMIT, SPEED_UP, SPEED_DOWN, SPEED_INERTIA, TURN_AMOUNT } from './consts/consts.js';
import { Trigonometry } from './utils/trigonometry.js';

class Car {
    constructor(carDom) {
        this.carDom = carDom;
        this.speed = 0;
        this.angle = 0;
        this.x = 0; // Posición x inicial del coche
        this.y = 0; // Posición y inicial del coche
    }

    reset() {
        this.speed = 0;
        this.angle = 0;
        this.x = 0; // Restablece la posición x
        this.y = 0; // Restablece la posición y
        this.updatePosition();
    }

    update(keyList) {
        this.updateSpeed(keyList);
        this.updateAngle(keyList);
        this.move();
    }

    updateSpeed(keyList) {
        if (keyList.includes('ArrowUp')) {
            this.speed = Math.min(this.speed + SPEED_UP, SPEED_LIMIT);
        } else if (keyList.includes('ArrowDown')) {
            this.speed = Math.max(this.speed - SPEED_DOWN, -SPEED_LIMIT);
        } else {
            this.speed *= SPEED_INERTIA; // Reduce la velocidad gradualmente
        }
    }

    updateAngle(keyList) {
        if (keyList.includes('ArrowLeft')) {
            this.angle -= TURN_AMOUNT;
        } else if (keyList.includes('ArrowRight')) {
            this.angle += TURN_AMOUNT;
        }
    }

    move() {
        const radianAngle = Trigonometry.toRadians(this.angle);
        const deltaX = this.speed * Math.cos(radianAngle);
        const deltaY = this.speed * Math.sin(radianAngle);

        // Acumula el movimiento
        this.x += deltaX;
        this.y += deltaY;

        this.updatePosition();
    }

    updatePosition() {
        // Aplica la posición acumulada y la rotación
        this.carDom.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
    }
}

export { Car };
