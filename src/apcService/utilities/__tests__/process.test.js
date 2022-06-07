// Ref: https://stackoverflow.com/questions/64051580/how-to-test-express-router-catch-branch-in-this-scenario-using-jest
describe('test', ()=>{
    afterEach(()=>{
        jest.resetModules();
        jest.restoreAllMocks();
    })
    it('Call by 200', ()=>{
        global.cache = {
            set: jest.fn().mockReturnValueOnce(true),
            get: jest.fn().mockReturnThis(0.5)
        }
        const express = require('express');
        const mRouter = {post: jest.fn()};
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mRouter);
        const mReq = {body: jest.fn().mockReturnThis({
            id:0,
            type:'SHARON',
            thickness:0.1,
            moisture:0.2
        })};
        const mSend = jest.fn().mockReturnThis(200);
        // Problem might happened here, but have no idea
        const mRes = { 
            status: jest.fn().mockReturnValue({send:mSend }),
            render: jest.fn(tFactor=0.1, mFactor=0.2, metaData=null) 
        };
        mRouter.post.mockImplementation((path, callback) => {
            if (path === '/api/v1/process') {
              callback(mReq, mRes);
            }
        });
        require('../../routers/v1/process');
        expect(mRes.status).toBeCalledWith(200);
    })
    it('Call by 500', ()=>{
        global.cache = null;
        const express = require('express');
        const mRouter = {post: jest.fn()};
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mRouter);
        const mReq = {body: jest.fn().mockReturnThis({
            id:0,
            type:'SHARON',
            thickness:0.1,
            moisture:0.2
        })};
        const mSend = jest.fn().mockReturnThis(500);
        // Problem might happened here, but have no idea
        const mRes = { 
            status: jest.fn().mockReturnValue({send:mSend}),
            render: jest.fn(tFactor=0.1, mFactor=0.2, metaData=null) 
        };
        mRouter.post.mockImplementation((path, callback) => {
            if (path === '/api/v1/process') {
              callback(mReq, mRes);
            }
        });
        require('../../routers/v1/process');
        expect(mRes.status).toBeCalledWith(500);
    })
})