import {SafeSpaceApp} from "./safe-space-app.mjs";

export const SafeSpaceDelegate = {
    handle(type, payload) {
        switch (type) {
            case "STOP":
                if (game.user.isGM ) {
                    new SafeSpaceApp(payload.userID).render(true);
                }
                break;
                default:
                    console.warn(payload);
                    break;
        }
    }
};