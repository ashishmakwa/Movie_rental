const Movie_Rental = require('../models/rentalMovie.model')
const Movies = require('../models/movie.model')
const Joi = require('joi')
const { Op } = require('sequelize')
const Users = require('../models/users.model')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const { validateRentelMovie } = require('../validation/rentelValidation')
const Logger = require('./logger.controller')


//rentel movie
const rental_movie = async (req, res) => {
    try {
        const { error } = validateRentelMovie(req.body)
        if (error) {
            Logger.authLogger.log('error', 'Validation error "rental_movie"')
            return res.status(400).send({
                is_error: true,
                message: error.details[0].message
            })
        } else {
            console.log('else', req.id.id)
            req.body.user_id = req.id.id
            console.log(req.body)
            const movie_rentel = await Movie_Rental.create(req.body)
            // const id = JSON.stringify(movie_rentel.Movie_id)
            console.log(movie_rentel)
            const id  = movie_rentel.Movie_id
            // quantity minus in this movie
            const movie = Movies.update(
                {
                    quantity: Sequelize.literal('quantity - 1')
                },
                {
                    where: { id: id },
                }
            )
            Logger.authLogger.log('info', 'Movie rental "rental_movie"')
            return res.status(200).send({
                is_error: false,
                message: 'movie rented',
                data: movie_rentel
            })
        }
    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "rental_movie"')
        return res.status(400).send({
            is_error: true,
            message: 'Internal Server Error'
        })
    }
}

//return movie
const return_movie = async (req, res) => {
    try {
        const { error } = validateRentelMovie(req.body)
        if (error) {
            Logger.authLogger.log('error', 'Validation error "return_movie"')
            return res.status(400).send({
                is_error: true,
                message: error.details[0].message
            })
        } else {
            req.body.user_id = req.id.id
            const movie_rentel = await Movie_Rental.update({ is_returned: true },
                {
                    where: {
                        Movie_id: req.body.Movie_id
                    }
                })
            const movie_rentelID = await Movie_Rental.findOne({
                where: {
                    [Op.or]: [
                        {
                            Movie_id: req.body.Movie_id,
                            user_id: req.id.id
                        }
                    ]
                }
            })
            // quantity minus in this movie
            const id = JSON.stringify(movie_rentelID.Movie_id)
            const movie = Movies.update({
                quantity: Sequelize.literal('quantity + 1')
            },
                {
                    where: { id: id },
                })
            Logger.authLogger.log('info', 'Movie Return "return_movie"')
            return res.status(200).send({
                is_error: false,
                message: 'movie return',
                data: movie_rentel,
            })
        }
    } catch (error) {
        console.log(error)
        Logger.authLogger.log('error', 'Internal Server Error "return_movie"')
        return res.status(400).send({
            is_error: true,
            message: 'token error'
        })
    }
}
module.exports = {
    rental_movie,
    return_movie
}
