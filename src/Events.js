class Events {
    callbacks = [];
    nextid = 0;

    emit(eventName,value) {
        this.callbacks.forEach(stored => {
            if (stored.eventName === eventName) {
                stored.callback(value)
            }
        })
    }

    on(eventName, caller, callback) {
        this.nextid += 1;
        this.callbacks.push({
            id: this.nextid,
            eventName,
            caller,
            callback
        });
        return this.nextid
    }

    off(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter(
            (stored) => stored.caller !== caller,
        );
    }

}

export const events = new Events();