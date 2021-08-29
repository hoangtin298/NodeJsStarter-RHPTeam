/**
 * We can interact with mongoose in three different ways:
 * - Callback
 * - Promise
 * - Async/await (Promise)
 */
const User = require("../models/User");
const Deck = require("../models/Deck");

const index = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json({ message: "Created success", data: newUser });
};

const getUser = async (req, res, next) => {
  const { userID } = req.value.params;
  const user = await User.findById(userID);
  return res.status(200).json({ message: "Get Success", user });
};

const updateUser = async (req, res, next) => {
  // enforce new user to old user
  const { userID } = req.value.params;
  const result = await User.findByIdAndUpdate(userID, req.body);
  return res.status(200).json({ message: "Updated", user: result });
};

const replaceUser = async (req, res, next) => {
  // number of filed
  const { userID } = req.value.params;
  const result = await User.findByIdAndUpdate(userID, req.body);
  return res.status(200).json({ message: "Updated", user: result });
};

const getUserDecks = async (req, res, next) => {
  const { userID } = req.value.params;
  // Get user
  const user = await User.findById(userID).populate("decks");
  return res.status(200).json({ decks: user.decks });
};

const newUserDecks = async (req, res, next) => {
  const { userID } = req.value.params;
  // Create a new deck
  const newDeck = new Deck(req.body);
  // Get user
  const user = await User.findById(userID);
  // Assign user as a deck
  newDeck.owner = user;
  // Save the deck
  await newDeck.save();
  // Add deck to user
  user.decks.push(newDeck._id);
  // Save the user
  await user.save();

  return res.status(201).json({ newDeck });
};

module.exports = {
  index,
  newUser,
  getUser,
  updateUser,
  replaceUser,
  getUserDecks,
  newUserDecks,
};
