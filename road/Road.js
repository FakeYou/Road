Road = {}

Road.init = function(params) {
  Road.logger = new Road.Logger(params.logger);
  Road.keyboard = new Road.Keyboard(params.keyboard);
  Road.mouse = new Road.Mouse(params.mouse);

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

  Road.play = true;

  Road.populate();

  Road.update();
}

Road.populate = function() {
  var ambient = new THREE.AmbientLight( 0x101030 );
  Road.scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 2, 1, -1 );
  Road.scene.add( directionalLight );

  Road.car = new Car(Road.scene);

  Road.axis = new THREE.AxisHelper(64);
  Road.scene.add(Road.axis);
}

Road.update = function() {
  if(Road.play) {
    requestAnimationFrame(Road.update);
  }
  Road.frame += 1;
  Road.delta = Road.clock.getDelta();

  Road.car.update(Road.delta);

  Road.keyboard.update(Road.delta);
  Road.mouse.update(Road.delta);
  Road.controls.update();

  Road.renderer.render(Road.scene, Road.camera);
}

Road.stop = function() {
  Road.play = false;
}

Road.start = function() {
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