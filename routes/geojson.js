import { fetchBoundaryData } from "../utils/fetchUtils";
import { pdxBoundaryURI } from "../config/dataConfig";
import Router from "express-promise-router";
export const router = new Router();

router.get("/pdx-boundary", async (req, res) => {
  try {
    const boundaryJSON = await fetchBoundaryData(pdxBoundaryURI);
    res.json(boundaryJSON);
  } catch (err) {
    res.json({ message: err });
  }
});
