import Settings from "../Settings";
import SadnessChan from "../SadnessChan";
import Utils from "../Utils";
import settingNames from "../lists/settingEnum";

class PreCreateChatMessage {
    private static _instance: PreCreateChatMessage;

    private constructor() {
    }

    public static getInstance(): PreCreateChatMessage {
        if (!PreCreateChatMessage._instance) PreCreateChatMessage._instance = new PreCreateChatMessage();
        return PreCreateChatMessage._instance;
    }

    public preCreateChatMessageHook(message: any, options: any): void {
        const content = message?.content;
        const user = message?.user;
        const counter = Settings.getCounter();
        const command = SadnessChan.getCmd();
        if (!(user && content)) return;

        if (!content.startsWith(command)) return;

        if (content === command) return this._executeStatsCmd(message, options, user);

        const args = content.replace(command + ' ', '');
        this.executeCommand(args, user);
    }

    private _executeResetCmd(args: any ) {
        console.log("RESETED" + args);
    }

    private _executeStatsCmd(message: any, options: any, user: any) {
        const counter = Settings.getCounter();

        if (counter && counter[user]) {
            this.sendStatsMessage(message, options, counter[user], user);
            Utils.debug('Sad stats displayed.');
        }
    }

    public executeCommand (args: string, user: any) {
        const resetCommand = settingNames.RESET_CMD;
        if (args.startsWith(settingNames.RESET_CMD)) {
            return this._executeResetCmd(args.replace(resetCommand+ ' ', ''));
        }
    }

    public sendStatsMessage(message: any, options: any, userData: any, userId: string): void {
        message.content = SadnessChan.getStatsMessage(userData);
        this._prepareMessage(message, options, userId);
    }

    private _prepareMessage(message: any, options: any, userId: string): void {
        message.whisper = [userId];
        message.speaker = {alias: `${Utils.moduleTitle}`};
        options.chatBubble = false;
    }
}

export default PreCreateChatMessage.getInstance();