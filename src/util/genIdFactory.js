var genIdFactory = function () {
  var id = 0;
  return function () {
    return id++;
  };
};

export default genIdFactory;
