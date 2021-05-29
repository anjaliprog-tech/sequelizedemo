
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("details", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      birth_of_date: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  