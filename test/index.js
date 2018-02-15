const expect = require('expect');
const deleteIn = require('./../index');
const mutableDeleteIn = require('./../index').mutableDeleteIn;


describe('deleteIn', function() {
    const context = {
        user: {
            profile: {
                gender: 'female'
            },
            ids: [1,2,3]
        },
        type: 'best'
    };

    it('should delete value and return new copy of object by Array path', function() {
        const newContext = deleteIn(context, ['user', 'profile', 'gender']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {},
                ids: [1,2,3]
            },
            type: 'best'
        });

        const context2 = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    },
                    {
                        title: 'photographer',
                        since: 'yesterday'
                    }
                ]
            }
        };

        const newContext2 = deleteIn(context2, ['user', 'jobs', 1, 'since']);

        expect(newContext2).toNotBe(context2);
        expect(newContext2).toEqual({
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    },
                    {
                        title: 'photographer'
                    }
                ]
            }
        });
    });

    it('should delete value and return new copy of object by string path', function() {
        const newContext = deleteIn(context, 'type');

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                },
                ids: [1,2,3]
            }
        });
    });

    it('should delete value from array and return new copy by number path', function() {
        const context = [1,2,3];
        const newContext = deleteIn(context, 1);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual([1,3]);
    });

    it('should not mutate path argument', function(){
        const path = ['user', 'profile', 'gender'];
        deleteIn(context, path);

        expect(path).toEqual(['user', 'profile', 'gender']);
    });

    it('should throw error if context is undefined', function(){
        expect(function() {
            deleteIn(undefined, ['type']);
        }).toThrow('Context or it\'s part is undefined');
    });

    it('should not throw error if path is undefined in object', function(){
        const newContext = deleteIn(context, ['user', 'avatar']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                },
                ids: [1,2,3]
            },
            type: 'best'
        });
    });

    it('should not throw error if path is undefined in array', function(){
        const context = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    }
                ]
            }
        };
        const newContext = deleteIn(context, ['user', 'jobs', 1, 'since']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    }
                ]
            }
        });
    });

    it('should throw error if path argument is undefined', function(){
        expect(function() {
            deleteIn(context);
        }).toThrow('Path is undefined');
    });

    it('should throw error if path part is undefined', function(){
        expect(function() {
            deleteIn(context, ['user', undefined]);
        }).toThrow('Path part is undefined');
    });

    it('should throw error if trying to delete non number index from array', function(){
        expect(function() {
            deleteIn(context, ['user', 'ids', '1']);
        }).toThrow('Trying to delete from Array with index type string');
    });

    it('should throw error if trying to delete index lower than zero from array', function(){
        expect(function() {
            deleteIn(context, ['user', 'ids', -1]);
        }).toThrow('Trying to delete index -1 which si lower than zero');
    });

    it('should throw error if trying to delete index greater than array length', function(){
        expect(function() {
            deleteIn(context, ['user', 'ids', 3]);
        }).toThrow('Trying to delete index 3 which is greater than array length');
    });

    it('should throw error if trying to delete from non-object/non-array', function(){
        expect(function() {
            deleteIn(context, ['user', 'profile', 'gender', 'someprop']);
        }).toThrow('Trying to delete property from [object String]');
    });
});

describe('mutableDeleteIn', function() {
    let context;

    beforeEach(function(){
        context = {
            user: {
                profile: {
                    gender: 'female'
                },
                ids: [1,2,3]
            },
            type: 'best'
        };
    });

    it('should delete value and return new copy of object by Array path', function() {
        const newContext = mutableDeleteIn(context, ['user', 'profile', 'gender']);

        const output = {
            user: {
                profile: {},
                ids: [1,2,3]
            },
            type: 'best'
        };

        expect(newContext).toBe(context);
        expect(newContext).toEqual(output);
        expect(context).toEqual(output);

        const context2 = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    },
                    {
                        title: 'photographer',
                        since: 'yesterday'
                    }
                ]
            }
        };

        const newContext2 = mutableDeleteIn(context2, ['user', 'jobs', 1, 'since']);

        const output2 = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    },
                    {
                        title: 'photographer'
                    }
                ]
            }
        };

        expect(newContext2).toBe(context2);
        expect(newContext2).toEqual(output2);
        expect(context2).toEqual(output2);
    });

    it('should delete value and return new copy of object by string path', function() {
        const newContext = mutableDeleteIn(context, 'type');

        const output = {
            user: {
                profile: {
                    gender: 'female'
                },
                ids: [1,2,3]
            }
        };

        expect(newContext).toBe(context);
        expect(newContext).toEqual(output);
        expect(context).toEqual(output);
    });

    it('should delete value from array and return new copy by number path', function() {
        const context = [1,2,3];
        const newContext = mutableDeleteIn(context, 1);

        const output = [1,3];

        expect(newContext).toBe(context);
        expect(newContext).toEqual(output);
        expect(context).toEqual(output);
    });

    it('should not mutate path argument', function(){
        const path = ['user', 'profile', 'gender'];
        mutableDeleteIn(context, path);

        expect(path).toEqual(['user', 'profile', 'gender']);
    });

    it('should throw error if context is undefined', function(){
        expect(function() {
            mutableDeleteIn(undefined, ['type']);
        }).toThrow('Context or it\'s part is undefined');
    });

    it('should not throw error if path is undefined in object', function(){
        const newContext = mutableDeleteIn(context, ['user', 'avatar']);

        const output = {
            user: {
                profile: {
                    gender: 'female'
                },
                ids: [1,2,3]
            },
            type: 'best'
        };

        expect(newContext).toBe(context);
        expect(newContext).toEqual(output);
        expect(context).toEqual(output);
    });

    it('should not throw error if path is undefined in array', function(){
        const context = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    }
                ]
            }
        };
        const newContext = mutableDeleteIn(context, ['user', 'jobs', 1, 'since']);

        const output = {
            user: {
                jobs: [
                    {
                        title: 'guitarist',
                        since: 'yesterday'
                    }
                ]
            }
        };

        expect(newContext).toBe(context);
        expect(newContext).toEqual(output);
        expect(context).toEqual(output);
    });

    it('should throw error if path argument is undefined', function(){
        expect(function() {
            mutableDeleteIn(context);
        }).toThrow('Path is undefined');
    });

    it('should throw error if path part is undefined', function(){
        expect(function() {
            mutableDeleteIn(context, ['user', undefined]);
        }).toThrow('Path part is undefined');
    });

    it('should throw error if trying to delete non number index from array', function(){
        expect(function() {
            mutableDeleteIn(context, ['user', 'ids', '1']);
        }).toThrow('Trying to delete from Array with index type string');
    });

    it('should throw error if trying to delete index lower than zero from array', function(){
        expect(function() {
            mutableDeleteIn(context, ['user', 'ids', -1]);
        }).toThrow('Trying to delete index -1 which si lower than zero');
    });

    it('should throw error if trying to delete index greater than array length', function(){
        expect(function() {
            mutableDeleteIn(context, ['user', 'ids', 3]);
        }).toThrow('Trying to delete index 3 which is greater than array length');
    });

    it('should throw error if trying to delete from non-object/non-array', function(){
        expect(function() {
            mutableDeleteIn(context, ['user', 'profile', 'gender', 'someprop']);
        }).toThrow('Trying to delete property from [object String]');
    });
});