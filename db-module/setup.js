'use strict'

const debug = require('debug')('API:module-db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup() {
    const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: 'Esto va a destruir la base de datos, Estas seguro ?'
    }])

    if (!answer.setup) {
        return console.log('operacion cancelada por el usuario :)')
    }

    const config = {
        database: process.env.DB_NAME || 'db-api-iot',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: s => debug(s),
        setup: true
    }

    await db(config).catch(handleFatalError)

    console.log('Success!')
    process.exit(0)
}

function handleFatalError(err) {
    console.error(chalk.red(err.message))
    console.error(chalk.red(err.stack))
    process.exit(1)
}

setup()