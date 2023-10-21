require("dotenv").config();

const bcrypt = require('bcrypt');
const Auth = require("../models/auth.model");
const { generarJWT } = require('../functions/jwt');

const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.login = async (req, res) => {
    const { userEmail, userPassword  } = req.body;
  
    try {
      const foundUser = await Auth.findOne({
        where: { email: userEmail }
      });
  
      if (foundUser) {
          const isPasswordValid = await bcrypt.compare(userPassword, foundUser.password);
  
        if (isPasswordValid) {
            // Generar JWT
            const token = await generarJWT( foundUser.id );
            const data =  {id:foundUser.id,name:foundUser.name,token }
          res.status(200).send(successResponseFormat(data));
        } else {
          res.status(401).send(errorResponseFormat('Invalid credentials'));
        }
      } else {
        res.status(401).send(errorResponseFormat('Invalid credentials'));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };


  exports.createUser = async (req, res) => {
    
    const { userName, userEmail, userPassword } = req.body;
    const hashedPassword = await bcrypt.hash(userPassword, 10);
  
    const foundUser = await Auth.findOne({
      where: { email: userEmail },
    });
  
    if (foundUser) {
      res
        .status(401)
        .send(errorResponseFormat(`The user with the email : ${userEmail} was already found.`));
    } else {
      Auth.create({
        name: userName,
        email: userEmail,
        password: hashedPassword,
      })
        .then(async () => {
          const foundUser = await Auth.findOne({
            where: { email: userEmail },
          });

           // Generar JWT
           const token = await generarJWT( foundUser.id );
           const data =  {id:foundUser.id,name:foundUser.name,token }
  
          res
            .status(200)
            .send(successResponseFormat(data));
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .send(
              errorResponseFormat(
                "Error trying to save, please try again later."
              )
            );
        });
    }
  };  

