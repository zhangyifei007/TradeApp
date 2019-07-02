import { Router } from "express";

export const User = (router: Router) => {
  router.post('/login', (_req, res, next) => {
    res.status(200).send({code: 1, data: {token: 'ewercgrer'}})
    next();
  })
  router.post('/getCaptcha', (_req, res, next) => {
    res.status(200).send({code: 1, data: {}})
    next();
  })
}