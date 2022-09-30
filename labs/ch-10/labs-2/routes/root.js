"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    let ip =
      request.ip || request.remoteAddress || request.socket.remoteAddress;

    if (ip === "111.34.55.211") throw fastify.httpErrors.forbidden();

    return { root: true };
  });
};
