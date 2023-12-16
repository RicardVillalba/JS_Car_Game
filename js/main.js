import { GameApp } from './modules/GameApp.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameApp = new GameApp('.js-track', '.js-car', '.js-lives');
    
    document.getElementById('retryButton').addEventListener('click', () => {
        gameApp.restartGame();
    });
});



