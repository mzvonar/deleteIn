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
});