import { gql } from 'urql';

const GET_RANDOM_GIFS = gql`
  query GetGifByOffset($category: String!, $offset: Int!) {
    gifs(limit: 1, offset: $offset, where: { category: { _eq: $category } }) {
      url
    }
  }
`;

export interface Gif {
  url: string;
}

export interface GetRandomGifsData {
  gifs: Gif[];
}

export default GET_RANDOM_GIFS;
