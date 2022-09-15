export default ({ method, url, params, query, body }, res, next) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  console.log(JSON.stringify({ params, query, body }, null, 2));
  next();
};
