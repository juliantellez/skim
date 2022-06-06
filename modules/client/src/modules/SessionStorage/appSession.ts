const SESSION_KEY = "skim.v1"

export interface SessionConfig {
    "twitter.authToken": string,
    "twitter.authTokenSecret": string,
    "twitter.accessToken"?: string,
    "twitter.accessTokenSecret"?: string
}

class AppSession {
    private key: string
    constructor(key: typeof SESSION_KEY) {
        this.key = key
    }

    getConfig(): SessionConfig {
        const sessionItem = sessionStorage.getItem(this.key)
        const config: SessionConfig = JSON.parse(atob(sessionItem || "") || "{}")
        return config
    }

    setConfig(config: SessionConfig): void {
        sessionStorage.setItem(this.key, btoa(JSON.stringify(config)))
    }

    getItem(key: keyof SessionConfig) {
        return this.getConfig()[key]
    }

    setItem(key: keyof SessionConfig, value: string) {
        const config = this.getConfig()
        
        this.setConfig({
            ...config,
            [key]: value
        })
    }

    clear() {
        sessionStorage.clear()
    }
}

const appSession = new AppSession(SESSION_KEY)

export {
    appSession,
    AppSession
}
