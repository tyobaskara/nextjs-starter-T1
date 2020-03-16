/**
 * Used on server/routes/index.js
 */

exports.testPost = (req, res) => {
  res.status(200).json(req.body);
};

exports.testGet = (req, res) => {
  res.status(200).send({
    success: 'success'
  })
};
