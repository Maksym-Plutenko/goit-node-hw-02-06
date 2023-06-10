const { answer } = require("./answer");

const wrapper = async (func) => {
  const foo = async (req, res, next) => {
    const id = req.params.contactId;
    
    try {
        const contactById = await func(id);
        if (contactById) {
          res.json(answer(contactById, 200));
        } else {
          res.status(404).json({ message: "Not found" });
        }
      } catch (err) {
        console.log(err);
        next(err);
      }
  }

  return foo;
};

module.exports = {
  wrapper,
};
