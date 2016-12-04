#!/usr/bin/env node

var shell = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils')();

shell.config.silent = false;

module.exports = function wrapperConfig(_configJson, _process) {
    'use strict';
    var configJson,
        localConfig;

    localConfig = utils.checkLocalConfigFile();

    if (localConfig) {
        configJson = JSON.parse(fs.readFileSync(localConfig, 'utf8'));
    } else { //default conf
        configJson = require('./configs/turbo.json');
    }

    return configParser(_configJson || configJson, _process || process);

    ///////////////

    function configParser (configJson, process) {
        var conf = {};
        conf.config = configJson;
        conf.commits = getProperty('commitConvention').commitDesc;
        conf.turboLog = getProperty('turboLog');
        conf.turboCommit = getProperty('turboCommit');

        return {
            getTagsFormat: getTagsFormat,
            getCommitConf: getCommitConf,
            getProperty: getProperty,
            getLogCommand: getLogCommand,
            getCommitPromptText: getCommitPromptText,
            getConfigFilesData: getConfigFilesData
        };

        ////////////////

        function getTagsFormat() {
            var tagFormat = [],
                colors = require('colors/safe');

            conf.commits.forEach(function(val) {
                tagFormat.push({
                    'name': colors[val.color](val.tag + ' : ' + val.desc),
                    'value': val.tag
                });
            });
            return tagFormat;
        }

        function getCommitConf() {
            return conf.commits;
        }

        function getLogCommand() {
            return 'git log -n50 --reverse';
        }

        function getCommitPromptText(propName) {
            var propInConf,
                mapProps = {
                    'tag': 'textAskTag',
                    'title': 'textAskTitle',
                    'desc': 'textAskDesc',
                    'component': 'textAskComponent'
                };

            if ( !(propName in mapProps) ) {
                return false;
            }

            propInConf = conf.turboCommit[mapProps[propName]];
            /*eslint-disable*/
            if (propInConf == '') {
                return false;
            }
            /*eslint-enable*/
            return propInConf;
        }

        function getProperty(prop) {
            if (!conf.config.hasOwnProperty(prop)) {
                utils.showError('Undefined Property ' + (prop || '') +
                    '\nPlease check your .turbogit file');
                process.exit(1);
            }
            return conf.config[prop];
        }

        function getConfigFilesData() {
            var config = [{
                name: 'Turbo Commit',
                value: 'turbo',
                getter: getTurboJson
            }, {
                name: 'Angular',
                value: 'angular',
                getter: getAngularJson
            }, {
                name: 'Open UI5',
                value: 'ui5',
                getter: getUi5Json
            },{
                name: 'Custom',
                value: 'custom',
                getter: getCustomTemplateJson
            }];

            return config;

            //////////

            function getTurboJson () {
                return require('./configs/turbo.json')
            }

            function getAngularJson () {
                return require('./configs/angular.json')
            }

            function getUi5Json () {
                return require('./configs/open-ui5.json')
            }

            function getCustomTemplateJson () {
                return require('./configs/custom.json')
            }
        }
    }
};
