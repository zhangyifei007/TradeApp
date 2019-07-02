import * as express from "express";
import { User } from "./user";

const router = express.Router();

router.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

User(router);

export default router;
