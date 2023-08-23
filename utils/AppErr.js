
//Setting AppErr to Throw Errors with Manually Given Status Codes:

class AppErr extends Error{
    constructor(message,status_code){
        super(message);
        this.status_code = status_code || 500;
    }
}

module.exports = AppErr;