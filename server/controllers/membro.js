const MembersController = app => {
    // Get user info
    app.post('/login', (req, res) => {
        res.send('get user info')
    })

    // Upsert user info
    app.put('/login', (req, res) => {
        res.send('upsert')
    })

    // Get user profile student
    app.get('/profile/:email/student', (req, res) => {
        res.send('get user profile student')
    })

    // Get user profile employee
    app.get('/profile/:email/employee', (req, res) => {
        res.send('get user profile employee')
    })

    // Insert new profile
    app.post('/profile/employee', (req, res) => {
        res.send('insert new profile')
    })

    // Insert new profile
    app.post('/profile/student', (req, res) => {
        res.send('insert new profile')
    })

    // Update profile
    app.put('/profile/student', (req, res) => {
        res.send('update profile')
    })

    // Update profile
    app.put('/profile/employee', (req, res) => {
        res.send('update profile')
    })
}

exports.Members = MembersController