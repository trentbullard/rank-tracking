export default ({ method, url, params, query, body, headers: { authorization } }, res, next) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  console.log(JSON.stringify({ params, query, body, authorization }, null, 2));
  next();
};
