const Joi = require('joi')
const express = require('express')
const router = express.Router()

// Data
const courses = [
    {id: 1, name: 'Javascript'},
    {id: 2, name: 'Java'},
    {id: 3, name: 'Python'},
    {id: 4, name: 'PHP'}
]

router.get('/', (req, res) => {
    res.send(JSON.stringify(courses))
})

router.post('/', (req, res) => {
    // Validate input field
    const {error, value} = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // New course
    const course = {
        id: courses.length + 1,
        name: value['name']
    }

    // Add to database
    courses.push(course)

    // Response to the client
    res.send(JSON.stringify(course))
})

router.put("/:id", (req, res) => {
    // Find course by ID
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course was not found by given ID!')

    // Get data by ID and validate input field
    const {error, value} = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // Update courese
    course.name = value['name']

    // Response to the client
    res.send(JSON.stringify(course))
})

router.get('/:id', (req, res) => {
    // Find user by ID
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course was not found by given ID!')

    // Response to the client
    res.send(JSON.stringify(course))
})

router.delete('/:id', (req, res) => {
    // Find user by ID
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course was not found by given ID!')

    // Delete course
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // Response to the client
    res.send(JSON.stringify(course))
})


// Validateion
const validation = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate({name: course})
}


module.exports = router