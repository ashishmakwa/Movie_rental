console.log(process.env.HOST)
module.exports = {
    HOST: process.env.HOST,
    USER: process.env.X,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    DIALECT: process.env.DIALECT,
    PORT:process.env.PORT,
    SECRET :process.env.SECRET_KEY,
    EXPIRE_TOKEN :'4h'
}




