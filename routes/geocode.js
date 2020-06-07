import { fetchGeocodeData } from "../utils/fetchUtils";
import Router from "express-promise-router";
export const router = new Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mbJSON = await fetchGeocodeData(id);
    res.json(mbJSON);
  } catch (err) {
    res.json({ message: err });
  }
});
