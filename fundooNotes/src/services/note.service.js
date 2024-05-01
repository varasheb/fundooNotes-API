import { Error } from 'mongoose';
import Note from '../models/note.model';




export const createNote=async (body)=>{ 
    return await Note.create(body);
}

export const getAllNotes=async (userId)=>{
    return await Note.find({createdBy:userId})
}

export const getNote=async (_id)=>{
    return Note.findById({_id})
}

export const deleteNote = async (_id) => {
    const note = await Note.findById(_id);
    if (note && note.trashed) {
        return Note.findByIdAndDelete(_id);
    } else {
        throw new Error("Note is not trashed");
    }
}

export const isArchivedNote=async (userId,noteId)=>{
    const note = await Note.findOne({createdBy:userId,_id:noteId});
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.archived=!note.archived;
    const updatedNote = await note.save();
    return updatedNote

}

export const isTrashedNote=async (userId,noteId)=>{
    const note = await Note.findOne({createdBy:userId,_id:noteId});
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.trashed=!note.trashed;
    const updatedNote = await note.save();
    return updatedNote
}