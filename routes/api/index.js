const router = require("express").Router();
const userRoutes = require("./user_routes");
const thoughtRoutes = require("./thought_routes");

router.use("/users", userRoutes); // /api/users
router.use("/thoughts", thoughtRoutes); // api/thoughts

module.exports = router;