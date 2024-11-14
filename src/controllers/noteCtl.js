import { connectToDatabase } from '../config/mongoConnection.js';
import Note from '../models/Note.js';

export const createNote = async (event) => {
  try {
    await connectToDatabase();
    const {title, content} = JSON.parse(event.body);
    //Maybe valite variable
    const newNote = new Note({
        title,
        content
    });
    await newNote.save();
    return {
      statusCode: 201
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

export const listNotes = async (event) => {
  try {
    await connectToDatabase();
    const notes = await Note.find({active: true}).select("title");
    console.log(notes);

    return {
      statusCode: 200,
      body: JSON.stringify({
        notes
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

export const getNote = async (event) => {
  try {
    const noteId = event.pathParameters.noteId;
    console.log(noteId);
    await connectToDatabase();
    const note = await Note.findOne({_id: noteId, active:true}).select("-title -content");
    if(!note){
      return {
        statusCode: 404,
        body: JSON.stringify({
          msg: "Note not found"
        }),
      };
    }
    console.log(note);

    return {
      statusCode: 200,
      body: JSON.stringify({
        note
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

export const deleteNote = async (event) => {
  try {
    const noteId = event.pathParameters.noteId;
    console.log(noteId);
    await connectToDatabase();
    const res = await Note.findByIdAndUpdate(noteId, {active: false});
    //const res = await Note.deleteOne({_id: noteId});
    console.log(res);

    return {
      statusCode: 200
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

export const updateNote = async (event) => {
  try {
    const noteId = event.pathParameters.noteId;
    const {title, content} = JSON.parse(event.body);
    console.log(event.body);
    await connectToDatabase();
    const update = {
      title,
      content
    }
    const res = await Note.findByIdAndUpdate(noteId, update);
    console.log(res);

    return {
      statusCode: 200
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

/* 
Crear
Listar
Consultar
Actualizar
Eliminar 
*/
