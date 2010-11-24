var FunctionalIndex = function(transform_function) {  
  this.transform_function = transform_function;
  this.records = [];
  this.map = {};
};

module.exports.open = function(transform_function) {
  return new FunctionalIndex(transform_function);
};

FunctionalIndex.prototype.put = function(key, value, pos, length) {
  var transformed = this.transform_function(value);
  if (transformed) {
    var newRecord = {
      r: transformed,
      p: pos,
      l: length
    };
    var pos = this.map[key];
    if (pos) {
      records[pos] = newRecord;
    } else {
      this.map[key] = this.records.length;
      this.records.push(newRecord);
    }
  }
};

FunctionalIndex.prototype.filter = function(filter_function, callback, null_on_not_found){
  var not_found = true;
  this.records.forEach(function(record) {
    if (record && filter_function(record.r)) {
      not_found = false;
      callback(record.p, record.l);
    };
  });
  if (null_on_not_found && not_found) {
    callback(null);
  }
};