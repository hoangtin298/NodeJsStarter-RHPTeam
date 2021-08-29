const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();

const UserController = require("../controllers/user");

const {
  schemas,
  validateParams,
  validateBody,
} = require("../helpers/routerHelper");

router
  .route("/")
  .get(UserController.index)
  .post(validateBody(schemas.userSchema), UserController.newUser);

router
  .route(`/:userID`)
  .get(UserController.getUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser);

router
  .route("/:userID/decks")
  .get(validateParams(schemas.idSchema, "userID"), UserController.getUserDecks)
  .post(UserController.newUserDecks);

module.exports = router;
