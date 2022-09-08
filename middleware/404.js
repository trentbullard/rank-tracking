export default ({ url }, res, next) => {
  res.status(404).json({ error: `${url} not found` });
};