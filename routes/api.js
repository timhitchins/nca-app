import { createBuffer, createArcGISGeometry, addPDIToFeatures } from "../utils/dataUtils";
import { fetchPermitData } from "../utils/fetchUtils";
import Router from "express-promise-router";
export const router = new Router();

// Example URI
// http://localhost:5000/api/location//%7B%22lon%22:-122.643154,%22lat%22:45.55659%7D/1/miles
router.get("/:coords/:radius/:units", async (req, res) => {
  // "/:coords/:radius/:units"
  const coords = JSON.parse(req.params.coords);
  const { radius, units } = req.params;

  // create the search feature
  const searchBuffer = createBuffer(coords, radius, units);
  const arcGeometryObject = JSON.stringify(createArcGISGeometry(searchBuffer));
  // await the feature service fetch
  //errors return an error message object
  try {
    const data = await fetchPermitData(arcGeometryObject);
    const pdiData = addPDIToFeatures(data)

    // new data here
    res.json(pdiData);
  } catch (err) {
    res.json({ message: err });
  }

});
