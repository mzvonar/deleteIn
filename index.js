/**
 * Deletes value in object according to provided path
 * @param {Object} context
 * @param {Array|string} path
 * @return {Object} Copy of object with value at path deleted
 */

function createDeleteIn(mutable) {
    return function deleteIn(context, path) {
        if(!path) {
            throw new Error('Path is undefined');
        }

        const pathType = Object.prototype.toString.call(path);
        if(pathType !== '[object Undefined]' && pathType !== '[object Array]') {
            path = [path];
        }
        else {
            path = [].concat(path);
        }

        var currentPathPart = path.shift();

        if(typeof currentPathPart === 'undefined' || currentPathPart === null) {
            throw new Error('Path part is undefined');
        }

        if(!context) {
            throw new Error('Context or it\'s part is undefined');
        }

        // var currentValue = path.length === 0 ? value : deleteIn(context[currentPathPart], path, value, push);

        var contextType = Object.prototype.toString.call(context);
        if(contextType === '[object Array]') {
            var copy = mutable ? context : [].concat(context);

            if(path.length === 0) {
                if(typeof currentPathPart !== 'number') {
                    throw new Error('Trying to delete from Array with index type ' + typeof currentPathPart);
                }
                if(currentPathPart < 0) {
                    throw new Error('Trying to delete index ' + currentPathPart + ' which si lower than zero');
                }
                if(currentPathPart >= context.length) {
                    throw new Error('Trying to delete index ' + currentPathPart + ' which is greater than array length');
                }

                copy.splice(currentPathPart, 1);
            }
            else if(typeof copy[currentPathPart] !== 'undefined') {
                copy[currentPathPart] = deleteIn(copy[currentPathPart], path);
            }

            return copy;
        }
        else if(contextType === '[object Object]') {
            var copy = mutable ? context : Object.assign({}, context);

            if(path.length === 0) {
                delete copy[currentPathPart];
            }
            else if(typeof copy[currentPathPart] !== 'undefined') {
                copy[currentPathPart] = deleteIn(copy[currentPathPart], path);
            }

            return copy;
        }
        else {
            throw new Error('Trying to add property to ' + contextType);
        }
    };
}

module.exports = createDeleteIn();
module.exports.mutableDeleteIn = createDeleteIn(true);