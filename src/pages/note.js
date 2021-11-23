import React from 'react';
//graphQL dependencies
import { useQuery, gql } from '@apollo/client';
//import Note component
import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = props => {
    //store id found in url as a variable
    const id = props.match.params.id;
    //query hook, passing the id value as a variable
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! Note not found </p>;

    return <Note note={data.note} />;
};

export default NotePage;