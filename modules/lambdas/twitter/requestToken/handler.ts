import {OAuth} from "oauth"
import config from "../config"

const requestToken = (event, context, callback) => {
    const oAuth = new OAuth(
        config.requestUrl,
        config.accessUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorizeCallback,
        config.signatureMethod,
    )
    
    oAuth.getOAuthRequestToken((error, authToken, authTokenSecret) => {
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
                authToken: authToken,
                authTokenSecret: authTokenSecret
              }),
        }
        
        return callback(null, response);
    })
}

export {requestToken}
