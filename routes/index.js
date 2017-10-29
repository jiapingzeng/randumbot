import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('./index', { demo: process.env.demo })
})

export default router