# Fractal MQQT Alarm Generator

## Init
Setup the application by running `npm install`

Ensure you are running local Mosquitto instance with following config:

```

log_type all

listener 1883

allow_anonymous true

```

## To Run Test Conditions
Integration tests are available for this app and run on Jest. Run these tests with `npm test`

The tests demonstrate that the following logic runs as expected in this client application: 

> For this task we would like you design a node.js mqtt client that subscribes and keeps track of six alarm topics.  When **any** of these child topics publishes a value of '0', the client will publish a '0' to the parent topic. Only when  **all** child topics last published a value of '1',  then the client can publish '1' to the parent topic.  The value of '0' represents a flag indicating of that status of that system needing attention, while a value of '1' indicates no attention needed . Assume the initial state of the parent topic is '1'. 
