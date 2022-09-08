export default ({ method, url, params, query, body }, res, next) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  const output = JSON.stringify({ params, query, body }, null, 2);
  console.log(output);
  next();
};