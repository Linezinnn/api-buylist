interface IErrorException<Message, Status> {
    getMessage(): Message;
    getStatus(): Status;
}

class ExceptionError<Message, Status> 
extends Error 
implements IErrorException<Message, Status>{
    private _message: Message 
    private _status: Status

    constructor(message: Message, status: Status){
        super()
        this._message = message
        this._status = status
    }

    getMessage(): Message {
        return this._message
    }

    getStatus(): Status {
        return this._status
    }
}

export { ExceptionError, IErrorException }