export function errorHandler(res, { msg, status } = {}) {
  res.status(status || 500).send({ message: msg || "Serverside error" });
}
