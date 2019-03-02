const { CreateNewMemberCommand } = require('../commands/Access/CreateNewMemberCommand')
const { UpdateProfileDataCommand } = require('../commands/Profile/UpdateProfileDataCommand')
const { AccessHandler } = require('../commandHandlers/AccessHandler')
const { ProfileHandler } = require('../commandHandlers/ProfileHandler')

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
        const { email, name } = req.body
        const command = new CreateNewMemberCommand(email, name)        
        res.send(AccessHandler.createNewMember(command))
    })

    // Update profile
    app.put('/profile/:email', (req, res) => {
        const command = new UpdateProfileDataCommand({ email: req.params.email, ...req.body })
        res.send(ProfileHandler.updateProfileData(command))
    })
}

exports.Members = MembersController