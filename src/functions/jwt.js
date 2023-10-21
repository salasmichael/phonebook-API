const jwt = require('jsonwebtoken');

const generarJWT = async( uid ) =>{

    return new Promise( (resolve, reject)=>{
        payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn:'32h'
        }, (err, token)=>{

            if( err ){
                console.log(err);
                reject('No pudo generar el JWT');
            }else{
                resolve( token )
            }
    
        });

    });

}

module.exports = {
    generarJWT
}
