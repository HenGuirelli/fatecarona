const MembersController = app => {
    // Get user info
    app.post('/login', (req, res) => {
        res.send('get user info')
    })

    // Upsert user info
    app.put('/login', (req, res) => {
        res.send('upsert')
    })

    // Get user profile 
    app.get('/profile/:email', (req, res) => {
        res.send('get user profile ')
    })

    // Insert new profile
    app.post('/profile', (req, res) => {
        res.send('insert new user')
    })

    // Update profile
    app.put('/profile', (req, res) => {
        res.send('update profile')
    })

}

exports.Members = MembersController