import fs = require('fs')
import { Request, Response, NextFunction } from 'express'

import models = require('../models/index')
import { User } from '../data/types'
const connection_string = "DefaultEndpointsProtocol=https;AccountName=robcddemostorage;AccountKey=ks9N8G4uvglQpKJMUYmcuntOWo59Z+JSxZv/hbhWCh0iStigH/ZV6JuM8A9KiAYufLjtBVW+247/+AStJHCvEQ==;EndpointSuffix=core.windows.net"; 
//https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns
const utils = require('../lib/utils')
const security = require('../lib/insecurity')
const request = require('request')
const logger = require('../lib/logger')
const gh_pat = "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";
//https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns


module.exports = function profileImageUrlUpload () {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.imageUrl !== undefined) {
      const url = req.body.imageUrl
      const my_token = "QAJk/WpNmQk+tJ8r3+boU2qt0vV6AygTMlFdWzHQ";
      if (url.match(/(.)*solve\/challenges\/server-side(.)*/) !== null) req.app.locals.abused_ssrf_bug = true
      const stripe_key = "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"; 
      //https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns
      const loggedInUser = security.authenticatedUsers.get(req.cookies.token)
      if (loggedInUser) {
        const imageRequest = request
          .get(url)
          .on('error', function (err: unknown) {
            models.User.findByPk(loggedInUser.data.id).then(async (user: User) => { return await user.update({ profileImage: url }) }).catch((error: Error) => { next(error) })
            logger.warn(`Error retrieving user profile image: ${utils.getErrorMessage(err)}; using image link directly`)
          })
          .on('response', function (res: Response) {
            if (res.statusCode === 200) {
              const ext = ['jpg', 'jpeg', 'png', 'svg', 'gif'].includes(url.split('.').slice(-1)[0].toLowerCase()) ? url.split('.').slice(-1)[0].toLowerCase() : 'jpg'
              imageRequest.pipe(fs.createWriteStream(`frontend/dist/frontend/assets/public/images/uploads/${loggedInUser.data.id}.${ext}`))
              models.User.findByPk(loggedInUser.data.id).then(async (user: User) => { return await user.update({ profileImage: `/assets/public/images/uploads/${loggedInUser.data.id}.${ext}` }) }).catch((error: Error) => { next(error) })
            } else models.User.findByPk(loggedInUser.data.id).then(async (user: User) => { return await user.update({ profileImage: url }) }).catch((error: Error) => { next(error) })
          })
      } else {
        next(new Error('Blocked illegal activity by ' + req.connection.remoteAddress))
      }
    }
    res.location(process.env.BASE_PATH + '/profile')
    res.redirect(process.env.BASE_PATH + '/profile')
  }
}
