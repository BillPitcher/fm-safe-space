

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class SafeSpaceApp extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(userId, options = {}) {
        super(options);
        this.userId = userId;
        const user = game.users.get(userId);
        this.userName = user.name;
        this.pronouns = user.pronouns;
    }

    static DEFAULT_OPTIONS = {
        id: "safeSpaceApp-form",
        position: {
            width: 236,
            height: "auto",
        },
        tag: "div", // The default is "div"
        window: {
            icon: "fa-solid fa-hand", // You can now add an icon to the header
            title: "Safe Space"
        },
        actions: {
            doButton: SafeSpaceApp.doButton,
            doPause: SafeSpaceApp.doPause,
            doMsg: SafeSpaceApp.doMsg
        }
    }
    static PARTS = {
        tool: {
            template: `modules/fm-safe-space/templates/safe-space.hbs`
        }
    }
    _prepareContext() {
        return {
            isGm: game.user.isGM,
            userId: this.userId,
            userName: this.userName,
            pronouns: this.pronouns
        };
    }
    static async doButton(event, target) {
        console.log(event);
        console.log(target);
    }
    static async doPause(event, target) {
        game.togglePause(true);
    }
    static async doMsg(event, target) {

    }
}