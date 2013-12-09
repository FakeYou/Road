Road.Mouse = function() {
  this.buttons = {};

  this.position = {
    screen: new THREE.Vector2(),
    world: new THREE.Vector3()
  };

  this.movement = new THREE.Vector2();

  //this.projector = new THREE.Projecter();
}

Road.Mouse.LEFT = 0;
Road.Mouse.MIDDLE = 1;
Road.Mouse.RIGHT = 2;

Road.Mouse.prototype.update = function(delta) {
  for(var index in this.buttons) {
    var button = this.buttons[index];

    if(button.state === 'mousedown') {
      button.pressed = true;
      button.hold += delta;
      button.hit = button.state !== button.previousState;
    }
    else {
      button.lift = button.state !== button.previousState;
      button.pressed = false;
      button.hit = false;
      button.hold = 0;
    }

    button.previousState = button.state;
  }
}

Road.Mouse.prototype.setButtonState = function(event) {
  var button = this.buttons[event.button];

  if(typeof button !== 'undefined') {
    button.state = event.type;
    button.alt = event.altKey;
    button.shift = event.shiftKey;
    button.ctrl = event.ctrlKey;
  }
}

Road.Mouse.prototype.setPosition = function(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  this.movement.x = x - this.position.screen.x;
  this.movement.y = y - this.position.screen.y;

  this.position.screen.x = x;
  this.position.screen.y = y;
}

Road.Mouse.prototype.getButton = function(button) {
  if(typeof this.buttons[button] === 'undefined') {
    this.buttons[button] = {
      state: 'mouseup',
      hold: 0,
      hit: false,
      lift: false,
      pressed: false,
      alt: false,
      shift: false,
      ctrl: false
    }
  }

  return this.buttons[button];
}