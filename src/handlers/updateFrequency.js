const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });

const lambda = new AWS.Lambda();
const uuidcrypto = require("crypto");

async function updatePatientGoalSettings(id) {
    const patientGoalSettings = {
        operation: 'update',
        tableName: 'patientGoalSettings-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'patientGoalSettings-boonxvym5fasde4r33wkfzd7yq-dev',
            Key: {
                id: id,
            },
            UpdateExpression: "",
            ExpressionAttributeNames: {
            },
            ExpressionAttributeValues: {

            },
        }
    }
    const patientGoalSettingsResults = await dynamoDB.update(patientGoalSettings.payload).promise();
    console.log(JSON.stringify(patientGoalSettingsResults))
    return patientGoalSettingsResults;
}

async function updateFsettings(id) {
    const fSettings = {
        operation: 'update',
        tableName: 'fSetting-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'fSetting-boonxvym5fasde4r33wkfzd7yq-dev',
            Key: {
                id: id,
            },
            UpdateExpression: "",
            ExpressionAttributeNames: {
            },
            ExpressionAttributeValues: {

            },
        }
    }
    const fSettingsResults = await dynamoDB.update(fSettings.payload).promise();
    console.log(JSON.stringify(fSettingsResults))
    return fSettingsResults;
}

async function updateFrequencySettings(id) {
    const frequencySettings = {
        operation: 'update',
        tableName: 'FrequencySettings-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'FrequencySettings-boonxvym5fasde4r33wkfzd7yq-dev',
            Key: {
                id: id,
            },
            UpdateExpression: "",
            ExpressionAttributeNames: {
            },
            ExpressionAttributeValues: {

            },
        }
    }
    const frequencySettingsResults = await dynamoDB.update(frequencySettings.payload).promise();
    console.log(JSON.stringify(frequencySettingsResults))
    return frequencySettingsResults;
}

async function updateUserFrequency(id) {
    const userFrequency = {
        operation: 'update',
        tableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
            Key: {
                id: id,
            },
            UpdateExpression: "",
            ExpressionAttributeNames: {
            },
            ExpressionAttributeValues: {

            },
        }
    }
    const userFrequencyResults = await dynamoDB.update(userFrequency.payload).promise();
    console.log(JSON.stringify(userFrequencyResults))
    return userFrequencyResults;
}

exports.handler = async (event, context) => {
    // event.Records.forEach((record) => {
    //     /* Process only for newly created Patients*/
    //     resourceType = JSON.stringify(record.dynamodb.NewImage.resourceType.S);
    //     NewImage = record.dynamodb;
    //     if (
    //         record.eventName === "INSERT" && record.eventName === "UPDATE" &&
    //         JSON.stringify(record.dynamodb.NewImage.resourceType.S) === '"Patient"'
    //     ){

    //     }
    // });
    const { id} = JSON.parse(event.body);
    try {
        const careplans = {
            tableName: 'resource-db-SB01',
            payload: {
                TableName:'resource-db-SB01',
                Key: {
                    id: id,
                },
            }
        }
        const carePlansResult = await dynamoDB.get(careplans.payload).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(carePlansResult)
        }
    } catch (error) {
        console.log("Error while processing the request:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing the request.', error }),
        };
    }
};