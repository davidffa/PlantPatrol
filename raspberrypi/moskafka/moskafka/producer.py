import json
import os 
import sys
import types
from dotenv import load_dotenv
# changing imports 
m = types.ModuleType('kafka.vendor.six.moves', 'Mock module')
setattr(m, 'range', range)
sys.modules['kafka.vendor.six.moves'] = m

from kafka import KafkaProducer
from kafka.errors import KafkaError

load_dotenv()

topic=os.getenv("TOPIC_ROOT_KAFKA")
broker_ip=os.getenv("BROKER_IP_KAFKA")
port=os.getenv("BROKER_PORT_KAFKA")

def on_send_success(record_metadata):
    print(record_metadata.topic)
    print(record_metadata.partition)
    print(record_metadata.offset)

def on_send_error(excp):
    log.error('I am an errback', exc_info=excp)

def main():
    server = f"{broker_ip}:{port}"
    producer = KafkaProducer(bootstrap_servers=[server],value_serializer=lambda m: json.dumps(m).encode('utf-8'))
    producer.send(topic,{"message":"something"}).add_callback(on_send_success).add_callback(on_send_error)
    producer.flush()
    producer.close()
if __name__=="__main__":
    main()
