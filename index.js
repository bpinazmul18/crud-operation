const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

// Enable body json
app.use(express.json())

// Index page
app.get('/', (req, res) => {
    res.send('Hello world.')
})

const courses = [
    {
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    },
    {
        id: 3,
        name: 'course 3'
    },
    {
        id: 4,
        name: 'course 4'
    }

]

// All courses
app.get('/api/courses', (req, res) => {
    res.status(200).send(JSON.stringify(courses))
})

// Course by id
app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Cann't find by given id!")
    res.status(200).send(JSON.stringify(course))
})

// Add new course
app.post('/api/courses', (req, res) => {

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    if (!req.body.name) return res.status(400).send("Name cann't be empty!")

    res.status(201).send(course)
})
// Remove course by id
app.delete('/api/courses/:id', (req, res) => {
    let index = courses.find(c => c.id === parseInt(req.params.id))
    if(!index < -1) return res.status(400).send("Cann't find by given id!")
    console.log(index < -1)
    if(index) return courses.splice(index, 1)
    res.status(200).send(JSON.stringify(courses))
})

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Cann't find by given id!")

    course.name = req.body.name

    res.status(200).send(JSON.stringify(courses))
})

app.listen(PORT, () => {
    console.log(`Successfully listening server on port ${PORT}`)
})