// src/App.tsx

import { useRoutes } from 'react-router-dom';

import { Provider } from 'urql';

import { client } from 'src/api/client';
import AnimalPage from 'src/components/AnimalPage';
import WelcomePage from 'src/components/WelcomePage';

function App() {
  return (
    <Provider value={client}>
      {useRoutes([
        {
          path: '/:category',
          element: <AnimalPage />,
        },
        {
          path: '/',
          element: <WelcomePage />,
        },
      ])}
    </Provider>
  );
}

export default App;
