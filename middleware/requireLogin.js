module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401) //sets HTTP response status
      .send({ error: 'You must log in!' })
  }

  next()
}
