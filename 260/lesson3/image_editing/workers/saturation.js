onmessage = function(e) {
  var data = e.data.image_data.data,
      rate = e.data.rate,
      s = +rate * -.01,
      max,
      saturate = function(val) {
        return val === max ? 0 : (max - val) * s;
      };

  for (var i = 0, len = data.length; i < len; i += 4) {
    max = Math.max(data[i], data[i + 1], data[i + 2]);
    data[i] += saturate(data[i]);
    data[i + 1] += saturate(data[i + 1]);
    data[i + 2] += saturate(data[i + 2]);
  }
  
  postMessage(e.data.image_data);
}