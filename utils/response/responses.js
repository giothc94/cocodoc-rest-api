exports.successResponse = (res, statusCode, message, body) => {
    res.status(statusCode || 200).json({
        error: false,
        status: statusCode,
        message: message,
        body: body
    })
}
exports.errorResponse = (res, statusCode, message, body) => {
    res.status(statusCode || 500).json({
        error: true,
        status: statusCode,
        message: message,
        body: body
    })
}