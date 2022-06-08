import React, { useState } from "react"

import config from "../../config"

import { appSession } from "../SessionStorage/appSession"

const PostTweet: React.FC = () => {
    const [text, setText] = useState("")

    const handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const text = event?.target?.value
        setText(text)
    }

    const handleOnClick = () => {
        const {
            "twitter.accessToken": accessToken,
            "twitter.accessTokenSecret": accessTokenSecret,
      } = appSession.getConfig()
  
        fetch(config.TWITTER_POST_TWEET, {
            method: "POST",
            body: JSON.stringify({
                accessToken,
                accessTokenSecret,
                text,
            })
        })
    }

    return (
        <div>
            <textarea onChange={handleOnChange} value={text} />
            <button onClick={handleOnClick}>Tweet Now</button>
        </div>
    )
}

export {PostTweet}
