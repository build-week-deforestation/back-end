const request = require('supertest');
const authRouter = require('./auth-router.js')
const db = require('../database/dbConfig.js')



describe('auth-router',()=> {
    beforeEach(async () => {
        await db('users').truncate()
    })
    describe('auth register', () => {
        it('should register a user', async () => {
            await db('users').insert({
                username: "testinguser",
                password: "testinguser"
                })

            const users = await db('users');

            expect(users).toHaveLength(1)
        })

        it('should register a user', async () => {
            const [id] = await db('users').insert({
                username: "jimmy",
                password: "jimmy"
            })

            let user = await db('users')
            .where({id}).first();


            expect(user.username).toBe('jimmy')
        })
    })
})