const { CreateNewMemberCommand } = require('../commands/Access/CreateNewMemberCommand')
const { UpdateProfileDataCommand } = require('../commands/Profile/UpdateProfileDataCommand')
const { InsertPersonalDataCommand } = require('../commands/Profile/InsertPersonalDataCommand')
const { InsertDriverInformatinCommand } = require('../commands/Profile/InsertDriverInformatinCommand')
const { InsertCarInformatinCommand } = require('../commands/Profile/InsertCarInformatinCommand')
const { InsertFlowInformationCommand } = require('../commands/Profile/InsertFlowInformationCommand')
const { AccessHandler } = require('../commandHandlers/AccessHandler')
const { ProfileHandler } = require('../commandHandlers/ProfileHandler')

const { GetProfile } = require('../DAO/mongo')

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
        GetProfile(req.params.email)
        .then(result => res.send(result))
        .catch(e => res.send({ success: false, message: e}))
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

    app.put('/profile/:step/:email', (req, res) => {
        const { step, email } = req.params
        let command = undefined

        switch (step) {
            case '0':
                command = new InsertPersonalDataCommand({ email, ...req.body })
                res.send(ProfileHandler.insertPersonalData(command))
                break
            case '1':
                command = new InsertDriverInformatinCommand({ email, ...req.body })
                res.send(ProfileHandler.insertDriverInformation(command))
                break
            case '2':
                command = new InsertCarInformatinCommand({ email, ...req.body })
                res.send(ProfileHandler.insertCarInformation(command))
                break
            case '3':
                command = new InsertFlowInformationCommand({ email, ...req.body })
                res.send(ProfileHandler.insertFlowInformation(command))
                break

         }

    })
}

exports.Members = MembersController