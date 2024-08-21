import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: true
});

// Hash the password before saving the user
User.beforeCreate(async (user, options) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

// Method to check if the password is correct
User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
User.prototype.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            name: this.name, // Assuming you want to include the name in the token
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


export default User;
