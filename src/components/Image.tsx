import { CSSProperties, memo } from 'react';

import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';

import Box, { BoxProps } from '@mui/material/Box';
import { Theme, SxProps } from '@mui/material/styles';

type IProps = BoxProps & LazyLoadImageProps & CSSProperties;

interface Props extends IProps {
  sx?: SxProps<Theme>;
}

export default memo(function Image({ sx, ...other }: Props) {
  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={'blur'}
        sx={{
          width: 1,
          height: 1,
          objectFit: 'contain', // make the content cover the entire width or height of the container while maintaining its aspect ratio
          maxHeight: other.height ?? '400px',
        }}
        {...other}
      />
    </Box>
  );
});
