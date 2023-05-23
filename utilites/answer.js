function answer(data, code = 200) {
  return {
    status: "success",
    code,
    data,
  };
}

module.exports = {
  answer,
};
