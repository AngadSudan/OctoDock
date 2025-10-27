/**
 * contains docker-node or exec using which we
 * will be executing our docker build commands
 */
import { spawn, exec } from "child_process";

async function main() {
  const imageName = process.env.IMAGE_NAME ?? "default-image";
  const args = [
    "build",
    "-f",
    "/home/app/Dockerfile", // make sure this points to your actual Dockerfile
    "-t",
    `octodock92/${imageName}`,
    "/home/app/project",
  ];

  console.log(`Running: docker ${args.join(" ")}`);

  const child = spawn("docker", args, { stdio: "inherit" });

  child.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Build complete");
      console.log("continuing the build stage .... ");
      const dockerLogin = exec(`
          echo ${process.env.DOCKER_PASSWORD} | docker login -u octodock92 --password-stdin
        `);
      dockerLogin.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      dockerLogin.stderr.on("data", (data) => {
        console.error(data.toString());
      });

      dockerLogin.on("close", (code) => {
        if (code === 0) {
          const process = exec(`docker push octodock92/${imageName}`);
          process.stdout.on("data", (data) => {
            console.log(data);
          });
          process.stdout.on("error", (error) => {
            console.log("error occured", error);
          });
          process.stdout.on("close", () => {
            console.log("push successful");
          });
        } else {
          console.error(`❌ Docker login failed with exit code ${code}`);
        }
      });
    } else {
      console.error(`❌ Build failed with exit code ${code}`);
      process.exit(code);
    }
  });
}

main();
