Road.Base = function(params) {
  this.defaults = this.defaults || [];
  var params = params || [];

  var options = _.assign(this.defaults, params);

  for(var i in options) {
    this[i] = options[i];
  }
}