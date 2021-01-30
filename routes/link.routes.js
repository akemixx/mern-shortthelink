const { Router } = require('express');
const User = require('../models/User');
const Link = require('../models/Link');
const config = require('config');
const shortid = require('shortid');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/', auth,  async (request, response) => {
    try {
        const userId = request.user.userId;
        const links = await Link.find({ ownerId : userId }); //?????
        return response.json(links);
    } catch (e) {
        return response.status(500).json({ message: 'Something went wrong. Try again. '});
    }
});


router.get('/:id', auth, async (request, response) => {
    try {
        const link = await Link.findById(request.params.id);
        return response.json(link);
    } catch (e) {
        return response.status(500).json({ message: 'Something went wrong. Try again. '});
    }
});


router.post('/generate', auth, async (request, response) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = request.body;
        const shortedLink = shortid.generate();
        const existingLink = await Link.findOne({ from });
        if(existingLink){
            return response.json({ link : existingLink });
        }

        const to = baseUrl.concat('/t/', shortedLink);

        const link = new Link({ code: shortedLink, to, from, ownerId : request.user.userId });
        await link.save();

        return response.status(201).json({ link });
    } catch (e) {
        return response.status(500).json({ message: 'Something went wrong. Try again. '});
    }
});

module.exports = router;