function getGlucoseSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === 'd' && frequency === 1) {
        const settingsTime = "07:00:00"
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
        return {
            weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    } else if (period === 1 && periodUnit === 'wk') {
        if (frequency === 1) {
            const settingsTime = "07:00:00"
            const targetDate = new Date();
            const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
            return {
                weekDays: ["Sun"],
                isNotificationOn: true,
                time: combinedDateTime.toISOString()
            };
        } else if (frequency === 2) {
            const settingsTime = "07:00:00"
            const targetDate = new Date();
            const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
            return {
                weekDays: ["Sun", "Wed"],
                isNotificationOn: true,
                time: combinedDateTime.toISOString()
            };
        } else if (frequency === 3) {
            return {
                weekDays: ["Sun", "Wed", "Fri"],
                isNotificationOn: true,
                time: ["07:00:00", "16:00:00"]
            };
        } else if (frequency === 4) {
            return {
                weekDays: ["Sun", "Tue", "Thu", "Sat"],
                isNotificationOn: true,
                time: ["07:00:00", "16:00:00"]
            };
        } else if (frequency === 5) {
            return {
                weekDays: ["Sun", "Mon", "Wed", "Fri", "Sat"],
                isNotificationOn: true,
                time: ["07:00:00", "16:00:00", "20:00:00"]
            };
        }
    }
    return null;
}

function getBloodPressureSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === 'wk') {
        if (frequency === 1) {
            const settingsTime = "07:30:00";
            const targetDate = new Date();
            const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
            return {
                weekDays: ["Sun"],
                isNotificationOn: true,
                time: combinedDateTime.toISOString()
            };
        } else if (frequency === 2) {
            const settingsTime = "07:30:00";
            const targetDate = new Date();
            const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
            return {
                weekDays: ["Sun", "Wed"],
                isNotificationOn: true,
                time: combinedDateTime.toISOString()
            };
        } else if (frequency === 3) {
            return {
                weekDays: ["Sun", "Wed", "Fri"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00"]
            };
        } else if (frequency === 4) {
            return {
                weekDays: ["Sun", "Tue", "Thu", "Sat"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00"]
            };
        } else if (frequency === 5) {
            return {
                weekDays: ["Sun", "Mon", "Wed", "Fri", "Sat"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00", "20:00:00"]
            };
        }
    } else if (period === 1 && periodUnit === "d") {
        if (frequency === 1) {
            const settingsTime = "07:30:00";
            const targetDate = new Date();
            const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
            return {
                weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                isNotificationOn: true,
                time: combinedDateTime.toISOString()
            };
        }
    }
    return null;
}


function getHba1cSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === 'a' && frequency === 1) {
        const settingsTime = "07:30:00";
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
        return {
            weekDays: ["Mon"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    }
    return null;
}

function getWeightSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "wk" && frequency === 1) {
        const settingsTime = "08:00:00";
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
        return {
            weekDays: ["Sun"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    } else if ((period === 1 && periodUnit === "mo" || periodUnit === "15days") && frequency === 1) {
        const settingsTime = "08:00:00";
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);
        return {
            weekDays: ["Sun"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    }
    return null;
}

function getExerciseSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "d" && frequency === 1) {
        const settingsTime = "08:00:00"; 
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);

        return {
            weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    }
    return null;
}

function getSleepSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "d" && frequency === 1) {
        const settingsTime = "08:00:00"; 
        const targetDate = new Date();
        const combinedDateTime = combineDateAndTime(settingsTime, targetDate);

        return {
            weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            isNotificationOn: true,
            time: combinedDateTime.toISOString()
        };
    }
    return null;
}

function getSettings(type, period, periodUnit, frequency) {
    switch (type) {
        case "Glucose":
            return getGlucoseSettings(period, periodUnit, frequency);
        case "Blood Pressure":
            return getBloodPressureSettings(period, periodUnit, frequency);
        case "Hba1c":
            return getHba1cSettings(period, periodUnit, frequency);
        case "Weight":
            return getWeightSettings(period, periodUnit, frequency);
        case "Exercise":
            return getExerciseSettings(period, periodUnit, frequency);
        case "Sleep":
            return getSleepSettings(period, periodUnit, frequency);
        default:
            return null;
    }
}
function combineDateAndTime(settingsTime, targetDate) {
    const [hours, minutes, seconds] = settingsTime.split(':').map(Number);

    const targetDateTime = new Date(targetDate);

    targetDateTime.setHours(hours);
    targetDateTime.setMinutes(minutes);
    targetDateTime.setSeconds(seconds);

    return targetDateTime;
}

module.exports = {
    getSettings
}