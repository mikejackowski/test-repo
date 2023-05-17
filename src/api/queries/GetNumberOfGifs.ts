import { gql } from 'urql';
const GET_TOTAL_NUMBER_OF_CATEGORY_GIFS = gql`
  query GetAllGifsNumber($category: String!) {
    gifs_aggregate(where: { category: { _eq: $category } }) {
      aggregate {
        count
      }
    }
  }
`;

export interface GetNumberOfGifsData {
  gifs_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export default GET_TOTAL_NUMBER_OF_CATEGORY_GIFS;
