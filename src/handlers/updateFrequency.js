const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
const fs = require('fs');
const lambda = new AWS.Lambda();
const uuidcrypto = require("crypto");
const { getSettings } = require('./settings');
const { v4: uuidv4 } = require('uuid');
const config = require('../utils/helper')

async function patientGoalSettings(patientGoals) {
    const params = {
        TableName: config.patientGoalSettingstable,
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
async function getPatientGoalSettings(patientGoals){
    const params = {
        TableName: config.patientGoalSettingstable,
        Key: { id: patientGoals.id },
    }

    try {
        const data = await dynamoDB.get(params).promise();
        console.log("Patient goal settings retrieved successfully:", data);
        if(data && data.Item){
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.error("Error retrieving patient goal settings:", error);
        throw error;
    }
}

async function updatePatientGoalSettings(patientGoals){
    const params = {
        TableName: config.patientGoalSettingstable,
        Key: { id: patientGoals.id },
        UpdateExpression: `set 
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

async function FSettings(fSettings) {
    const params = {
        TableName: config.fsettingstable,
        Item: fSettings
    };

    try {
        const data = await dynamoDB.put(params).promise();
        console.log("fSettings saved successfully:", data);
        return data;
    } catch (error) {
        console.error("Error saving fSettings:", error);
        throw error;
    }
}
async function getFsettings(fSettings){
    const params = {
        TableName: config.fsettingstable,
        Key: {
            id: fSettings.id
        }
    }
    try {
        const data = await dynamoDB.get(params).promise();
        console.log("Fsettings settings retrieved successfully:", data);
        if (data && data.Item) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error retrieving fsettings:", error);
        throw error;
    }
}

async function updateFSettings(fSettings) {
    const params = {
        TableName: config.fsettingstable,
        Key: { id: fSettings.id },
        UpdateExpression: 'SET #isNotificationOn = :isNotificationOn, #type = :type, #weekDays = :weekDays, #time = :time, #extraData = :extraData',
        ExpressionAttributeNames: {
            '#isNotificationOn': 'isNotificationOn',
            '#type': 'type',
            '#weekDays': 'weekDays',
            '#time': 'time',
            '#extraData': 'extraData'
        },
        ExpressionAttributeValues: {
            ':isNotificationOn': fSettings.isNotificationOn,
            ':type': fSettings.type,
            ':weekDays': fSettings.weekDays,
            ':time': fSettings.time,
            ':extraData': fSettings.extraData
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

async function getUserFrequency(uuuid){
    const params = {
        TableName: config.userFrequencytable,
        Key: {
            id: uuuid
        }
    };
    try {
        const userFrequencyResults = await dynamoDB.get(params).promise();
        console.log("User frequency retrieved successfully:", userFrequencyResults);
        if(userFrequencyResults && userFrequencyResults.Item){
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Error retrieving user frequency:", error);
        throw error;
    }
}

async function userFrequency(userFrequency) {
    const params = {
        tableName: config.userFrequencytable,
        payload: {
            TableName: config.userFrequencytable,
            Item: userFrequency
        }
    };
    try {
        const userFrequencyResults = await dynamoDB.put(params.payload).promise();
        console.log("User frequency saved successfully:", userFrequencyResults);
        return userFrequencyResults;
    } catch (error) {
        console.error("Error saving user frequency:", error);
        throw error;
    }
}
async function updateUserFrequency(userFrequency){
    const params = {
        TableName: config.userFrequencytable,
        Key: {
            id: userFrequency.id
        },
        UpdateExpression: "set updatedAt = :updatedAt",
        ExpressionAttributesNames: {
            "#updatedAt": "updatedAt"
        },
        ExpressionAttributeValues: {
            ":updatedAt": userFrequency.updatedAt 
        }
    }
    try {
        const updatedUserFeqquencyResult = await dynamoDB.update(params).promise();
        console.log("Updated user frequency successfully ", updatedUserFeqquencyResult)
        return updatedUserFeqquencyResult;
    } catch (error) {
        console.error("Error saving user frequency:", error);
        throw error;
    }
}

async function insertFsettingWeight(mapper){
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "27113001") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "Weight";
                    if (elements.valueString === "Weight") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const weightSettings = getSettings(type, period, periodUnit, frequency);
                            if (weightSettings) {
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = weightSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = weightSettings.weekDays;
                                fSettings.time = weightSettings.time;
                                // fSettings.extraData = JSON.stringify(bpSettings.extraData);
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if(getFsettingsresult){
                                    await updateFSettings(fSettings)
                                }else{
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsettings for weight ", fSettings)
}
async function FSettingsHba1c(mapper) {
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "313835008") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "HbA1C";
                    if (elements.valueString === "Hba1cNormal") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const hba1cSettings = getSettings(type, period, periodUnit, frequency);
                            if (hba1cSettings) {
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = hba1cSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = hba1cSettings.weekDays;
                                fSettings.time = hba1cSettings.time;
                                // fSettings.extraData = JSON.stringify(bpSettings.extraData);
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if (getFsettingsresult) {
                                    await updateFSettings(fSettings)
                                } else {
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsetting for hba1c ", fSettings)
}

async function insertFsettingGlucose(mapper) {
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "365811003") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "Blood sugar"
                    if (elements.valueString === "gluFastNormal" || elements.valueString === "glucPPNormal" || elements.valueString === "gluRandNormal") {
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const glucoseSettings = getSettings(type, period, periodUnit, frequency);
                            if (glucoseSettings){
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = glucoseSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = glucoseSettings.weekDays;
                                fSettings.time = glucoseSettings.time;
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if (getFsettingsresult) {
                                    await updateFSettings(fSettings)
                                } else {
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsettings for glucose ", fSettings)
}
async function insertFsettingBP(mapper) {
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "75367002") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "Blood Pressure";
                    if (elements.valueString === "BPsysNormal" || elements.valueString === "BPdiaNormal") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const bpSettings = getSettings(type, period, periodUnit, frequency);
                            if (bpSettings) {
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = bpSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = bpSettings.weekDays;
                                fSettings.time = bpSettings.time;
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if (getFsettingsresult) {
                                    await updateFSettings(fSettings)
                                } else {
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsettings for blood pressure ", fSettings)
}
async function userFrequency(mapper) {
    const uuuid = mapper.subject

    let userFrequencySave = {
        id: "",
        createdAt: "",
        updatedAt: ""
    }
    const currentDateAndTime = new Date().toISOString(); 
    const getUserFrequencys = await getUserFrequency(uuuid);
    console.log(getUserFrequencys)
    userFrequencySave.id = uuuid
    if (getUserFrequencys){
        userFrequencySave.updatedAt = currentDateAndTime
        await updateUserFrequency(userFrequencySave)
    }else {
        userFrequencySave.createdAt = currentDateAndTime
        await userFrequency(userFrequencySave); 
    }
    console.log("User frequency saved successfully:", userFrequencySave)
}

async function extractAndSetPatientGoals(mapper) {
    const uuuid = mapper.subject
    //for patientGoalSettings
    let patientGoals = {
        id: "",
        goal_glucose_f_min: "",
        goal_glucose_f_max: "",
        goal_glucose_pp_min: "",
        goal_glucose_pp_max: "",
        goal_glucose_r_min: "",
        goal_glucose_r_max: "",
        goal_glucose_unit: "",
        goal_glucose_state: "",
        goal_bp_sys_min: "",
        goal_bp_sys_max: "",
        goal_bp_dis_min: "",
        goal_bp_dis_max: "",
        goal_bp_unit: "",
        goal_bp_state: "",
        goal_hba1c_min: "",
        goal_hba1c_max: "",
        goal_hba1c_unit: "",
        goal_hba1c_state: "",
        goal_max_target_weight: "",
        goal_min_target_weight: "",
        target_weight_goal_date: "",
        weight_unit: "",
        goal_target_sleep_min: "",
        goal_target_sleep_max: "",
        target_sleep_goal_date: "",
        sleep_unit: "",
        goal_target_excercise_min: "",
        goal_target_excercise_max: "",
        target_excercise_goal_date: "",
        excercise_unit: "",
    }
    patientGoals.id = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            console.log(key)
            if (key === "313835008") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "Hba1cNormal") {
                        let type = "HbA1C"
                        if (elements && elements.scheduledTiming && elements.scheduledTiming.repeat) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            const hba1cSettings = getSettings(type, period, periodUnit, frequency);
                            if (hba1cSettings) {
                                patientGoals.goal_hba1c_max = elements.valueRange.high.value;
                                patientGoals.goal_hba1c_min = elements.valueRange.low.value;
                                patientGoals.goal_hba1c_unit = elements.valueRange.low.unit
                                patientGoals.goal_hba1c_state = hba1cSettings.state
                            }
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
                                if (elements.valueString === "BPdiaNormal") {
                                    patientGoals.goal_bp_dis_max = elements.valueRange.high.value
                                    patientGoals.goal_bp_dis_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "BPsysNormal") {
                                    patientGoals.goal_bp_sys_min = elements.valueRange.high.value;
                                    patientGoals.goal_bp_sys_max = elements.valueRange.low.value;
                                }
                                patientGoals.goal_bp_unit = elements.valueRange.low.unit
                                patientGoals.goal_bp_state = bpSettings.state 
                            }
                        }
                    }
                }
            }
            if (key === "365811003") {
                const element = mapper[key];
                // console.log(element)
                for (const elements of element) {
                    if (elements.valueString === "gluFastNormal" || elements.valueString === "glucPPNormal" || elements.valueString === "gluRandNormal") {
                        let type = "Blood sugar"
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const glucoseSettings = getSettings(type, period, periodUnit, frequency);
                            if (glucoseSettings) {
                                const randomId = uuidv4();
                                if (elements.valueString === "gluRandNormal") {
                                    patientGoals.goal_glucose_r_max = elements.valueRange.high.value
                                    patientGoals.goal_glucose_r_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "glucPPNormal") {
                                    patientGoals.goal_glucose_pp_max = elements.valueRange.high.value
                                    patientGoals.goal_glucose_pp_min = elements.valueRange.low.value
                                }
                                if (elements.valueString === "gluFastNormal") {
                                    patientGoals.goal_glucose_f_min = elements.valueRange.high.value;
                                    patientGoals.goal_glucose_f_max = elements.valueRange.low.value;
                                }
                                patientGoals.goal_glucose_unit = elements.valueRange.low.unit
                                patientGoals.goal_glucose_state = glucoseSettings.state
                            }
                        }
                    }
                }
            }
            if (key === "27113001") {
                const element = mapper[key];
                for (const elements of element) {
                    if (elements.valueString === "Weight") {
                        let type = "Weight";
                        if (elements && elements.scheduledTiming) {
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            const weightSettings = getSettings(type, period, periodUnit, frequency);
                            if (weightSettings) {
                                // patientGoals.goal_max_target_weight = elements.valueRange.high.value
                                // patientGoals.goal_min_target_weight = elements.valueRange.low.value
                                patientGoals.weight_unit = weightSettings.unit
                            }
                        }
                    }
                }
            }
            if (key === "258158006"){
                const element = mapper[key]
                for(const elements of element){
                    if(elements.valueString === "Sleep"){
                        let type = "Sleep";
                        if(elements && elements.scheduledTiming){
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const sleepSettings = getSettings(type, period, periodUnit, frequency);
                            if(sleepSettings){
                                // patientGoals.goal_target_sleep_min = elements.valueRange.high.value
                                // patientGoals.goal_target_sleep_max = elements.valueRange.low.value
                                patientGoals.sleep_unit = sleepSettings.unit
                            }
                        }
                    }
                }
            }
            if (key === "256235009"){
                const element = mapper[key];
                for(const elements of element){
                    if(elements.valueString === "Exercise"){
                        let type = "Exercise";
                        if(elements && elements.scheduledTiming){
                            console.log(elements.scheduledTiming)
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const excerciseSettings = getSettings(type, period, periodUnit, frequency);
                            if(excerciseSettings){
                                
                                patientGoals.excercise_unit = excerciseSettings.unit
                            }
                        }
                    }
                }
            }
        }
    }
    const getPatientGoalSettingsResult = await getPatientGoalSettings(patientGoals);
    console.log(getPatientGoalSettingsResult)
    if(getPatientGoalSettingsResult){
        await updatePatientGoalSettings(patientGoals)
    }else{
        await patientGoalSettings(patientGoals)
    }
    console.log("Patient goals saved ", patientGoals);
}
async function FSettingsExercise(mapper){
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "256235009") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "Exercise";
                    if (elements.valueString === "Exercise") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const excerciseSettings = getSettings(type, period, periodUnit, frequency);
                            if (excerciseSettings) {
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = excerciseSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = excerciseSettings.weekDays;
                                fSettings.time = excerciseSettings.time;
                                // fSettings.extraData = JSON.stringify(bpSettings.extraData);
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if (getFsettingsresult) {
                                    await updateFSettings(fSettings)
                                } else {
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsetting for exercise ", fSettings)
}

async function FSettingSleep(mapper){
    const uuuid = mapper.subject
    const randomSixDigitString = Math.floor(100000 + Math.random() * 900000).toString();
    let fSettings = {
        id: "",
        userFrequencyID: "",
        isNotificationOn: false,
        type: "",
        weekDays: [],
        time: "",
        extraData: ""
    }
    fSettings.userFrequencyID = uuuid
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            if (key === "258158006") {
                const element = mapper[key];
                for (const elements of element) {
                    let type = "Sleep";
                    if (elements.valueString === "Sleep") {
                        if (elements && elements.scheduledTiming) {
                            let period = elements.scheduledTiming.repeat.period;
                            let periodUnit = elements.scheduledTiming.repeat.periodUnit;
                            let frequency = elements.scheduledTiming.repeat.frequency;
                            let event = elements.scheduledTiming.event
                            const sleepSettings = getSettings(type, period, periodUnit, frequency);
                            if (sleepSettings) {
                                fSettings.id = randomSixDigitString;
                                fSettings.isNotificationOn = sleepSettings.isNotificationOn;
                                fSettings.type = type;
                                fSettings.weekDays = sleepSettings.weekDays;
                                fSettings.time = sleepSettings.time;
                                // fSettings.extraData = JSON.stringify(bpSettings.extraData);
                                const getFsettingsresult = await getFsettings(fSettings)
                                console.log(getFsettingsresult)
                                if (getFsettingsresult) {
                                    await updateFSettings(fSettings)
                                } else {
                                    await FSettings(fSettings);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("fsetting for sleep ", fSettings)
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

            const patientGoalsresult = await extractAndSetPatientGoals(mapper);
            // console.log("Patient goals result is", patientGoalsresult);
            const userFrequncyResult = await userFrequency(mapper)
            // console.log("User frequency result is", userFrequncyResult);
            const fsettingsHba1cResutl = await FSettingsHba1c(mapper)
            // console.log("Fsettings Hba1c result is", fsettingsHba1cResutl);
            const fsettingsBpResult = await insertFsettingBP(mapper)
            // console.log("Fsettings Bp result is", fsettingsBpResult);
            const fsettingsGlucoseResult = await insertFsettingGlucose(mapper)
            // console.log("Fsettings Glucose result is", fsettingsGlucoseResult);
            const fsettingsWeightReuslt = await insertFsettingWeight(mapper)
            // console.log("Fsettings Weight result is", fsettingsWeightReuslt);
            const fsettingsExcersiseResult = await FSettingsExercise(mapper)
            // console.log("Fsettings Exercise result is", fsettingsExcersiseResult);
            const fsettingsleepResult = await FSettingSleep(mapper)
            // console.log("Fsettings Sleep result is", fsettingsleepResult);
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