import {OAuth} from "oauth"
import config from "../config"

const accessToken = (event, context, callback) => {
    const oAuth = new OAuth(
        config.requestUrl,
        config.accessUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorizeCallback,
        config.signatureMethod,
    )

    const params = event.queryStringParameters

    oAuth.getOAuthAccessToken(
        params.authToken,
        params.authTokenSecret,
        params.oauthVerifier,
        (error, accessToken, accessTokenSecret) => {
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
            body: JSON.stringify({
                accessToken,
                accessTokenSecret
              }),
        }

        return callback(null, response);
    })
}

export {accessToken}
