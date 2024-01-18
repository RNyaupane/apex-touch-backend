import {body} from 'express-validator';

export const registerValidator = [
    body('name', 'name doesnot empty ').not().isEmpty(),
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
    body('password_confirmation')
    .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
    .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
]



// export const loginValidator = [
//     body('email', 'Invalid does not Empty').not().isEmpty(),
//     body('email', 'Invalid email').isEmail(),
//     body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
//   ]
  
//   export const createValidator = [
//     body('user.username', 'username does not Empty').not().isEmpty(),
//     body('user.email', 'Invalid email').isEmail(),
//     body('user.age', 'username must be Alphanumeric').isAlphanumeric(),
//     body('user.birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
//     body('user.password', 'password does not Empty').not().isEmpty(),
//     body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
//   ]

