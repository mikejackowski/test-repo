import { keyframes } from '@emotion/react';
import styled from '@mui/material/styles/styled';

import Icon from 'src/components/Icon';
// Define the keyframes for the spinning animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const Spinner = styled(Icon)({
  animation: `${spin} 5s linear infinite`,
  fontSize: '5rem',
});
