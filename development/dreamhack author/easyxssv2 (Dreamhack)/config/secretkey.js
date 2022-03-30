module.exports = {
    secretKey : process.env.SECRET_KEY,
    option : {
        algorithm : "HS256",
        expiresIn : "999999999999m",
        issuer : "challenges"
    }
}