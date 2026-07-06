function sendError(response, codeStatus, message) {
    response.writeHead(codeStatus, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify( message ));
}


module.exports = {
    sendError
};