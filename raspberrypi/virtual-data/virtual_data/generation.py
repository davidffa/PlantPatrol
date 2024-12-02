import uuid 
import time 
import random 
import os 
from dotenv import load_dotenv
import json
import math
import sys
import types
import time
m = types.ModuleType('kafka.vendor.six.moves', 'Mock module')
setattr(m, 'range', range)
sys.modules['kafka.vendor.six.moves'] = m

from kafka import KafkaProducer
from kafka.errors import KafkaError

load_dotenv()

topic = os.getenv("BROKER_TOPIC_KAFKA")
ip=os.getenv("BROKER_IP_KAFKA")
port=os.getenv("BROKER_PORT_KAFKA")
interval = int(os.getenv("SENDING_INTERVAL"))
numC = int(os.getenv("NUM_CONTROLLERS"))

controllers=[]
def on_send_success(record_metadata):
    print(record_metadata.topic)
    print(record_metadata.partition)
    print(record_metadata.offset)

def on_send_error(excp):
    log.error('I am an errback', exc_info=excp)
    # handle exception
def generate_controllers(num):
    for i in range(num):
        id = uuid.uuid4()
        controllers.append(str(id))

def main():
    server = f"{ip}:{port}"
    producer = KafkaProducer(bootstrap_servers=[server],value_serializer=lambda m: json.dumps(m).encode('utf-8'))
    generate_controllers(numC)
    amp=2
    while True:
        message=dict()
        message["temperature"]=25.0+random.randrange(-amp,amp)
        message["humidity"]=50.0+random.randrange(-amp,amp)
        message["aiq"]=250.0+random.randrange(-amp,amp)
        message["uv"]=150.0+random.randrange(-amp,amp)
        r = random.randrange(0,len(controllers)-1)
        message["controllerId"]= controllers[r]
        producer.send(topic,message)
        producer.flush()
        time.sleep(interval)

if __name__=="__main__":
    main()
