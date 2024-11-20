import {sequelize} from "../database/database.config";
import {DataTypes} from "sequelize";

 const User = sequelize.define("User", {

   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false, // required
    // validate: {
    //   notEmpty: true,
    //   // min: 3,
    //   // max: 20,
    //   minmax:[3 , 20]
    // }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
// we gonna use it for google authentication ,  every provider has it own id
  googleId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // facebookId: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // githubId: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  picture: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
// other options like [ custom table name ]
})

export  default  User