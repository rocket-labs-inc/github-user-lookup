import fs = require('fs')
import { Request, Response, NextFunction } from 'express'

import models = require('../models/index')
import { User } from '../data/types'
const connection_string = "DefaultEndpointsProtocol=https;AccountName=robcddemostorage;AccountKey=ks9N8G4uvglQpKJMUYmcuntOWo59Z+JSxZv/hbhWCh0iStigH/ZV6JuM8A9KiAYufLjtBVW+247/+AStJHCvEQ==;EndpointSuffix=core.windows.net"; 
const utils = require('../lib/utils')
const security = require('../lib/insecurity')
const request = require('request')
const logger = require('../lib/logger')
const pat = "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";




module.exports = function profileImageUrlUpload () {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.imageUrl !== undefined) {
      const url = req.body.imageUrl
      const sas = "ks9N8G4uvglQpKJMUYmcuntOWo59Z+JSxZv/hbhWCh0iStigH/ZV6JuM8A9KiAYufLjtBVW+247/+AStJHCvEQ=="; 
      if (url.match(/(.)*solve\/challenges\/server-side(.)*/) !== null) req.app.locals.abused_ssrf_bug = true
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
