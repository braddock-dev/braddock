export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development" &&
    process.env.IS_MOCK === "true"
  ) {
    const { server } = await import("./mocks/node");
    server.listen();
    console.log("Server listening on mock server", [process.env.NODE_ENV]);
  }
}
