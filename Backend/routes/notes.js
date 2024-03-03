

const express=require('express');
const router=express.Router();
const {collection,addDoc,getDocs}=require('../firebase');
const { body, validationResult } = require('express-validator');
const {createnote,getnotes,getnotebyid}=require('../controllers/notes')
router.post('/createnote', [
    body('word','value must be string').isString().notEmpty().withMessage('Word must be a non-empty string'),
    body('type','value must be string').isString().notEmpty().withMessage('Type must be a non-empty string'),
    body('definitions','value must be string').isString().notEmpty().withMessage('Definitions must be a non-empty string'),
    body('example','value must be string').isString().notEmpty().withMessage('Example must be a non-empty string'),
    body('breakdown','value must be string').isString().notEmpty().withMessage('Word Breakdown must be a non-empty string'),
  ],createnote);
router.get('/getnotes',getnotes)
router.get('/getnote/:id',getnotebyid)
module.exports = router