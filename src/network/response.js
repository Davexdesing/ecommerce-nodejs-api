const success = (res, message, status, data) => {

    const returnMessage = message || '';
    const returnData = data || ""

    res.status(status).json({
        error: false,
        status: status,
        message: message,
        data: data,
    });
}

const error = (res, message, status, data = "") => {

    let statusCode = status || 400;
    let statusMessage = message || 'Internal server error';
    let returnData = data || ""

    res.status(statusCode).json({
        error: true,
        status: statusCode,
        message: statusMessage,
        data: returnData
    });
}

module.exports = {
    error,
    success
}
