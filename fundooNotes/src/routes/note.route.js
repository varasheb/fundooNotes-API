import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { NoteValidator} from '../validators/note.validator';


const router = express.Router();

router.post('', userAuth, NoteValidator, noteController.createNote);

router.get('', userAuth , noteController.getAllNotes);

router.get('/:_id', userAuth ,noteController.getNote);

router.delete('/:_id', userAuth, noteController.deleteNote);

router.post('/update/:_id', userAuth , noteController.updatedNote);

router.post('/archived/:_id', userAuth , noteController.isArchivedNote);

router.post('/trashed/:_id', userAuth ,noteController.isTrashedNote);

export default router;