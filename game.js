var game = { };

var fillCircle = function(x, y, radius)
{
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
};

var clearCircle = function(x, y, radius)
{
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(x - radius - 1, y - radius - 1,
                      radius * 2 + 2, radius * 2 + 2);
};

game.fps = 60;

game.run = (function() {
    game.player = new Player();
    var loops = 0, skipTicks = 1000 / Game.fps,
    maxFrameSkip = 10,
    nextGameTick = (new Date).getTime();
  
    return function {
    loops = 0;
    
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    game.draw();
};
})();

game.draw = function(interpolation) {
    game.player.draw(Game.context);
    this.context.clearCircle(0, 0, 640);

    for (var i=0; i < this.entities.length; i++) {
        this.entities[i].draw(this.context, interpolation);
  }
};

game.update = function() {
    
    game.player.update();
    
}

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
        game.player.moveLeft();
    break;

    case 38: // Up
        game.player.moveUp();
    break;

    case 39: // Right
        game.player.moveRight();
    break;

    case 40: // Down
        game.player.moveDown();
    break;
    
    case 65: //A - left
        game.player.moveLeft();
    break;
          
    case 87: //W - up
        game.player.moveUp();
    break;
          
    case 68: //D - right
        game.player.moveRight();
    break;

    case 83: //S - down
        game.player.moveDown();
    break;
  }
}, false);

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);



Game._intervalId = setInterval(Game.run, 0);

clearInterval(Game._intervalId);