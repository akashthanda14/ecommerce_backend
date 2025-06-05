const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { signUpSchema, signInSchema } = require('../validators/authValidators');
router.post('/signup', validate(signUpSchema), authController.signUp);
router.post('/signin', validate(signInSchema), authController.signIn);

module.exports = router;