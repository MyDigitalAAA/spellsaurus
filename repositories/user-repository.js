'use strict'

// Bookshelf
const bookshelf = require('../database/connection').bookshelf

// Hashing and passwords
const bcrypt = require('bcrypt')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const UserModel = require("../models/UserValidation")
v.addSchema(UserModel, "/UserModel")

// Validations
const regexInt = RegExp(/^[1-9]\d*$/)
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../models/Errors')

class UserRepository {
    constructor() {
        this.model = bookshelf.Model.extend({
            tableName: 'user',
        })
    }
    
    set model(model) {
        this._model = model
    }

    get model() {
        return this._model
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this._model.forge()
            .fetchAll()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get users"))
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            this._model.forge()
            .where({ 'id' : id })
            .fetch()
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get user"))
            })
        })
    }

    // Check if object is null
    isEmptyObject = (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        } else {
            return false
        }
    }

    // Check if script injection attempt
    isXSSAttempt = (string) => {
        if (regexXSS.test(string)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = UserRepository