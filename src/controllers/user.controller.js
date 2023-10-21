require("dotenv").config();
const User = require("../models/user.model");
const Sequelize = require('sequelize');
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.getUsers = async (req, res) => {
  const idAdmin = req.params.idAdmin;

  try {
      const Users = await User.findAll({
          where: { id_admin: idAdmin },
          order: [['id', 'DESC']]
      });

      res.status(200).send(successResponseFormat(Users));

  } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
  }
};



  exports.getUserById = async (req, res) => {
    const idUser =  req.params.idUser;
  
    try {
        const foundUser = await User.findOne({
            where: { id: idUser }
          });
      
          if (foundUser) {
              res.status(200).send(successResponseFormat(foundUser));
          }else{
            res.status(401).send(errorResponseFormat('User not found'));
          }
       
    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };

  exports.searchUser = async (req, res) => {
    const { idAdmin, query } = req.params;
    console.log('datos ',idAdmin, query);
    console.log('params ',req.params);

    try {
        const users = await User.findAll({
            where: {
                id_admin: idAdmin,
                name: {
                    [Sequelize.Op.like]: `%${query}%` 
                }
            }
        });

        res.status(200).send(successResponseFormat(users));

    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }
};




  exports.createUser = async (req, res) => {

    const { idAdmin, name, email, phone, address } = req.body;
  
    const foundUser = await User.findOne({
      where: { email: email },
    });
  
      if (foundUser) {
          res
          .status(401)
          .send(errorResponseFormat(`The user with the email : ${email} was already found.`));
      } else {
          User.create({
              id_admin:idAdmin, 
              name: name,
              email: email,
              phone: phone,
              address:address
          })
          .then(async() => {
  
              const foundUser = await User.findOne({
                  where: { email: email },
              });
  
              res
              .status(200)
              .send(successResponseFormat(foundUser));
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

  exports.editUser = async (req, res) => {
    const { name, email, phone, address } = req.body;
    const { idUser } = req.params;
  
    try {
      const foundUser = await User.findOne({
        where: { id: idUser },
      });
  
      if (!foundUser) {
        return res
          .status(401)
          .send(errorResponseFormat(`The user was not found.`));
      }
  
      if (name) {
        foundUser.name = name;
      }
      if (email) {
        foundUser.email = email;
      }
      if (phone) {
        foundUser.phone = phone;
      }
      if (address) {
        foundUser.address = address;
      }
  
      await foundUser.save();
  
      res.status(200).send(successResponseFormat(foundUser));
    } catch (error) {
      console.error(error);
      res.status(500).send(
        errorResponseFormat("Error trying to save, please try again later.")
      );
    }
  };

  exports.deleteUser = async (req, res) => {
    const { idUser } = req.params;
   
    try {

        User.destroy(
            {
                where: {
                id: idUser,
                },
            }
            )
            .then(() => {
            res
                .status(200)
                .send(successResponseFormat("User deleted"));
            })
            .catch(() => {
            res.status(500).send(errorResponseFormat("An error occurred"));
            });
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }

  }
