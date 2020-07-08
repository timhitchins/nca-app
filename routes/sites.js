import { addPDIToFeatures } from "../utils/dataUtils";
import { fetchPermitData } from "../utils/fetchUtils";
import Router from "express-promise-router";
export const router = new Router();

// Example URI
// http://localhost:5000/api/location//%7B%22lon%22:-122.643154,%22lat%22:45.55659%7D/500/meters
router.get("/:coords/:radius/:units/:years", async (req, res) => {
  const coords = JSON.parse(req.params.coords);
  const { radius, units, years } = req.params;

  // await the feature service fetch
  //errors return an error message object
  try {
    //fetch GeoJSON
    const permitGeoJSON = await fetchPermitData(coords, radius, units, years);
    // //generate PDI
    const pdiGeoJSON = addPDIToFeatures(permitGeoJSON);
    // respond with completed data
    res.json(pdiGeoJSON);
  } catch (err) {
    res.json({ message: err });
  }
});
