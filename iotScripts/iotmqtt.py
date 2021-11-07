import paho.mqtt.client as mqtt
import pymongo as mongo
from datetime import datetime

broker_address="139.59.31.125"
port=1880
connection_string="mongodb+srv://admin:admin@cluster0.b7oj5.mongodb.net/iotproject?retryWrites=true&w=majority"

dbclient=mongo.MongoClient(connection_string)
db = dbclient.server_info()

db=dbclient["iotproject"]
col=db["datas"]



def on_connect(client,userdata,flags,rc):
    print("Connected with result code "+str(rc))
    client.subscribe("room/ldrval")

def on_message(client,userdata,msg):
    print("Message ["+msg.topic+"] : "+str(msg.payload))
    new_dict={"timestamp": datetime.utcnow() , "data" : int(msg.payload)}
    col.insert_one(new_dict).inserted_id

client=mqtt.Client("p1")
client.connect(broker_address,port)
client.on_connect=on_connect
client.on_message=on_message
client.loop_forever()
