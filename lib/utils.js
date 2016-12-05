#!/usr/bin/env node

module.exports = wrapperUtils;

function wrapperUtils (_console, _process) {
    return Utils(_console || console, _process || process);
}

function Utils(console, process) {
    'use strict';
    var childProcess = require('child_process'),
        Promise = require('promise'),
        shell = require('shelljs'),
        path = require('path');

    require('colors');


    return {
        checkGitRepoExistence: checkGitRepoExistence,
        checkLocalConfigFile: checkLocalConfigFile,
        getGitRepoMainPath: getGitRepoMainPath,
        showError: showError
    };

    //////////////////

    function showError(errorMessage) {
        var error = errorMessage || 'error';

        console.log(error.magenta);
    }

    //Exec git branch to check if exist .git files
    function checkGitRepoExistence() {
        return new Promise(function(resolve, reject) {
            var checkRepoCommand = childProcess.exec('git branch');

            checkRepoCommand.stderr.on('data', function(err) {
                reject(err);
            });

            checkRepoCommand.on('close', function(code) {
                if (code === 0) { //0 means ok, 128 means error
                    resolve();
                }
            });
        });
    }

    function getGitRepoMainPath() {
        var check = childProcess.spawnSync('git', ['branch']),
            err = check.stderr.toString().trim(),
            res;

        if (err) {
            showError(err);
            return process.exit(1); //exit process with code error
        }

        res = childProcess.execSync('git rev-parse --show-toplevel', {
            encoding: 'UTF-8'
        });

        return res.trim();
    }

    function checkLocalConfigFile() {
        var dotFileConfPath = path.join(getGitRepoMainPath() || '', '.turbogit');

        if (shell.test('-f', dotFileConfPath)) {
            return dotFileConfPath;
        }
        return false
    }
};
