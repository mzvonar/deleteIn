deleteIn [![Build Status](https://travis-ci.org/mzvonar/deleteIn.svg?branch=master)](https://travis-ci.org/mzvonar/deleteIn) [![Coverage Status](https://coveralls.io/repos/github/mzvonar/deleteIn/badge.svg?branch=master)](https://coveralls.io/github/mzvonar/deleteIn?branch=master) [![npm version](https://badge.fury.io/js/%40mzvonar%2Fdeletein.svg)](https://badge.fury.io/js/%40mzvonar%2Fdeletein)
=========

Deletes value from object by path. Path can be string or array (e.g. ['user', 'profile', 'gender']).  
Always returns new copy of object.

## Installation

  `npm install @mzvonar/deletein`

## Parameters
```javascript
deleteIn(context, path);
```

| Name | Description |
| - | - |
| ```context``` | Object from which the value deleted |
| ```path``` | Must be Array or String. See usage |

## Usage

```javascript
import deleteIn from '@mzvonar/deletein';
  
const context = {
    user: {
        profile: {
            gender: 'female'
        },
        ids: [1, 2, 3]
    }
};
  
const newContext = deleteIn(context, ['user', 'profile', 'gender']);
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {}
        }
    }
``` 

```javascript  
const newContext = deleteIn(context, ['user', 'ids', 1]);
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {
                gender: 'female',
                ids: [1, 3]
            }
        }
    }
``` 

## mutableDeleteIn
If you need you can import mutableDeleteIn, which is exactly the same as deleteIn, but mutates the original context object without creating copy.


## Tests

  `npm test`