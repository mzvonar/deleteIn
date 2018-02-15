deleteIn [![Build Status](https://travis-ci.org/mzvonar/deleteIn.svg?branch=master)](https://travis-ci.org/mzvonar/deleteIn) [![Coverage Status](https://coveralls.io/repos/github/mzvonar/deleteIn/badge.svg?branch=master)](https://coveralls.io/github/mzvonar/deleteIn?branch=master) [![npm version](https://badge.fury.io/js/%40mzvonar%2Fdeletein.svg)](https://badge.fury.io/js/%40mzvonar%2Fdeletein)
=========

Sets value in object by path. Path can be string or array (e.g. ['user', 'profile', 'gender']).  
If any part of path doesn't exist it is created. Always returns new copy of object.

## Installation

  `npm install @mzvonar/setin`

## Parameters
```javascript
setIn(context, path, value, push);
```

| Name | Description |
| - | - |
| ```context``` | Object in which the value will be set |
| ```path``` | Must be Array or String. See usage |
| ```value``` | Value to set in path |
| ```push``` | Whether to push the value to Array. See usage |

## Usage

```javascript
import setIn from '@mzvonar/setin';
  
const context = {
    user: {
        profile: {
            gender: 'female'
        }
    }
};
  
const newContext = setIn(context, ['user', 'profile', 'gender'], 'male');
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {
                gender: 'male'
            }
        }
    }
``` 

```javascript  
const newContext = setIn(context, ['user', 'profile', 'address', 'country'], 'slovakia');
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            }
        }
    }
``` 

### Push
If fourth parameter is ```true``` and last item in path is ```Array``` value is pushed to the Array

example:
```javascript       
    const context = {
        user: {
            name: 'Mike',
            nicknames: [
                'terminator',
                'maverick'
            ]
        }
    };
      
    const newContext = setIn(context, ['user', 'nickanmes'], 'vincent vega');
    
    console.log(newContext);
    /*
    {
        user: {
            name: 'Mike',
            nicknames: [
                'terminator',
                'maverick',
                'vincent vega'
            ]
        }
    }
    */
``` 

## Tests

  `npm test`