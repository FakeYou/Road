Road.Entity = function(parent) {
  this.parent = parent || Road.scene;

  Object.defineProperty(this, 'position', {
    get: function() { return this.mesh.position; },
    set: function(position) { this.mesh.position = position; }
  });

  Object.defineProperty(this, 'rotation', {
    get: function() { return this.mesh.rotation; },
    set: function(rotation) { this.mesh.rotation = rotation; }
  });

  Object.defineProperty(this, 'scale', {
    get: function() { return this.mesh.scale; },
    set: function(scale) { this.mesh.scale = scale; }
  })
}

Road.Entity.prototype.getParent = function() {
  return this.parent;
}

Road.Entity.prototype.setParent = function(parent) {
  this.parent = parent;
}