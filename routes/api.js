import { createBuffer, createArcGISGeometry } from "../utils/dataUtils";
import Router from "express-promise-router";
export const router = new Router();

// Example
// http://localhost:5000/api/location//%7B%22lon%22:-122.643154,%22lat%22:45.55659%7D/1/miles
router.get("/:coords/:radius/:units", async (req, res) => {
  const coords = JSON.parse(req.params.coords);
  const { radius, units } = req.params;

  const searchBuffer = createBuffer(coords, radius, units);
  const arcGeometryObject = createArcGISGeometry(searchBuffer);
  
  
  
  
  res.json(arcGeometryObject);
});
