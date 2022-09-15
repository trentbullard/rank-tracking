export default ({ method, url, params, query, body, headers }, res, next) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  console.log(JSON.stringify({ params, query, body, headers }, null, 2));
  next();
};
