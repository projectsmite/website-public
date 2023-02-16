import { sequelize } from '../config/databaseConfig.js'
import DataTypes from 'sequelize'

const user = sequelize.define("user", {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const cards = sequelize.define("cards", {
    card_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const signalFiles = sequelize.define("signals", {
    remote_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    remote_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const commandSection = sequelize.define("commands", {
    command_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    command_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const images = sequelize.define("images", {
    image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const videos = sequelize.define("videos", {
    video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    video_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


export { user, cards, signalFiles, commandSection, images, videos }