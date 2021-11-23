import React from 'react';
//graphQL dependencies
import { useMutation, useQuery, gql } from '@apollo/client';
//import Note component
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    //store id found in url as a variable
    const id = props.match.params.id;
    //query hook, passing the id value as a variable
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    //fetch current user's data
    const { data: userdata } = useQuery(GET_ME);
    //define our mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error!</p>;
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;