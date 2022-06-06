import React from "react"
import config from "../../config"
import { appSession } from "../SessionStorage/appSession"

const ConnectToTwitter:React.FC = () => {
    const handleClick = () => {
        fetch(config.REQUEST_TOKEN_URL)
            .then(data =>  data.json())
            .then((data: {authToken: string, authTokenSecret: string}) => {
                const {authToken, authTokenSecret} = data

                appSession.setConfig({
                    "twitter.authToken": authToken,
                    "twitter.authTokenSecret": authTokenSecret
                })

                window.location.assign(config.AUTHENTICATE_URL+'?oauth_token='+authToken)
            })
    }

    return (
        <button onClick={handleClick}>
            Connect to Twitter
        </button>
    )
}

export {ConnectToTwitter}
