Road.Logger = function(params) {
  var defaults = {
    level: Road.Logger.WARN
  };

  this.params = _.assign(defaults, params);

  this.level = this.params.level;
}

Road.Logger.DEBUG = 0;
Road.Logger.LOG   = 1;
Road.Logger.INFO  = 2;
Road.Logger.WARN  = 3;
Road.Logger.ERROR = 4;
Road.Logger.NONE  = 5;

Road.Logger.prototype.debug = function() {
  if(this.level <= Road.Logger.DEBUG) {
    console.debug.apply(console, arguments);
  }
}

Road.Logger.prototype.log = function() {
  if(this.level <= Road.Logger.LOG) {
    console.log.apply(console, arguments);
  }
}

Road.Logger.prototype.info = function() {
  if(this.level <= Road.Logger.INFO) {
    console.info.apply(console, arguments);
  }
}

Road.Logger.prototype.warn = function() {
  if(this.level <= Road.Logger.WARN) {
    console.warn.apply(console, arguments);
  }
}

Road.Logger.prototype.error = function() {
  if(this.level <= Road.Logger.ERROR) {
    console.error.apply(console, arguments);
  }
}