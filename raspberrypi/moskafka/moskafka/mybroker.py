import paho.mqtt.client as mqtt
import time
import os 
import json
import sys
from enum import Enum
import types
from dotenv import load_dotenv
import logging 
# changing imports 
m = types.ModuleType('kafka.vendor.six.moves', 'Mock module')
setattr(m, 'range', range)
sys.modules['kafka.vendor.six.moves'] = m

from kafka import KafkaProducer
from kafka.errors import KafkaError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class MESSAGE(Enum):
    TOPIC=0
    PAYLOAD=1

mqtt_broker = os.getenv("BROKER_IP_MQTT")
mqtt_port = int(os.getenv("BROKER_PORT_MQTT"))
mqtt_topic = os.getenv("TOPIC_ROOT_MQTT")

kafka_topic=os.getenv("TOPIC_ROOT_KAFKA")
kafka_broker=os.getenv("BROKER_IP_KAFKA")
kafka_port=os.getenv("BROKER_PORT_KAFKA")

message_queue=[]
    
# ------KAFKA callbacks-------
def on_send_success(record_metadata):
    logger.info(f"Sent message (Kafka):\n Topic:{record_metadata.topic} \n Partition: {record_metadata.partition} \n Offset:{record_metadata.offset}")

def on_send_error(excp):
    logger.error('Error sending message to Kafka', exc_info=True)
    # If the exception is a specific Kafka error, log more details
    if isinstance(excp, KafkaError):
        logger.error(f"Kafka Error Code: {excp.errno}")
        logger.error(f"Kafka Error Message: {excp}")

#------- MQTT callbacks ------
def on_connect(client, userdata, flags, reason_code, properties):
    logger.info("Subscribed to the mqtt topic")
    client.subscribe(mqtt_topic)

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode("utf-8"))
        topic = msg.topic
        message_queue.append((topic, payload))
        logger.info(f"Received new message (MQTT): {message_queue[-1]}")
    except json.JSONDecodeError:
        logger.error(f"Failed to decode message: {msg.payload}")


def main():
    try:
        mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        mqttc.on_connect = on_connect
        mqttc.on_message = on_message

        server = f"{kafka_broker}:{kafka_port}"
        producer = KafkaProducer(bootstrap_servers=[server],value_serializer=lambda m: json.dumps(m).encode('utf-8'),retries=3,acks='all')
        logger.info("Connecting")
        mqttc.connect(mqtt_broker,mqtt_port, 60)

        # starts on another thread
        mqttc.loop_start()

        while producer:
            # if the mqttc is disconnected reconnect 
            if mqttc.is_connected() and len(message_queue)!=0 :
                try:
                    msg = message_queue.pop(0)[MESSAGE.PAYLOAD.value]
                    logger.info("Sending message to kafka...")
                    future=producer.send(kafka_topic,msg).add_callback(on_send_success)
                    # Strange noneType:None error message, ignored because consumer is receiving the messages
                    # .add_callback(on_send_error)
                    future.get(timeout=10)
                    producer.flush()
                except Exception as e :
                    logger.info(f"Connection error:{e}")
            # a small delay
            time.sleep(0.1)
        producer.close()
    except Exception as e :
        logger.info(f"Shutting down... {e}") 
    finally:
        mqttc.loop_stop()
if __name__=="__main__":
    main()

