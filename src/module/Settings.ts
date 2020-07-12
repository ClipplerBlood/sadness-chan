import utils from "./Utils";
import settingsList from "./lists/settingsList";

class Settings {
    private static _instance: Settings;
    private readonly _settingsList = settingsList;

    private constructor() {
    }

    public static getInstance(): Settings {
        if (!Settings._instance) Settings._instance = new Settings();
        return Settings._instance;
    }

    private _registerSetting(key: string, data: any): void {
        game.settings.register(utils.moduleName, key, data);
    }

    public getSetting(key: string): any {
        const setting = game.settings.get(utils.moduleName, key);
        try {
            return JSON.parse(setting);
        } catch (error) {
            return {};
        }
    }

    public setSetting(key: string, data: any): Promise<any> {
        return game.settings.set(utils.moduleName, key, JSON.stringify(data));
    }

    public registerSettings(): void {
        this._settingsList.forEach((setting: any): void => {
            this._registerSetting(setting.key, setting.data);
        });

        utils.debug('Settings registered', false);
    }

}

export default Settings.getInstance();