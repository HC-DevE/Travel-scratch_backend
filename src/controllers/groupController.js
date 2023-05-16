const groupController = require("../controllers/groupController");
const authHandler = require("../middleware/authHandler");

router.get("/groups", authHandler ,groupController.getGroups);
router.post("/groups", authHandler ,groupController.createGroup);
router.post("/groups/:groupId/participants", authHandler ,groupController.addParticipantsToGroup);