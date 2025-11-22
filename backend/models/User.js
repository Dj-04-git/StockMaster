const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db'); ;

class User extends Model {
  async comparePassword(candidate) {
    if (!this.password) return false;
    return await bcrypt.compare(candidate, this.password);
  }
}

User.init({
  loginId: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  otpCode: { type: DataTypes.STRING },
  otpExpiresAt: { type: DataTypes.DATE },
  resetToken: { type: DataTypes.STRING },
  resetTokenExpiresAt: { type: DataTypes.DATE }
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = User;
