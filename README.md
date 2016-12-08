[![Build Status](https://travis-ci.org/labs-js/turbo-git-config.svg?)](https://travis-ci.org/labs-js/turbo-git-config)
[![codecov](https://codecov.io/gh/labs-js/turbo-git-config/branch/master/graph/badge.svg)](https://codecov.io/gh/labs-js/turbo-git-config)
[![npm](https://img.shields.io/npm/v/turbo-git-config.svg?style=flat)](https://www.npmjs.com/package/turbo-git-config)
[![Turbo Commit](https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg)](https://github.com/labs-js/turbo-git/blob/master/CONVENTION.md)
[![bitHound](https://www.bithound.io/github/labs-js/turbo-git-config/badges/score.svg)](https://www.bithound.io/github/labs-js/turbo-git-config)
[![Code Climate](https://codeclimate.com/github/labs-js/turbo-git-config/badges/gpa.svg)](https://codeclimate.com/github/labs-js/turbo-git-config)

# turbo-git-config
**Turbo git config** -> Parser & Utils for commit conventions.

#### This lib is part of the [Turbo Git](https://github.com/labs-js/turbo-git) -> Making your git even more awesome 😎🙌

## how to use it:

```
npm install --save turbo-git-config
```

And then from the code when you need use it: 

### Config Parser
```javascript
var configParser = require('turbo-git-config').parser
```

### Utils
```javascript
var utils = require('turbo-git-config').utils
```

### Config Parser Methods:

- getTagsFormat
- getCommitConf
- getProperty
- getLogCommand
- getCommitPromptText
- getConfigFilesData


### Utils Methods:

- checkGitRepoExistence
- checkLocalConfigFile
- getGitRepoMainPath
- showError

