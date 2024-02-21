const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
const fs = require('fs');
const lambda = new AWS.Lambda();
const uuidcrypto = require("crypto");
const { getSettings } = require('./settings');
const { v4: uuidv4 } = require('uuid');

async function updatePatientGoalSettings(patientGoals) {
    const params = {
        TableName: 'patientGoalSettings-boonxvym5fasde4r33wkfzd7yq-dev',
        Item: patientGoals,
    }

    try {
        const data = await dynamoDB.put(params).promise();
        console.log("Patient goal settings saved successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating patient goal settings:", error);
        throw error;
    }
}


async function updateFsettings(fSettings) {
    const params = {
        TableName: 'fSetting-boonxvym5fasde4r33wkfzd7yq-dev',
        Item: fSettings
    };

    try {
        const data = await dynamoDB.put(params).promise();
        console.log("fSettings saved successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating fSettings:", error);
        throw error;
    }
}


async function updateFrequencySettings(frequencySettings) {
    const params = {
        TableName: 'FrequencySettings-boonxvym5fasde4r33wkfzd7yq-dev',
        Item: frequencySettings
    };

    try {
        const data = await dynamoDB.put(params).promise();
        console.log("frequencySettings updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating frequencySettings:", error);
        throw error;
    }
}


async function updateUserFrequency(userFrequency) {
    const params = {
        tableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
            Item: userFrequency
        }
    };
    try {
        const userFrequencyResults = await dynamoDB.update(params.payload).promise();
        console.log("User frequency saved successfully:", userFrequencyResults);
        return userFrequencyResults;
    } catch (error) {
        console.error("Error updating user frequency:", error);
        throw error;
    }
}


async function extractAndSet(mapper) {
    const uuuid = mapper.subject
    //for patientGoalSettings
    let patientGoals = {
        id: "",
        goal_glucose_f_min : "",
        goal_glucose_f_max : "",
        goal_glucose_pp_min : "",
        goal_glucose_pp_max : "",
        goal_glucose_r_min : "",
        goal_glucose_r_max : "",
        goal_glucose_unit : "",
        goal_glucose_state : "",
        goal_bp_sys_min : "",
        goal_bp_sys_max : "",
        goal_bp_dis_min : "",
        goal_bp_dis_max : "",
        goal_bp_unit : "",
        goal_bp_state : "",
        goal_hba1c_min : "",
        goal_hba1c_max : "",
        goal_hba1c_unit : "",
        goal_hba1c_state : "",
        goal_max_target_weight : "",
        goal_min_target_weight : "",
        target_weight_goal_date : "",
        weight_unit : "",
        goal_target_sleep_min : "",
        goal_target_sleep_max : "",
        target_sleep_goal_date : "",
        sleep_unit : "",
        goal_target_excercise_min : "",
        goal_target_excercise_max : "",
        target_excercise_goal_date : "",
        excercise_unit : "",
    }
    let frequencySettings = {
        id: "",
        isNotificationOn: false, 
        type: "",                
        weekDays: [],           
        time: "",                
        version: 0 
    }
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    let userFrequencySave = {
        id: "",
        createdAt: ""
    }
    const currentDateAndTime = new Date().toISOString(); // Get current date and time in ISO format
    userFrequencySave.id = uuuid
    userFrequencySave.createdAt = currentDateAndTime 
    patientGoals.id = uuuid
    fSettings.userFrequencyID = uuuid
    try{
        const result = await updateUserFrequency(userFrequencySave);
        console.log("User frequency saved successfully:", result) 
    }catch(e){
        console.error("Error saved user frequency:", e);
    }

    // console.log(uuuid)
    // fSettings.userFrequencyID = uuuid;
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            console.log(key)
            if (key === "313835008") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "Hba1cNormal") {
                        let type = "Hba1c"
                        if (elements && elements.scheduledTiming && elements.scheduledTiming.repeat) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            const hba1cSettings = getSettings(type, period, periodUnit, frequency);
                            if (hba1cSettings) {
                                const randomId = uuidv4();
                                patientGoals.goal_hba1c_max = elements.valueRange.high.value;
                                patientGoals.goal_hba1c_min = elements.valueRange.low.value;
                                patientGoals.goal_hba1c_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = hba1cSettings.isNotificationOn;
                                frequencySettings.weekDays = hba1cSettings.weekDays
                                frequencySettings.type = type;
                                frequencySettings.id = randomId
                                fSettings.id = randomId
                                fSettings.type = type;
                                fSettings.isNotificationOn = hba1cSettings.isNotificationOn;
                                fSettings.weekDays = hba1cSettings.weekDays
                            }
                            try {
                                const resultFSettings = await updateFsettings(fSettings);
                                console.log("fSettings saved successfully:", resultFSettings);

                                // Update frequencySettings
                                const resultFrequencySettings = await updateFrequencySettings(frequencySettings);
                                console.log("frequencySettings saved successfully:", resultFrequencySettings);
                            } catch (error) {
                                console.log("error in saving ", error)
                            }
                            console.log("fSettings are ", fSettings)
                            console.log("frequencySettings are", frequencySettings)
                        }
                    }
                }
            }
            if (key === "75367002") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    let type = "Blood Pressure"
                    if (elements.valueString === "BPsysNormal" || elements.valueString === "BPdiaNormal") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const bpSettings = getSettings(type, period, periodUnit, frequency);
                            if (bpSettings) {
                                const randomId = uuidv4();
                                if (elements.valueString === "BPdiaNormal"){
                                    patientGoals.goal_bp_dis_max = elements.valueRange.high.value
                                    patientGoals.goal_bp_dis_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "BPsysNormal"){
                                    patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                    patientGoals.goal_bp_sys_max = elements.valueRange.low.value;                                    
                                }
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = bpSettings.weekDays;
                                frequencySettings.isNotificationOn = bpSettings.isNotificationOn;
                                frequencySettings.type = type;
                                frequencySettings.time = bpSettings.time
                                frequencySettings.id = randomId
                                fSettings.id = randomId
                                fSettings.type = type;
                                fSettings.isNotificationOn = bpSettings.isNotificationOn;
                                fSettings.weekDays = bpSettings.weekDays;
                                fSettings.time = bpSettings.time
                            }
                            try {
                                const resultFSettings = await updateFsettings(fSettings);
                                console.log("fSettings saved successfully:", resultFSettings);

                                // Update frequencySettings
                                const resultFrequencySettings = await updateFrequencySettings(frequencySettings);
                                console.log("frequencySettings saved successfully:", resultFrequencySettings);
                            } catch (error) {
                                console.log("error in saving ", error)
                            }
                            console.log("fSettings are ", fSettings)
                            console.log("frequencySettings are", frequencySettings)
                        }
                    }
                }
            }
            if (key === "365811003") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "gluFastNormal" || elements.valueString === "glucPPNormal" || elements.valueString === "gluRandNormal") {
                        let type = "Glucose"
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const glucoseSettings = getSettings(type, period, periodUnit, frequency);
                            if (glucoseSettings) {
                                const randomId = uuidv4();
                                if (elements.valueString === "gluRandNormal"){
                                    patientGoals.goal_glucose_r_max = elements.valueRange.high.value
                                    patientGoals.goal_glucose_r_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "glucPPNormal"){
                                    patientGoals.goal_glucose_pp_max = elements.valueRange.high.value 
                                    patientGoals.goal_glucose_pp_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "gluFastNormal"){
                                    patientGoals.goal_glucose_f_min = elements.valueRange.high.value;
                                    patientGoals.goal_glucose_f_max = elements.valueRange.low.value;
                                }
                                patientGoals.goal_glucose_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = glucoseSettings.isNotificationOn;
                                frequencySettings.weekDays = glucoseSettings.weekDays
                                frequencySettings.type = type;
                                frequencySettings.time = glucoseSettings.time
                                frequencySettings.id = randomId
                                fSettings.id = randomId
                                fSettings.type = type;
                                fSettings.isNotificationOn = glucoseSettings.isNotificationOn;
                                fSettings.time = glucoseSettings.time
                                fSettings.weekDays = glucoseSettings.weekDays
                            }
                            try {
                                const resultFSettings = await updateFsettings(fSettings);
                                console.log("fSettings saved successfully:", resultFSettings);

                                // Update frequencySettings
                                const resultFrequencySettings = await updateFrequencySettings(frequencySettings);
                                console.log("frequencySettings saved successfully:", resultFrequencySettings);
                            } catch (error) {
                                console.log("error in saving ", error)
                            }
                            console.log("fSettings are ", fSettings)
                            console.log("frequencySettings are", frequencySettings)
                        }
                    }
                }
            }
            if (key === "27113001"){
                const element = mapper[key];
                for(const elements of element){
                    if(elements.valueString === "Weight"){
                        let type = "Weight";
                        if(elements && elements.scheduledTiming){
                            console.log(elements.scheduledTiming) 
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            const weightSettings = getSettings(type, period, periodUnit, frequency);
                            if (weightSettings) {
                                const randomId = uuidv4();
                                frequencySettings.isNotificationOn = weightSettings.isNotificationOn;
                                frequencySettings.weekDays = weightSettings.weekDays
                                frequencySettings.type = type;
                                frequencySettings.time = weightSettings.time
                                frequencySettings.id = randomId
                                fSettings.id = randomId
                                fSettings.type = type;
                                fSettings.isNotificationOn = weightSettings.isNotificationOn;
                                fSettings.time = weightSettings.time
                                fSettings.weekDays = weightSettings.weekDays
                            }
                            try {
                                const resultFSettings = await updateFsettings(fSettings);
                                console.log("fSettings saved successfully:", resultFSettings);

                                // Update frequencySettings
                                const resultFrequencySettings = await updateFrequencySettings(frequencySettings);
                                console.log("frequencySettings saved successfully:", resultFrequencySettings);
                            } catch (error) {
                                console.log("error in saving ", error )
                            }
                            console.log("fSettings are ", fSettings)
                            console.log("frequencySettings are", frequencySettings)
                        }
                    }
                }
            }
        }
    }
    try {
        const result = await updatePatientGoalSettings(patientGoals)
        console.log("Patient goals saved ", result);
    } catch (error) {
        console.error("Error updating patient goals", error);
    }

    
    console.log("userFrequencySettings are", userFrequencySave)
    console.log("patientGoals are ",patientGoals)
}



exports.handler = async (event, context) => {

    try {
        if (event) {
            const events = JSON.parse(event);
            let eventType = "";
            if (events.eventType) {
                eventType = events.eventType;
            }
            let mapper = {};
            let subject;
            let uuid;
            if ((events.eventType === "INSERT" || events.eventType === "UPDATE") && events.resourceType === "CarePlan") {
                console.log("Processing events for care plan", events.resourceType);
                if (events.subject) {
                    subject = events.subject.reference;
                    uuid = subject.split("/")[1];
                    console.log("Subject UUID is ", uuid);
                }
                if (events.activity && Array.isArray(events.activity)) {
                    events.activity.forEach((element, index) => {
                        // console.log(`Processing activity ${index + 1}`)
                        if (element.detail && element.detail.extension && element.detail.extension.length > 0) {
                            element.detail.extension.forEach((extensionElement, extensionIndex) => {
                                // console.log(`Extension ${extensionIndex + 1}:`, extensionElement);
                                const key = element.detail.code.coding[0].code;
                                if (!mapper[key]) {
                                    mapper[key] = [];
                                }
                                if (extensionElement.valueString && extensionElement.valueRange) {
                                    mapper[key].push({
                                        valueString: extensionElement.valueString,
                                        valueRange: {
                                            high: {
                                                unit: extensionElement.valueRange.high.unit,
                                                value: extensionElement.valueRange.high.value,
                                            },
                                            low: {
                                                unit: extensionElement.valueRange.low.unit,
                                                value: extensionElement.valueRange.low.value
                                            }
                                        },
                                        scheduledTiming: {
                                            repeat: element.detail.scheduledTiming.repeat,
                                            event: element.detail.scheduledTiming.event
                                        },
                                    });
                                } else if (extensionElement.valueString) {
                                    mapper[key].push({
                                        valueString: extensionElement.valueString,
                                        scheduledTiming: {
                                            repeat: element.detail.scheduledTiming.repeat,
                                            event: element.detail.scheduledTiming.event
                                        },
                                    });
                                }
                            });
                        }

                    });
                } else {
                    console.log("No activity found");
                }
                mapper.subject = uuid;
            } else {
                console.log("No care plan found");
            }

            await extractAndSet(mapper);
            // console.log("mapper is", JSON.stringify(mapper, null, 2));
        } else {
            console.log("No events found");
        }
        return { message: "Event processed successfully" };

    } catch (error) {
        console.log(error);
        return error;
    }
};