import { createRouteHandler } from "uploadthing/next";
import { operatorImageFileRoute } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: operatorImageFileRoute,
});
