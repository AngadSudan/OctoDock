import Docker from "dockerode";
const docker = new Docker();
export default async function startPostgresContainer() {
  try {
    const container = await docker.createContainer({
      Image: "postgres",
      name: "octadocktest",
      Env: [
        "POSTGRES_USER=root",
        "POSTGRES_PASSWORD=root",
        "POSTGRES_DB=testing",
      ],
      HostConfig: {
        PortBindings: {
          "5432/tcp": [{ HostPort: "5432" }],
        },
      },
    });

    await container.start();
    console.log("PostgreSQL container started.");
  } catch (err) {
    console.error("Error:", err);
  }
}
