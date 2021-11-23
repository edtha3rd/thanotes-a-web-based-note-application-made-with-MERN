import React from 'react';
//import required apollo libraries
import { useQuery, gql } from '@apollo/client';
//import markdown library
import ReactMarkdown from 'react-markdown';

import Button from '../components/Button';
import NoteFeed from "../components/NoteFeed";
import Note from '../components/Note';
import { GET_NOTES } from '../gql/query';

const Home = () => {
  //query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  //if data loading, display loading message
  if (loading) return <p>Loading...</p>
  //if there is an error fetching data, display error message
  if (error) return <p>Error!</p>

  return (
    //add react fragment to provide a parent element
    <React.Fragment>
      <NoteFeed notes={data.NoteFeed.notes} />
      {/*only display load more button is hasNextPage is true */}
      {data.NoteFeed.hasNextPage && (
        <Button 
        onClick={() => fetchMore({
          variables: {
            cursor: data.NoteFeed.cursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              NoteFeed: {
                cursor: fetchMoreResult.NoteFeed.cursor,
                hasNextPage: fetchMoreResult.NoteFeed.hasNextPage,
                //combine the new results and the old
                notes: [
                  ...previousResult.NoteFeed.notes,
                  ...fetchMoreResult.NoteFeed.notes
                ],
                __typename: 'NoteFeed'
              }
            };
          }
        })
        }
        >
          Load More
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
