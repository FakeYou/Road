Road.Sound = function(source, params) {
  this.defaults = {
    extensions: [],
    volume: 1,
    loop: false,
    radius: 100,
    position: new THREE.Vector3()
  }

  Road.Base.call(this, params);

  this.source = source;

  this.audio = document.createElement('audio');
  this.audio.volume = this.volume;
  this.audio.loop = this.loop;


  for(var i = 0; i < this.extensions.length; i++) {
    var extension = this.extensions[i];
    var source = document.createElement('source');

    source.src = this.source + '.' + extension;
    source.type = 'audio/' + extension;
    console.log(source);

    this.audio.appendChild(source);
  }
}

Road.Sound.prototype = Object.create(Road.Base.prototype);

Road.Sound.prototype.update = function(delta) {
  var distance = this.position.distanceTo(Road.camera.position);

  if(distance <= this.radius) {
    this.setVolume(this.volume * (1 - distance / this.radius ));
  }
  else {
    this.setVolume(0);
  }
}

Road.Sound.prototype.play = function() {
  this.audio.play();
}

Road.Sound.prototype.pause = function() {
  this.audio.pause();
}

Road.Sound.prototype.start = function() {
  this.audio.currentTime = 0;
  this.play();
}

Road.Sound.prototype.stop = function() {
  this.pause();
  this.audio.currentTime = 0;
}

Road.Sound.prototype.getVolume = function() {
  return this.audio.volume;
}

Road.Sound.prototype.setVolume = function(volume) {
  this.audio.volume = volume;
}

Road.Sound.prototype.getLoop = function() {
  return this.audio.loop;
}

Road.Sound.prototype.setLoop = function(loop) {
  this.audio.loop = loop;
}