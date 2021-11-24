global.error = function (message, errors) {
    return {
        success: false,
        message: message,
        data: errors
    };
} 

global.ok = function (message, data) {
    return {
        success: true,
        message: message,
        data: data
    };
}