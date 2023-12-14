class GamePad {
    constructor() {
        this.keyList = [];
        this.init();
    }

    init() {
        window.addEventListener('keydown', this.onKeyPressed.bind(this));
        window.addEventListener('keyup', this.onKeyReleased.bind(this));
    }

    onKeyPressed(event) {
        const { key } = event;
        const relevantKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (relevantKeys.includes(key) && !this.keyList.includes(key)) {
            this.keyList.push(key);
        }
    }

    onKeyReleased(event) {
        const { key } = event;
        const index = this.keyList.indexOf(key);
        if (index > -1) {
            this.keyList.splice(index, 1);
        }
    }

    getKeyList() {
        return this.keyList;
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeyPressed.bind(this));
        window.removeEventListener('keyup', this.onKeyReleased.bind(this));
        this.keyList = [];
    }
}

export { GamePad };
