import { Error } from 'mongoose';
import Note from '../models/note.model';




export const createNote=async (req,res)=>{
    const {body}=req
    body.createdBy=res.locals.userId;
    const data = await Note.create(body);
    return data
}

export const isArchivedNote=async (res)=>{
    const userId =res.locals.userId;
    const note = await Note.findById({userId});
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.isArchivedNote=true;
    const data=await Note.updateOne(note)
    return data

}

export const isTrashedNote=async (res)=>{
    const userId =res.locals.userId;
    const note = await Note.findOne({createdBy:userId});
    console.log(note)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.trashed=true;
    const updatedNote = await note.save();
    return updatedNote
}