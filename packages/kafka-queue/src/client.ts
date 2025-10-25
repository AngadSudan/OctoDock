import { Kafka } from "kafkajs";
import { kafkaCloudClient } from ".";
function createKafkaClient(
  clientId: string,
  broker: string[],
  ssl: boolean,
  saml: kafkaCloudClient,
): Kafka | null {
  try {
    const client: Kafka = new Kafka({
      clientId: clientId,
      brokers: broker,
      connectionTimeout: 3000,
      requestTimeout: 25000,
    });
    console.log("Kafka client initiated");
    return client;
  } catch (error) {
    console.log("=======kafka client not initialtized =========");
    return null;
  }
}
export default createKafkaClient;
