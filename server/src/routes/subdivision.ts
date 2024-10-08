import { Router } from "express";
import {
  test,
  getAllSubdivisions,
  getFilteredSubdivisions,
} from "../controllers/subdivisions";

const router = Router();

router.get("/test", test);
router.get("/all", getAllSubdivisions);
router.get("/filtered", getFilteredSubdivisions);

export default router;
