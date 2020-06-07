import { router as sites } from "./sites";
import { router as search } from "./geocode";

const mountRoutes = (app) => {
  app.use("/api/location", sites);
  app.use("/api/search", search);
};

export default mountRoutes;
