import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth} from '../middlewares/auth.middleware';

const router = express.Router();

router.post('', userAuth , noteController.createNote);

router.post('/archived', userAuth , noteController.isArchivedNote)

router.post('/trashed', userAuth ,noteController.isTrashedNote)

export default router;