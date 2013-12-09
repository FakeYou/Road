Road.Keyboard = function() {
  this.keys = {};
}

Road.Keyboard.SPACE = 32;
Road.Keyboard.ENTER = 13;
Road.Keyboard.TAB = 9;
Road.Keyboard.ESC = 27;
Road.Keyboard.BACKSPACE = 8;

Road.Keyboard.SHIFT = 16;
Road.Keyboard.CTRL = 17;
Road.Keyboard.ALT = 18;

Road.Keyboard.LEFT = 37;
Road.Keyboard.UP = 38;
Road.Keyboard.RIGHT = 39;
Road.Keyboard.DOWN = 40;

Road.Keyboard.A = 65;
Road.Keyboard.W = 87;
Road.Keyboard.D = 68;
Road.Keyboard.S = 83;

Road.Keyboard.prototype.update = function(delta) {
  for(var index in this.keys) {
    var key = this.keys[index];

    if(key.state === 'keydown') {
      key.pressed = true;
      key.hold += delta;
      key.hit = key.state !== key.previousState;
    }
    else {
      key.lift = key.state !== key.previousState;
      key.pressed = false;
      key.hit = false;
      key.hold = 0;
    }

    key.previousState = key.state;
  }
}

Road.Keyboard.prototype.setKeyState = function(event) {
  var key = this.keys[event.keyCode]

  if(key) {
    key.state = event.type;
    key.alt = event.altKey;
    key.shift = event.shitKey;
    key.ctrl = event.ctrlKey;
  }
}

Road.Keyboard.prototype.getKey = function(key) {
  if(typeof this.keys[key] === 'undefined') {
    this.keys[key] = {
      state: 'keyup',
      hold: 0,
      hit: false,
      lift: false,
      pressed: false,
      alt: false,
      shift: false,
      ctrl: false
    }
  }

  return this.keys[key];
}