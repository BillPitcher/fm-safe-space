const MODULE_ID = 'fm-safe-space';

Hooks.once('init', () => {

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
                //await findNextToken()
            }
        };
    });

});