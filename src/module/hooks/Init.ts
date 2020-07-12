import Settings from "../Settings";
import Utils from "../Utils";

class Init {
    private static _instance: Init;

    private constructor() {
    }

    public static getInstance(): Init {
        if (!Init._instance) Init._instance = new Init();
        return Init._instance;
    }

    public async initHook(): Promise<void> {
        Settings.registerSettings();
        Settings.resetStorage();
        Utils.debug('Prepared to collect tears.');
    }
}

export default Init.getInstance();