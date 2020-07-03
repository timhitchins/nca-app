import { fetchTotalAttributeData } from "../utils/fetchUtils";
import { calculateAttributeTotals } from "../utils/dataUtils";
import Router from "express-promise-router";
export const router = new Router();

router.get("/:attributes/:years", async (req, res) => {
  const { attributes, years } = req.params;

  // await the feature service fetch
  //errors return an error message object
  try {
    //fetch JSON
    const atttributesJSON = await fetchTotalAttributeData(attributes, years);
    const totalsJSON = calculateAttributeTotals(atttributesJSON, "pjson");
    // respond with totals data
    res.json(totalsJSON);
  } catch (err) {
    res.json({ message: err });
  }
});
