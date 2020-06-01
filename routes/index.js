import {router as api} from "./api";

const mountRoutes = (app) => {
  app.use("/api/location", api);
};

export default mountRoutes;
