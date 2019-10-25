const request = require('supertest');
const server = require('./server.js')
const db = require('../database/dbConfig.js')



describe('server',()=> {
    it('checks get', () => {
        return request(server)
        .get('/')
        .then(res => {
            expect(res.status).toBe(200)
        })
    })

    it('should return api: is up',async () => {
        const res = await request(server).get('/');

        expect(res.body.api).toBe('is up')
    })
})