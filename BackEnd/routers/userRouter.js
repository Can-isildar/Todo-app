const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../service/usersService'); // userController.js'yi içe aktarın
const authMiddleware = require('../middilewares/authMiddleware.js');
const validate = require('../validator/validator.js');


// Kullanıcı kaydı için POST isteği
router.post('/register', validate.validateUsers, async (req, res) => {
    let jsonData = req.body;
    

    const user = await userService.registerUser({ jsonData });

    res.status(200).json({ message: 'Kullanıcı başarıyla eklendi', user });

});

// Kullanıcı girişi için POST isteği
router.post('/login', validate.validateLogin, async (req, res) => {
    const jsonData = req.body;

    const user = await userService.loginUser({ jsonData })

    userService.loginUser({ jsonData })
        .then(user => res.status(200).json({ token: createToken(user.id), userId: user.id ,username:user.username})).catch(err =>{
            res.status(401).json(err)
            console.error(err);
        })


});

// Kullanıcı silme
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await userService.deleteUser({ id });

    res.status(201).json({ message: 'Veri başarıyla silindi' });

});

// Kullanıcı güncelleme
router.put('/:id', validate.validateUpdate, async (req, res) => {
    const id = req.params.id;
    const updatedUserData = req.body;
    const newPassword = req.body.password;

    await userService.updateUser({ id, updatedUserData, newPassword });

    res.status(202).json({ message: 'Veri başarıyla guncellendi' });

});

// Kullanıcı ID'ye göre çağırma
router.get('/:id', authMiddleware.authenticateToken, async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById({ id });
    res.status(200).json(user);

});

// Tüm kullanıcıları çağırma
router.get('/', async (req, res) => {
    const user = await userService.getAllUser();
    res.status(200).json(user)
});

function createToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}






module.exports = router;
