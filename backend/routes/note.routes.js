import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addnote,
  deletenote,
  fetchallnotes,
  updatenote,
  fetchonenote,
} from "../controllers/note.controller.js";
const router = Router();

// route- http://localhost:8002/api/v1/note/fetchallnotes
router.route("/fetchallnotes").get(verifyJWT, fetchallnotes);

// route- http://localhost:8002/api/v1/note/addnote
router.route("/addnote").post(verifyJWT, addnote);

// route- http://localhost:8002/api/v1/note/updatenote/:id
router.route("/updatenote/:id").put(verifyJWT, updatenote);

// route- http://localhost:8002/api/v1/note/deletenote/:id
router.route("/deletenote/:id").delete(verifyJWT, deletenote);

// route- http://localhost:8002/api/v1/note/fetchonenote/:id
router.route("/fetchonenote/:id").get(verifyJWT, fetchonenote);
export default router;
