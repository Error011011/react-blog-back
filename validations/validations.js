import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('avatarUrl').optional().isURL(),
]

export const createPostValidation = [
    body('title', 'Введите заголовок').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Введите теги').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]

