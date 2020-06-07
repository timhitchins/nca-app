import {router as api} from "./sites";

const mountRoutes = (app) => {
  app.use("/api/location", api);
};

export default mountRoutes;
