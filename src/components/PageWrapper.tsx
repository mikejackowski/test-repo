import { memo, ReactElement } from 'react';

import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

const Page = styled(Box)({
  backgroundColor: '#ffdd00',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  color: '#ff5722',
});

interface Props {
  children: React.ReactNode;
}

export default memo(function PageWrapper({ children }: Props): ReactElement {
  return <Page>{children}</Page>;
});
