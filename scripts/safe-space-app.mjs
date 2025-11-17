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
            left: 200,
            top: 100
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
    static async doPause() {
        game.togglePause(true, { broadcast : true});
    }
    static async doMsg() {
        const chatData = {
            "img" : "modules/fm-safe-space/images/hand.webp",
            "title" : "Safe Space",
            "subtitle" : `${Date().toLocaleString()}`,
            "content" : "Please wait..."
        }
        const formatted = formatMessage( chatData);

        const message = {
            content: formatted,
            style: CONST.CHAT_MESSAGE_STYLES.OOC
        };
        ChatMessage.create(message);
    }
}

function formatMessage( chatData) {
    return `<div class="dnd5e2 chat-card activation-card">
        <section class="card-header description">
            <header class="summary">
                <img src="${chatData.img}" alt="icon"\>
                <div class="name-stacked border">
                    <span class="title">${chatData.title}</span>
                    <div class="subtitle">${chatData.subtitle}</div>
                </div>
            </header>
            <section class="details">
                <div class="wrapper">${chatData.content}</div>
            </section>
        </section>
    </div>`;
}