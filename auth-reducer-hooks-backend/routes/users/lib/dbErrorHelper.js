function getUniqueErrorMessage(err) {
    let message = err.message.match(/"(.*?)"/g);
    return `${message[0].replace(/["]+/g, "")} already exists`;
}

function getErrorMessage(err) {
    let message = "";
    console.log(err)
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default: message = 'something went wrong'
        }
    } else if (err.message) {
        return err.message
    } else {
        for (let errName in err.errors) { // if its an object error
            if (err.error[errName].message) {
                message = err.errors[errName].message
            }
        }
    }
    return message
}

module.exports = getErrorMessage;