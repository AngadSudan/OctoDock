import { Kafka } from "kafkajs";
function createKafkaClient(clientId: string, broker: string[]): Kafka {
  const client: Kafka = new Kafka({
    clientId: clientId,
    brokers: broker,
    connectionTimeout: 3000,
    requestTimeout: 25000,
  });
  console.log("Kafka client initiated");
  return client;
}
export default createKafkaClient;
