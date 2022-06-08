import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

import config from '../../config';

import { appSession } from '../../modules/SessionStorage/appSession';
import { PostTweet } from '../../modules/Twitter/PostTweet';

import "./User.css"
interface UserProfile {
    name: string
    screenName: string
    description: string
    followers: number
    following: number
    statuses: number
    imageUrl: string
    bannerUrl: string
}

function User() {
    const [user, setUser] = useState<UserProfile>({
        name:"",
        screenName:"",
        description:"",
        followers:0,
        following:0,
        statuses:0,
        imageUrl:"",
        bannerUrl:"",
    })

    useEffect(() => {
      const {
          "twitter.accessToken": accessToken,
          "twitter.accessTokenSecret": accessTokenSecret,
    } = appSession.getConfig()

    const params = new URLSearchParams({
        accessToken: accessToken || "",
        accessTokenSecret: accessTokenSecret|| "",
    })

    fetch(config.TWITTER_VERIFY_CREDENTIALS + "?" + params)
      .then(response => response.json())
      .then(response => {
          const user = JSON.parse(response.data)
          setUser({
            name: user.name,
            screenName: user.screen_name,
            description: user.description,
            followers: user.followers_count,
            following: user.friends_count,
            statuses: user.statuses_count,
            imageUrl: user.profile_image_url_https,
            bannerUrl: user.profile_banner_url,
          })
      })
      .catch(error => {
          console.log({error})
      })
  }, [])

  return (
    <div className="User">
      <header className="User-header">
        <Avatar alt={user.name} src={user.imageUrl} />
      </header>
      <div className='User-body'>
        <div>{user.description}</div>
        <div>Followers: {user.followers}</div>
        <div>Following: {user.following}</div>
        <div>Statuses: {user.statuses}</div>
      </div>
      <PostTweet />
    </div>
  );
}

export default User;
