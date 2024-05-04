import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';


export const createNote = async (req, res) => {
  try {
    const {body}=req
    body.createdBy=res.locals.userId;
    const data = await NoteService.createNote(body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};


export const getAllNotes = async (req,res) => {
  try {
    const data = await NoteService.getAllNotes(res.locals.userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'fetched notes sucefully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const noteId=req.params._id;
    const data = await NoteService.getNote(noteId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'fetched note sucefully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId=req.params._id;
    const data = await NoteService.deleteNote(noteId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Deleted note sucefully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const updatedNote = async (req, res) => {
  try {
    const noteId=req.params._id;
    const body=req.body;

    const data = await NoteService.updateNote(noteId,body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const isArchivedNote = async (req, res) => {
  try {
    const noteId=req.params._id;
    const userId =res.locals.userId;

    const data = await NoteService.isArchivedNote(userId,noteId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Archived successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const isTrashedNote = async (req, res) => {
  try {
    const noteId=req.params._id;
    const userId =res.locals.userId;

    const data = await NoteService.isTrashedNote(userId,noteId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Trached successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};