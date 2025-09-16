import createKafkaClient from "./client";
import type { Kafka, ITopicConfig, Producer, Consumer } from "kafkajs";

interface kafkaUser {
  type: "PRODUCER" | "CONSUMER";
  isRunning?: boolean;
  kafkaProducer?: Producer;
  kafkaConsumer?: Consumer;
}

class kafkaClient {
  client: Kafka;
  clientId: string;
  broker: string[];
  kafkaUser: Record<string, kafkaUser>;
  constructor(clientId: string, broker: string[]) {
    this.broker = broker;
    this.clientId = clientId;
    this.kafkaUser = {};
    this.client = createKafkaClient(clientId, broker);
  }

  /**
   * Create a producer and register it
   */
  async createNewProducer(producerName: string) {
    this.kafkaUser[producerName] = {
      kafkaProducer: this.client.producer(),
      type: "PRODUCER",
    };
  }

  /**
   * Create a consumer and register it
   */
  async createNewConsumer(consumerName: string, groupId: string) {
    this.kafkaUser[consumerName] = {
      kafkaConsumer: this.client.consumer({ groupId }),
      type: "CONSUMER",
      isRunning: false,
    };
  }

  /**
   * Create topics via Admin API
   */
  async createTopic(topics: ITopicConfig[]) {
    const admin = this.client.admin();
    await admin.connect();

    await admin.createTopics({
      topics,
    });

    await admin.disconnect();
  }

  /**
   * Push messages via a registered producer
   */
  async pushMessageViaProducer(
    producerName: string,
    topic: string,
    messages: string[]
  ) {
    const currentProducer = this.kafkaUser[producerName]?.kafkaProducer;
    if (!currentProducer) throw new Error(`Producer ${producerName} not found`);

    await currentProducer.connect();

    const pushableMessages = messages.map((msg) => ({
      value: JSON.stringify(msg),
    }));

    return await currentProducer.send({
      topic,
      messages: pushableMessages,
    });
  }

  /**
   * Consume messages via a registered consumer
   */
  async consumeMessageViaConsumer(
    consumerName: string,
    topic: string,
    fn: any
  ) {
    const consumer = this.kafkaUser[consumerName]?.kafkaConsumer;
    if (!consumer) throw new Error(`Consumer ${consumerName} not found`);

    if (!this.kafkaUser[consumerName].isRunning) {
      this.kafkaUser[consumerName].isRunning = true;

      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value?.toString();
          if (!value) return;

          let data;
          try {
            data = JSON.parse(value);
            if (typeof data === "string") {
              data = JSON.parse(data);
            }
          } catch (err) {
            console.error("❌ Failed to parse message", err, value);
            return;
          }

          await fn(data);
        },
      });
    }
  }

  /**
   * Disconnect a producer or consumer
   */
  async disconnectKafkaUser(kafkaUsername: string) {
    const kafkaUser = this.kafkaUser[kafkaUsername];
    if (!kafkaUser) return;

    if (kafkaUser.type === "PRODUCER" && kafkaUser.kafkaProducer) {
      await kafkaUser.kafkaProducer.disconnect();
    } else if (kafkaUser.type === "CONSUMER" && kafkaUser.kafkaConsumer) {
      await kafkaUser.kafkaConsumer.disconnect();
    }

    delete this.kafkaUser[kafkaUsername];
  }
}

function registerKafkaClient(clientId: string, broker: string[]) {
  return new kafkaClient(clientId, broker);
}

export default registerKafkaClient;
