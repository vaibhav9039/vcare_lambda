function getGlucoseSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === 'd' && frequency === 1) {
        return {
            weekDays: ["Daily"],
            isNotificationOn: true,
            time: "07:00:00"
        };
    } else if (period === 1 && periodUnit === 'wk') {
        if (frequency === 1) {
            return {
                weekDays: ["Sunday"],
                isNotificationOn: true,
                time: "07:00:00"
            };
        } else if (frequency === 2) {
            return {
                weekDays: ["Sunday", "Wednesday"],
                isNotificationOn: true,
                time: "07:00:00"
            };
        } else if (frequency === 3) {
            return {
                weekDays: ["Sunday", "Wednesday", "Friday"],
                isNotificationOn: true,
                time: ["07:00:00", "16:00:00"]
            };
        } else if (frequency === 4) {
            return {
                weekDays: ["Sunday", "Tuesday", "Thursday", "Saturday"],
                isNotificationOn: true,
                time: ["07:00:00", "16:00:00"]
            };
        } else if (frequency === 5) {
            return {
                weekDays: ["Sunday", "Monday", "Wednesday", "Friday", "Saturday"],
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
            return {
                weekDays: ["Sunday"],
                isNotificationOn: true,
                time: "07:30:00"
            };
        } else if (frequency === 2) {
            return {
                weekDays: ["Sunday", "Wednesday"],
                isNotificationOn: true,
                time: "07:30:00"
            };
        } else if (frequency === 3) {
            return {
                weekDays: ["Sunday", "Wednesday", "Friday"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00"]
            };
        } else if (frequency === 4) {
            return {
                weekDays: ["Sunday", "Tuesday", "Thursday", "Saturday"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00"]
            };
        } else if (frequency === 5) {
            return {
                weekDays: ["Sunday", "Monday", "Wednesday", "Friday", "Saturday"],
                isNotificationOn: true,
                time: ["07:30:00", "16:00:00", "20:00:00"]
            };
        }
    } else if (period === 1 && periodUnit === "d") {
        if (frequency === 1) {
            return {
                weekDays: ["Daily"],
                isNotificationOn: true,
                time: "07:30:00"
            };
        }
    }
    return null;
}


function getHba1cSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === 'a' && frequency === 1) {
        return {
            weekDays: ["Monday"],
            isNotificationOn: true,
            time: "07:30:00"
        };
    }
    return null;
}

function getWeightSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "wk" && frequency === 1) {
        return {
            weekDays: ["Sunday"],
            isNotificationOn: true,
            time: "08:00:00"
        };
    } else if ((period === 1 && periodUnit === "mo" || periodUnit === "15days") && frequency === 1) {
        return {
            weekDays: ["Sunday"],
            isNotificationOn: true,
            time: "08:00:00"
        };
    }
    return null;
}

function getExerciseSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "d" && frequency === 1) {
        return {
            weekDays: ["Daily"],
            isNotificationOn: true,
            time: "08:00:00"
        };
    }
    return null;
}

function getSleepSettings(period, periodUnit, frequency) {
    if (period === 1 && periodUnit === "d" && frequency === 1) {
        return {
            weekDays: ["Daily"],
            isNotificationOn: true,
            time: "08:00:00"
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

module.exports = {
    getSettings
}