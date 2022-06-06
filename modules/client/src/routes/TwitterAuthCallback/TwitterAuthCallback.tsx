import React, { useEffect, useState } from 'react';
import {Navigate} from "react-router-dom"
import config from '../../config';
import { appSession } from '../../modules/SessionStorage/appSession';

import './TwitterAuthCallback.css';

function TwitterAuthCallback() {
    const [accessToken, dispatchAccessToken] = useState("")
    const [accessTokenSecret, dispatchAccessTokenSecret] = useState("")

    useEffect(()=> {
        const appConfig = appSession.getConfig()
        if(appConfig['twitter.accessToken'] && appConfig['twitter.accessTokenSecret']) {
            return
        }

        const params = new URLSearchParams(window.location.search)
        const oauthToken =  params.get('oauth_token')
        const oauthVerifier = params.get('oauth_verifier') || ""

        const {
            "twitter.authToken": authToken,
            "twitter.authTokenSecret": authTokenSecret
        } = appSession.getConfig()

        if (oauthToken !== authToken) {
            appSession.clear()
            throw new Error("Token is corrupted");
        }

        const accessTokenParams = new URLSearchParams({
            authToken: oauthToken,
            authTokenSecret,
            oauthVerifier,
        })

        fetch(config.ACCESS_TOKEN_URL + "?" + accessTokenParams)
        .then(data => data.json())
        .then((data: {accessToken: string, accessTokenSecret: string }) => {
            if(!data.accessToken || !data.accessTokenSecret) {
                return
            }

            appSession.setItem("twitter.accessToken", data.accessToken)
            appSession.setItem("twitter.accessTokenSecret", data.accessTokenSecret)

            dispatchAccessToken(data.accessToken)
            dispatchAccessTokenSecret(data.accessTokenSecret)
        })
        .catch(error => {
            console.log({error})
        })
    }, [])

  const appConfig = appSession.getConfig()
  console.log(appConfig, appConfig['twitter.accessToken'], appConfig['twitter.accessTokenSecret'])
  if(accessToken && accessTokenSecret) {
      return <Navigate to="/user" />
  }

  return (
    <div className="TwitterAuthCallback">
      <header className="TwitterAuthCallback-header">
        Fetching Access Token
      </header>
    </div>
  );
}

export default TwitterAuthCallback;
