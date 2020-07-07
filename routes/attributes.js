import { fetchTotalAttributeData } from "../utils/fetchUtils";
import { calculateAttributeTotals } from "../utils/dataUtils";
import Router from "express-promise-router";
export const router = new Router();

//route that gets fired when app mounts the first time
router.get("/:attributes/:years/:coords/:radius/:units", async (req, res) => {
  const { attributes, years, coords, radius, units } = req.params;

  // await the feature service fetch
  //errors return an error message object
  try {
    //fetch JSON
    const atttributesJSON = await fetchTotalAttributeData(
      attributes,
      years,
      JSON.parse(coords),
      radius,
      units
    );
    const totalsJSON = calculateAttributeTotals(atttributesJSON);

    // respond with totals data
    res.json(totalsJSON);
  } catch (err) {
    res.json({ message: err });
  }
});
