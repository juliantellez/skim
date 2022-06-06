import {OAuth} from "oauth"
import config from "../config"

const verifyCredentials = (event, context, callback) => {
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

    oAuth.get(
        config.twitter.userCredentials,
        params.accessToken,
        params.accessTokenSecret,
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

export { verifyCredentials }
