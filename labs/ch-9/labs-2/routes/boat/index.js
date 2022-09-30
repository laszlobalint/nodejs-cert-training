"use strict";
const { promisify } = require("util");
const { boat } = require("../../model");
const { uid } = boat;
const read = promisify(boat.read);
const create = promisify(boat.create);
const del = promisify(boat.del);

function hasOwnProperty(o, p) {
  return Object.prototype.hasOwnProperty.call(o, p);
}

function validateData(o) {
  var valid = o !== null && typeof o === "object";
  valid = valid && hasOwnProperty(o, "brand");
  valid = valid && hasOwnProperty(o, "color");
  valid = valid && typeof o.brand === "string";
  valid = valid && typeof o.color === "string";
  return (
    valid && {
      brand: o.brand,
      color: o.color,
    }
  );
}

function validateBody(o) {
  var valid = o !== null && typeof o === "object";
  valid = valid && hasOwnProperty(o, "data");
  valid = valid && o.data !== null && typeof o.data === "object";
  var data = valid && validateData(o.data);
  return (
    valid &&
    data && {
      data: data,
    }
  );
}

module.exports = async (fastify, opts) => {
  const { notFound, badRequest } = fastify.httpErrors;

  fastify.post("/", async (request, reply) => {
    const validated = validateBody(request.body);
    if (!validated) throw badRequest();
    const id = uid();
    await create(id, validated.data);
    reply.code(201);
    return { id };
  });

  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      await del(id);
      reply.code(204);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });
};
