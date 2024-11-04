// scripts/deploy.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DEPLOY_DIR = path.join(__dirname, '../build'); // Adjust as necessary

const deploy = () => {
    console.log('Starting deployment...');

    // Build the application
    exec('npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during build: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Build stderr: ${stderr}`);
            return;
        }
        console.log(`Build output: ${stdout}`);

        // Deploy to the server (this is a placeholder command)
        exec(`scp -r ${DEPLOY_DIR}/* ${process.env.REMOTE_USER}@${process.env.REMOTE_HOST}:${process.env.REMOTE_PATH}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during deployment: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Deployment stderr: ${stderr}`);
                return;
            }
            console.log(`Deployment output: ${stdout}`);
            console.log('Deployment completed successfully!');
        });
    });
};

deploy();
