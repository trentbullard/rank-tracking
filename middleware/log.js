export default ({ method, url, params, query, body }, _, next) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  console.log(`  params: `, params);
  console.log(`  query: `, query);
  console.log(`  body: `, body);
  next();
};