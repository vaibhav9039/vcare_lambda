const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
const fs = require('fs');
const lambda = new AWS.Lambda();
const uuidcrypto = require("crypto");

async function updatePatientGoalSettings(id, patientGoals) {
    const params = {
        TableName: 'patientGoalSettings-boonxvym5fasde4r33wkfzd7yq-dev',
        Key: { id: id },
        UpdateExpression: `SET 
            goal_glucose_f_min = :goal_glucose_f_min,
            goal_glucose_f_max = :goal_glucose_f_max,
            goal_glucose_pp_min = :goal_glucose_pp_min,
            goal_glucose_pp_max = :goal_glucose_pp_max,
            goal_glucose_r_min = :goal_glucose_r_min,
            goal_glucose_r_max = :goal_glucose_r_max,
            goal_glucose_unit = :goal_glucose_unit,
            goal_glucose_state = :goal_glucose_state,
            goal_bp_sys_min = :goal_bp_sys_min,
            goal_bp_sys_max = :goal_bp_sys_max,
            goal_bp_dis_min = :goal_bp_dis_min,
            goal_bp_dis_max = :goal_bp_dis_max,
            goal_bp_unit = :goal_bp_unit,
            goal_bp_state = :goal_bp_state,
            goal_hba1c_min = :goal_hba1c_min,
            goal_hba1c_max = :goal_hba1c_max,
            goal_hba1c_unit = :goal_hba1c_unit,
            goal_hba1c_state = :goal_hba1c_state,
            goal_max_target_weight = :goal_max_target_weight,
            goal_min_target_weight = :goal_min_target_weight,
            target_weight_goal_date = :target_weight_goal_date,
            weight_unit = :weight_unit,
            goal_target_sleep_min = :goal_target_sleep_min,
            goal_target_sleep_max = :goal_target_sleep_max,
            target_sleep_goal_date = :target_sleep_goal_date,
            sleep_unit = :sleep_unit,
            goal_target_excercise_min = :goal_target_excercise_min,
            goal_target_excercise_max = :goal_target_excercise_max,
            target_excercise_goal_date = :target_excercise_goal_date,
            excercise_unit = :excercise_unit`,
        ExpressionAttributeValues: {
            ':goal_glucose_f_min': patientGoals.goal_glucose_f_min,
            ':goal_glucose_f_max': patientGoals.goal_glucose_f_max,
            ':goal_glucose_pp_min': patientGoals.goal_glucose_pp_min,
            ':goal_glucose_pp_max': patientGoals.goal_glucose_pp_max,
            ':goal_glucose_r_min': patientGoals.goal_glucose_r_min,
            ':goal_glucose_r_max': patientGoals.goal_glucose_r_max,
            ':goal_glucose_unit': patientGoals.goal_glucose_unit,
            ':goal_glucose_state': patientGoals.goal_glucose_state,
            ':goal_bp_sys_min': patientGoals.goal_bp_sys_min,
            ':goal_bp_sys_max': patientGoals.goal_bp_sys_max,
            ':goal_bp_dis_min': patientGoals.goal_bp_dis_min,
            ':goal_bp_dis_max': patientGoals.goal_bp_dis_max,
            ':goal_bp_unit': patientGoals.goal_bp_unit,
            ':goal_bp_state': patientGoals.goal_bp_state,
            ':goal_hba1c_min': patientGoals.goal_hba1c_min,
            ':goal_hba1c_max': patientGoals.goal_hba1c_max,
            ':goal_hba1c_unit': patientGoals.goal_hba1c_unit,
            ':goal_hba1c_state': patientGoals.goal_hba1c_state,
            ':goal_max_target_weight': patientGoals.goal_max_target_weight,
            ':goal_min_target_weight': patientGoals.goal_min_target_weight,
            ':target_weight_goal_date': patientGoals.target_weight_goal_date,
            ':weight_unit': patientGoals.weight_unit,
            ':goal_target_sleep_min': patientGoals.goal_target_sleep_min,
            ':goal_target_sleep_max': patientGoals.goal_target_sleep_max,
            ':target_sleep_goal_date': patientGoals.target_sleep_goal_date,
            ':sleep_unit': patientGoals.sleep_unit,
            ':goal_target_excercise_min': patientGoals.goal_target_excercise_min,
            ':goal_target_excercise_max': patientGoals.goal_target_excercise_max,
            ':target_excercise_goal_date': patientGoals.target_excercise_goal_date,
            ':excercise_unit': patientGoals.excercise_unit
        }
    };

    try {
        const data = await dynamoDB.update(params).promise();
        console.log("Patient goal settings updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating patient goal settings:", error);
        throw error;
    }
}


async function updateFsettings(id, fSettings) {
    const params = {
        TableName: 'fSetting-boonxvym5fasde4r33wkfzd7yq-dev',
        Key: { id: id },
        UpdateExpression: 'SET #isNotificationOn = :isNotificationOn, #type = :type, #weekDays = :weekDays, #time = :time',
        ExpressionAttributeNames: {
            '#isNotificationOn': 'isNotificationOn',
            '#type': 'type',
            '#weekDays': 'weekDays',
            '#time': 'time'
        },
        ExpressionAttributeValues: {
            ':isNotificationOn': fSettings.isNotificationOn,
            ':type': fSettings.type,
            ':weekDays': fSettings.weekDays,
            ':time': fSettings.time
        }
    };

    try {
        const data = await dynamoDB.update(params).promise();
        console.log("fSettings updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating fSettings:", error);
        throw error;
    }
}


async function updateFrequencySettings(id, frequencySettings) {
    const params = {
        TableName: 'FrequencySettings-boonxvym5fasde4r33wkfzd7yq-dev',
        Key: { id: id },
        UpdateExpression: 'SET #isNotificationOn = :isNotificationOn, #type = :type, #weekDays = :weekDays, #time = :time, #version = :version',
        ExpressionAttributeNames: {
            '#isNotificationOn': 'isNotificationOn',
            '#type': 'type',
            '#weekDays': 'weekDays',
            '#time': 'time',
            '#version': 'version'
        },
        ExpressionAttributeValues: {
            ':isNotificationOn': frequencySettings.isNotificationOn,
            ':type': frequencySettings.type,
            ':weekDays': frequencySettings.weekDays,
            ':time': frequencySettings.time,
            ':version': frequencySettings.version
        }
    };

    try {
        const data = await dynamoDB.update(params).promise();
        console.log("frequencySettings updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating frequencySettings:", error);
        throw error;
    }
}


async function updateUserFrequency(id) {
    const currentDateAndTime = new Date().toISOString(); // Get current date and time in ISO format
    const userFrequency = {
        operation: 'update',
        tableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
        payload: {
            TableName: 'userFrequency-boonxvym5fasde4r33wkfzd7yq-dev',
            Key: {
                id: id,
            },
            UpdateExpression: "SET updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":updatedAt": currentDateAndTime
            }
        }
    };
    try {
        const userFrequencyResults = await dynamoDB.update(userFrequency.payload).promise();
        console.log("User frequency updated successfully:", userFrequencyResults);
        return userFrequencyResults;
    } catch (error) {
        console.error("Error updating user frequency:", error);
        throw error;
    }
}


async function extractAndSet(mapper) {

    //for patientGoalSettings
    let patientGoals = {
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
        isNotificationOn: false, 
        type: "",                
        weekDays: [],           
        time: "",                
        version: 0 
    }
    let fSettings = {
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }


    const uuuid = mapper.subject
    // console.log(uuuid)
    fSettings.userFrequencyID = uuuid;
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            console.log(key)
            if (key === "313835008") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "Hba1cNormal") {
                        if (elements && elements.scheduledTiming && elements.scheduledTiming.repeat) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            if (period === 1 && periodUnit === 'a' && frequency === 1) {
                                patientGoals.goal_hba1c_max = elements.valueRange.high.value;
                                patientGoals.goal_hba1c_min = elements.valueRange.low.value;
                                patientGoals.goal_hba1c_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "hba1c";
                                fSettings.type = "hba1c";
                                fSettings.isNotificationOn = true;
                            }
                        }
                    }
                }
            }
            if (key === "75367002") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "BPsysNormal") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            if (period === 1 && periodUnit === 'wk' && frequency === 1 ) {
                                patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = ["Sunday"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sunday"];
                                fSettings.time = "07:30:00"
                            }else if (period === 1 && periodUnit === 'wk' && frequency === 2){
                                patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = ["Sun", "Wed"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00";
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Wed"]
                                fSettings.time = "07:30:00"
                            }
                            else if(period === 1 && periodUnit === 'wk' && frequency === 3){
                                patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = ["Sun", "Wed", "Fri"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00";
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Wed", "Fri"]
                                fSettings.time = "07:30:00"
                            }else if (period === 1 && periodUnit === 'wk' && frequency === 4){
                                patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = ["Sun", "Tue", "Thu", "Sat"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00";
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Tue", "Thu", "Sat"]
                                fSettings.time = "07:30:00"
                            } else if (period === 1 && periodUnit === 'wk' && frequency === 5){
                                patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                frequencySettings.weekDays = ["Sun", "Mon", "Wed", "Fri", "Sat"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00";
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Mon", "Wed", "Fri", "Sat"]
                                fSettings.time = "07:30:00"
                            }
                        }
                    }
                    if (elements.valueString === "BPdiaNormal") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            if (period === 1 && periodUnit === 'wk' && frequency === 1) {
                                patientGoals.goal_bp_dis_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_dis_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit;
                                frequencySettings.weekDays = ["Sunday"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                fSettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sunday"]
                                fSettings.time = "07:30:00"
                            } else if (period === 1 && periodUnit === 'wk' && frequency === 2){
                                patientGoals.goal_bp_dis_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_dis_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit;
                                frequencySettings.weekDays = ["Sun", "Wed"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                fSettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Wed"]
                                fSettings.time = "07:30:00"
                            }
                            else if(period === 1 && periodUnit ==='wk' && frequency === 3){
                                patientGoals.goal_bp_dis_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_dis_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit;
                                frequencySettings.weekDays = ["Sun", "Wed", "Fri"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00"
                                fSettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Wed", "Fri"]
                            }
                            else if (period === 1 && periodUnit === 'wk' && frequency === 4){
                                patientGoals.goal_bp_dis_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_dis_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit;
                                frequencySettings.weekDays = ["Sun", "Tue", "Thu", "Sat"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                fSettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Tue", "Thu", "Sat"]
                                fSettings.time = "07:30:00"
                            }
                            else if (period === 1 && periodUnit === 'wk' && frequency === 5){
                                patientGoals.goal_bp_dis_min = elements.valueRange.high.value;
                                patientGoals.goal_bp_dis_max = elements.valueRange.low.value;
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit;
                                frequencySettings.weekDays = ["Sun", "Mon", "Wed", "Fri", "Sat"];
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "blood pressure";
                                frequencySettings.time = "07:30:00"
                                fSettings.time = "07:30:00"
                                fSettings.type = "blood pressure";
                                fSettings.isNotificationOn = true;
                                fSettings.weekDays = ["Sun", "Mon", "Wed", "Fri", "Sat"]
                                fSettings.time = "07:30:00"
                            }
                        }
                    }
                }
            }
            if (key === "365811003") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "gluFastNormal") {
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            if (period === 1 && periodUnit === 'd' && frequency === 1) {
                                patientGoals.goal_glucose_f_min = elements.valueRange.high.value;
                                patientGoals.goal_glucose_f_max = elements.valueRange.low.value;
                                patientGoals.goal_glucose_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "glucose";
                                frequencySettings.time = "07:00:00"
                                fSettings.type = "glucose";
                                fSettings.isNotificationOn = true;
                                fSettings.time = "07:00:00"
                            }
                        }
                    }
                    if (elements.valueString === "glucPPNormal") {
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            if (period === 1 && periodUnit === 'd' && frequency === 1) {
                                patientGoals.goal_glucose_pp_min = elements.valueRange.high.value;
                                patientGoals.goal_glucose_pp_max = elements.valueRange.low.value;
                                patientGoals.goal_glucose_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "glucose";
                                frequencySettings.time = "07:00:00"
                                fSettings.time = "07:00:00"
                                fSettings.type = "glucose";
                                fSettings.isNotificationOn = true;
                            }
                        }
                    }
                    if (elements.valueString === "gluRandNormal") {
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            if (period === 1 && periodUnit === 'd' && frequency === 1) {
                                patientGoals.goal_glucose_r_min = elements.valueRange.high.value;
                                patientGoals.goal_glucose_r_max = elements.valueRange.low.value;
                                patientGoals.goal_glucose_unit = elements.valueRange.low.unit
                                frequencySettings.isNotificationOn = true;
                                frequencySettings.type = "glucose";
                                frequencySettings.time = "07:00:00"
                                fSettings.type = "glucose";
                                fSettings.isNotificationOn = true;
                                fSettings.time = "07:00:00"
                            }
                        }
                    }
                }
            }
        }
        
    }
    await updatePatientGoalSettings(uuuid, patientGoals)
    await updateFsettings(uuuid, fSettings)
    await updateFrequencySettings(uuuid, frequencySettings)
    await updateUserFrequency(uuuid)
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