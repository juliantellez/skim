import {OAuth} from "oauth"
import config from "../config"

const postTweet = (event, context, callback) => {
    const oAuth = new OAuth(
        config.requestUrl,
        config.accessUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorizeCallback,
        config.signatureMethod,
    )

    const body = JSON.parse(event.body)

    oAuth.post(
        config.twitter.v2.tweet,
        body.accessToken,
        body.accessTokenSecret,
        JSON.stringify({
            "text": body.text,
        }),
        "application/json",
        (error, data) => {
            if(error) {
                const response = {
                    statusCode: error.statusCode,
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Credentials" : true,
                      },
                    body: JSON.stringify({
                        error: error.data,
                      }),
                }
    
                return callback(null, response);
            }

            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
                  },
                body: JSON.stringify({ data }),
            }

            return callback(null, response);
        }
    )
}

export { postTweet }

