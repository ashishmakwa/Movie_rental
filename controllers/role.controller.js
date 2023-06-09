const Role = require('../models/role.model')
const Joi = require('joi')
const Logger = require('./logger.controller')

//add role
const addRole = async (req, res) => {
    try {
        let roleSchema = Joi.object().keys({
            role_name: Joi.string().required(),
            permission_id: Joi.array().required()
        })
        const error = roleSchema.validate(req.body).error
        if (error) {
            Logger.authLogger.log('error', 'Validation error "addRole"')
            return res.status(200).send({
                is_error: true,
                statusCode: 406,
                message: error.details[0].message
            })
        } else {
            const role = await Role.create(req.body)
            Logger.authLogger.log('info', 'Role Created "addRole"')
            return res.status(201).send({
                is_error: false,
                statusCode: 201,
                message: 'role created',
                data: role
            })
        }

    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "addRole"')
        res.status(500).send({
            error: true,
            message: 'internal error'
        })
    }

}

//get all role 
const getRole = async (req, res) => {
    try {
        const roles = await Role.findAll()
        Logger.authLogger.log('info', 'get Roles "getRole"')
        return res.status(200).send({
            error: false,
            Role: roles
        })
    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "getRole"')
        res.status(500).send({
            error: true,
            message: 'internal error'
        })
    }
}

//get role by id
const getRolebyid = async (req, res) => {
    try {
        id = req.params.id
        const role = await Role.findOne({
            where: {
                permission_id: id
            }
        })
    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "getRolebyid"')
        res.status(500).send({
            error: true,
            message: 'internal error'
        })
    }
}

//edit role 
const editRole = async (req, res) => {
    try {
        let roleSchema = Joi.object().keys({
            role_name: Joi.string(),
            permission_id: Joi.array()
        })
        const error = roleSchema.validate(req.body).error
        if (error) {
            Logger.authLogger.log('error', 'Validation error "editRole"')
            return res.status(200).send({
                is_error: true,
                statusCode: 406,
                message: error.details[0].message
            })
        } else {
            id = req.params.id
            const role = await Role.update(req.body, {
                where: {
                    id: id
                }
            })
            Logger.authLogger.log('info', 'Role Updated "editRole"')
            return res.status(200).send({
                error: false,
                message: 'updated'
            })
        }
    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "editRole"')
        res.status(500).send({
            error: true,
            message: 'internal error'
        })
    }
}

//delet role
const deleteRole = async (req, res) => {
    try {
        id = re.body.id
        const role = await Role.destroy({
            where: {
                permision_id: id
            }
        })
        Logger.authLogger.log('info', 'Role Deleted "editRole"')
        return res.status(200).send({
            error: true,
            message: 'role deleted successfully'
        })

    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "deleteRole"')
        res.status(500).send({
            error: true,
            message: 'internal error'
        })
    }
}

module.exports = {
    addRole,
    getRole,
    getRolebyid,
    editRole,
    deleteRole
}