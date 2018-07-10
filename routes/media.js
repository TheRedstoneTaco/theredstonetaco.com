var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var User         = require('../models/user.js');
var Media = require('../models/media.js');
var middleware = require("../middleware/index.js");

module.exports = router;