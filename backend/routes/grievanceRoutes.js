const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const g = require("../controllers/grievanceController");

router.post("/grievances", auth, g.create);
router.get("/grievances", auth, g.getAll);

router.get("/grievances/search", auth, g.search);
router.get("/grievances/:id", auth, g.getById);

router.put("/grievances/:id", auth, g.update);
router.delete("/grievances/:id", auth, g.delete);

module.exports = router;