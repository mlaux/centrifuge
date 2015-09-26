/**
 * Created by Trent on 9/26/2015.
 */

// unorganized variables
var canvas = null;
var ctx = null;
var time = Date.now();

var Constants = new StaticConstants();
var Game = new StaticGame();
var Graphics = new StaticGraphics();
var Logic = new StaticLogic();
var StateManager = new StaticStateManager();
var TitleScreen = new StaticTitleScreen();

var resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
};

var loop = function() {
    var delta = (Date.now() - time) / 20;
    time = Date.now();

    var state = StateManager.getState();
    state.update(delta);
    state.render();
};

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    resize();
    setInterval(loop, 15);

    TitleScreen.init();
};
window.onresize = resize;