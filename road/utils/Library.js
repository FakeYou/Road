Road.Library = function(params) {
  var self = this;

  this.defaults = {
    onProgress: function() {},
    onLoad: function() {}
  }

  Road.Base.call(this, params);

  this.manager = new THREE.LoadingManager();

  this.manager.onProgress = this.onProgress;
  this.manager.onLoad = this.onReady;

  this.ImageLoader = new THREE.ImageLoader(this.manager);
  this.OBJLoader = new THREE.OBJLoader(this.manager);

  this.files = {};
  this.preloads = [];
}

Road.Library.prototype = Object.create(Road.Base.prototype);

Road.Library.prototype.get = function(file) {
  return this.files[file];
}

Road.Library.prototype.load = function(file) {
  // This regex is used to find the extension of the file
  var regex = /\.[a-zA-Z]+$/;
  var extension = file.match(regex)[0].substring(1).toLowerCase();

  if(extension == 'png' || extension == 'gif' || extension == 'jpg') {
    this.loadImage(file);
  }

  if(extension == 'obj') {
    this.loadOBJ(file);
  }
}

Road.Library.prototype.loadImage = function(file) {
  var self = this;

  this.ImageLoader.load(file, function(image) {
    self.files[file] = image;
  });
}

Road.Library.prototype.loadOBJ = function(file) {
  var self = this;

  this.OBJLoader.load(file, function(object) {
    self.files[file] = object;
  });
}

Road.Library.prototype.loadPreloads = function() {
  for(var i = 0; i < this.preloads.length; i++) {
    var preload = this.preloads[i];

    this.load(preload);
  }
}

Road.Library.prototype.preload = function(file) {
  if(this.preloads.indexOf(file) == -1) {
    this.preloads.push(file);
  }
}