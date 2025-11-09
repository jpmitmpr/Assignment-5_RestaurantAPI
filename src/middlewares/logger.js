function requestLogger(req, _res, next) {
  const { method, originalUrl, body } = req;
  const timestamp = new Date().toISOString();

  const common = `[${timestamp}] ${method} ${originalUrl}`;
  if (method === 'POST' || method === 'PUT') {
    console.log(`${common} | body: ${JSON.stringify(body)}`);
  } else {
    console.log(common);
  }
  next();
}

module.exports = { requestLogger };
