
export class SocketController {
    constructor(moduleID, delegate) {
        if (!moduleID ) {
            throw new Error("SocketController: Module ID is required");
        }
        this.identifier = "module." + moduleID;
        if (!moduleID ) {
            throw new Error("SocketController: Module Delegate is required");
        }
        this.delegate = delegate;
        this.registerSocketHandlers()
    }

    registerSocketHandlers() {

        game.socket.on(this.identifier, ({ type, payload }) => {
            if (type === "LOG") {
                this.#handleLog(payload);
            } else {
                this.delegate.handle(type, payload);
            }
        });
    }

    emit(type, payload) {
        return game.socket.emit(this.identifier, { type, payload })
    }

    #handleLog(arg) {
        console.log(arg);
    }

}