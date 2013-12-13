Road = {}

Road.onStarts = [];

Road.gameStart = function() {}
Road.gameUpdate = function() {}

Road.init = function(params) {
  Road.logger = new Road.Logger(params.logger);
  Road.keyboard = new Road.Keyboard(params.keyboard);
  Road.mouse = new Road.Mouse(params.mouse);
  Road.library = new Road.Library(params.library);

  Road.clock = new THREE.Clock();

  Road.renderer = new THREE.WebGLRenderer(params.renderer);
  Road.scene = new THREE.Scene();
  Road.camera = new THREE.PerspectiveCamera(
    params.camera.fov,
    window.innerWidth / window.innerHeight,
    params.camera.near,
    params.camera.far
  )

  Road.camera.position.x = 1;
  Road.camera.position.y = 5;
  Road.camera.position.z = -5;
  Road.camera.lookAt(new THREE.Vector3(0, 0, 0));

  Road.controls = new THREE.OrbitControls(Road.camera);

  Road.domElement = params.road.domElement;
  Road.domElement.appendChild(Road.renderer.domElement);

  Road.fps = 0;
  Road.frame = 0;
  Road.delta = 0;

  Road.handlers = {};
  Road.registerEvents();
  Road.handlers.windowResize();

  Road.start();
  Road.library.loadPreloads();

  Road.play = true;
  Road.gameStarted = false;

  Road.update();
}

Road.onStart = function(call) {
  Road.onStarts.push(call);
}

Road.start = function() {
  console.log( Road.onStarts.length)
  for(var i = 0; i < Road.onStarts.length; i++) {
    var start = Road.onStarts[i];

    start();
  }
}

Road.update = function() {
  if(Road.play) {
    requestAnimationFrame(Road.update);
  }

  Road.frame += 1;
  Road.delta = Road.clock.getDelta();

  Road.keyboard.update(Road.delta);
  Road.mouse.update(Road.delta);
  Road.controls.update();

  if(Road.gameStarted) {
    Road.gameUpdate(Road.delta);
  }

  Road.renderer.render(Road.scene, Road.camera);
}

Road.setGameStart = function(object, method) {
  Road.gameStart = function() {
    method.call(object);
  }
}

Road.setGameUpdate = function(object, method) {
  Road.gameUpdate = function(delta) {
    method.call(object, delta);
  }
}

Road.pause = function() {
  Road.play = false;
}

Road.resume = function() {
  Road.play = true;

  requestAnimationFrame(Road.update);
}

Road.registerEvents = function() {
  Road.handlers.keyboardKeyChange = function(event) {
    Road.keyboard.setKeyState(event);
  }

  Road.handlers.mouseButtonChange = function(event) {
    Road.mouse.setButtonState(event);
  }

  Road.handlers.mousePositionChange = function(event) {
    Road.mouse.setPosition(event);
  }

  Road.handlers.windowResize = function(event) {
    var width = Road.domElement.offsetWidth;
    var height = Road.domElement.offsetHeight;

    Road.renderer.setSize(width, height);

    Road.camera.aspect = width / height;
    Road.camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', this.handlers.windowResize);

  document.addEventListener('keydown', Road.handlers.keyboardKeyChange);
  document.addEventListener('keyup', Road.handlers.keyboardKeyChange);
  document.addEventListener('mousedown', Road.handlers.mouseButtonChange);
  document.addEventListener('mouseup', Road.handlers.mouseButtonChange);
  document.addEventListener('mousemove', Road.handlers.mousePositionChange);
}