/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const AWS = require("aws-sdk");
let dynamodb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const base_params = { TableName: "BugsTable-main" };

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

app.get("/bugs", async function (req, res) {
  try {
    const result = await dynamodb.scan({ ...base_params }).promise();
    res.json({ data: result.Items });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.get("/bugs/:id", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.post("/bugs", async function (req, res) {
  const bug = {
    id: generateId(),
    created: new Date(),
    priority: req.body.priority || "low",
    status: req.body.status || "open",
    title: req.body.title,
    description: req.body.description,
  };

  const params = { ...base_params, Item: bug };
  try {
    const result = await dynamodb.put(params).promise();
    res.json({ data: bug });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.put("/bugs/:id", async function (req, res) {
  const bug = {
    id: req.params.id,
    ...req.body,
  };

  const params = { ...base_params, Item: bug };

  try {
    await dynamodb.put(params).promise();
    res.json({ message: "success", data: bug });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.delete("/bugs/:id", async function (req, res) {
  // Add your code here
  const params = { ...base_params, Key: { id: req.params.id } };
  const result = await dynamodb.delete(params).promise();
  res.json({ data: result });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
