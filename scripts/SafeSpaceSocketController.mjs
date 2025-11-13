import {SafeSpaceApp} from "./safe-space-app.mjs";

export class SafeSpaceSocketController {
    constructor() {
        this.identifier = "module.fm-safe-space" // whatever event name is correct for your package
        this.registerSocketHandlers()
    }

    registerSocketHandlers() {

        game.socket.on(this.identifier, ({ type, payload }) => {
            switch (type) {
                case "LOG":
                    this.#handleLog(payload);
                    break;
                case "STOP":
                    this.#handleStop(payload);
                    break;
                default:
                    throw new Error('unknown type');
            }
        });
    }

    emit(type, payload) {
        return game.socket.emit(this.identifier, { type, payload })
    }

    #handleLog(arg) {
        console.log(arg);
    }

    #handleStop(arg) {
        if (game.user.isGM ) {
            new SafeSpaceApp(arg.userID).render(true);
        }

    }
}