import { memo, ReactElement } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CategoryPicker from 'src/components/CategoryPicker';
import PageWrapper from 'src/components/PageWrapper';
import { Spinner } from 'src/components/Spinner';

export default memo(function WelcomePage(): ReactElement {
  return (
    <PageWrapper>
      <Stack alignItems={'center'} spacing={3}>
        <Spinner icon="mdi:paw" />
        <Typography variant="h4">Select an animal to see something cool 🎈</Typography>
        <CategoryPicker />
      </Stack>
    </PageWrapper>
  );
});
