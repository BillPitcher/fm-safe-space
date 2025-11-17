import {SafeSpaceApp} from "./safe-space-app.mjs";
import {SocketController} from "./SocketController.mjs";
import {SafeSpaceDelegate} from "./safe-space-delegate.mjs";

const MODULE_ID = 'fm-safe-space';

Hooks.once('init', () => {
    console.log(`✅ ${MODULE_ID} | Initializing...`);
    const myPackage = game.modules.get(MODULE_ID); // or just game.system if you're a system
    myPackage.socketController = new SocketController(MODULE_ID, SafeSpaceDelegate);

    Hooks.on("getSceneControlButtons", (controls) => {
        const tokenControls = controls["tokens"]; // "tokens", not "token"
        if (!tokenControls) return;
        tokenControls.tools["safe-space"] = {
            name: "safe-space",
            title: "Safe Space",
            icon: "fa-solid fa-hand",
            order: 80,
            visible: true,
            button: true,
            onChange: async () => {
                new SafeSpaceApp(game.userId).render(true);
                game.modules.get(MODULE_ID).socketController.emit("STOP", {"userID" : game.userId});
            }
        };
    });
    /*
    Hooks.on("renderSafeSpaceApp", (controls) => {
        console.log("renderSafeSpaceApp", controls);
        game.togglePause;
    });*/

});