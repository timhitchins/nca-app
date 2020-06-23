import { router as sites } from "./sites";
import { router as search } from "./geocode";
import { router as attributes } from "./attributes";
import { router as data } from "./geojson";

const mountRoutes = (app) => {
  app.use("/api/location", sites);
  app.use("/api/search", search);
  app.use("/api/attributes", attributes);
  app.use("/api/geojson", data);
};

export default mountRoutes;
