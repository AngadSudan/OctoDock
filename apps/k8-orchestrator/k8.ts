import * as k8s from "@kubernetes/client-node";
import type { KubeConfig } from "@kubernetes/client-node";
import type { CoreV1Api } from "@kubernetes/client-node";
import * as fs from "fs";
import * as yaml from "js-yaml";
import logger from "./utils/logger";
import prisma from "@octodock/prisma";

class KubernetesAPI {
  kubeClient: KubeConfig | null = null;
  kubeApi: CoreV1Api | null = null;

  constructor() {
    this.kubeClient = new k8s.KubeConfig();
    this.kubeClient.loadFromDefault();
    this.kubeApi = this.kubeClient.makeApiClient(k8s.CoreV1Api);
  }
  async createPodForDockerImage(dockerImage: string, projectId: string) {
    try {
      // Generate a unique name for pod/service/ingress
      const uniqueId = `proj-${projectId}-${Date.now()}`;
      const subdomain = `${uniqueId}.octodock.angadsudan.me`;

      // --- Load Pod manifest ---
      const podContents = fs.readFileSync("./manifests/pod.yaml", "utf8");
      let podManifest: any = yaml.load(podContents);
      podManifest.metadata.name = uniqueId;
      podManifest.metadata.labels.app = uniqueId;
      podManifest.spec.containers[0].name = uniqueId + "-container";
      podManifest.spec.containers[0].image = dockerImage;

      // Create Pod
      const podRes = await this.kubeApi.createNamespacedPod(
        "default" as any,
        podManifest
      );
      logger.logData({
        message: `✅ Pod created: ${podRes.metadata?.name}`,
      });

      // --- Load Service manifest ---
      const serviceContents = fs.readFileSync(
        "./manifests/service.yaml",
        "utf8"
      );
      let serviceManifest: any = yaml.load(serviceContents);
      serviceManifest.metadata.name = uniqueId + "-service";
      serviceManifest.spec.selector.app = uniqueId;
      serviceManifest.spec.ports[0].port = 80;
      serviceManifest.spec.ports[0].targetPort =
        podManifest.spec.containers[0].ports?.[0]?.containerPort || 80;

      const serviceRes = await this.kubeApi.createNamespacedService(
        "default" as any,
        serviceManifest
      );
      logger.logData({
        message: `✅ Service created: ${serviceRes.metadata?.name}`,
      });

      // --- Load IngressRoute manifest (Traefik CRD) ---
      const ingressContents = fs.readFileSync(
        "./manifests/ingressRoute.yaml",
        "utf8"
      );
      let ingressManifest: any = yaml.load(ingressContents);
      ingressManifest.metadata.name = uniqueId + "-ingress";
      ingressManifest.spec.routes[0].match = `Host(\`${subdomain}\`)`;
      ingressManifest.spec.routes[0].services[0].name =
        serviceManifest.metadata.name;
      ingressManifest.spec.routes[0].services[0].port = 80;

      // IngressRoutes are CRDs, so need CustomObjectsApi
      // --- Create Ingress using config ---
      const ingressApi = this.kubeClient.makeApiClient(k8s.NetworkingV1Api);
      const ingressConfig = {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: uniqueId + "-ingress",
          annotations: {
            "kubernetes.io/ingress.class": "traefik",
            "traefik.ingress.kubernetes.io/router.entrypoints": "web",
          },
        },
        spec: {
          rules: [
            {
              host: subdomain,
              http: {
                paths: [
                  {
                    path: "/",
                    pathType: "Prefix",
                    backend: {
                      service: {
                        name: serviceManifest.metadata.name,
                        port: {
                          number: 80,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      await ingressApi.createNamespacedIngress(
        "default" as any,
        ingressConfig as any
      );

      logger.logData({
        message: `✅ IngressRoute created: ${ingressManifest.metadata.name} → ${subdomain}`,
      });
    } catch (error: any) {
      logger.logData({
        message: "❌ Error creating Kubernetes resources: " + error.message,
        loggingLevel: "error",
        error,
      });
    }
  }
}

export default KubernetesAPI;
