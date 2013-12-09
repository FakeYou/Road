Road.Entity = function(parent) {
  this.parent = parent || Road.scene;

  Object.defineProperty(this, 'position', {
    get: function() { return this.mesh.position; },
    set: function(position) { this.mesh.position = position; }
  });
}

Road.Entity.prototype.getParent = function() {
  return this.parent;
}

Road.Entity.prototype.setParent = function(parent) {
  this.parent = parent;
}