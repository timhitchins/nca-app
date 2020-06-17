import { router as sites } from "./sites";
import { router as search } from "./geocode";
import { router as attributes } from "./attributes";
const mountRoutes = (app) => {
  app.use("/api/location", sites);
  app.use("/api/search", search);
  app.use("/api/attributes", attributes);
};

export default mountRoutes;
