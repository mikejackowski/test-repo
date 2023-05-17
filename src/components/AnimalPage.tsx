import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

import { client } from 'src/api/client';
import GET_NUMBER_OF_GIFS, { GetNumberOfGifsData } from 'src/api/queries/GetNumberOfGifs';
import GET_RANDOM_GIFS, { GetRandomGifsData } from 'src/api/queries/GetSetOfGifs';
import { categories } from 'src/components/CategoryPicker';
import Icon from 'src/components/Icon';
import Image from 'src/components/Image';
import PageWrapper from 'src/components/PageWrapper';

function AnimalPage() {
  const { category } = useParams<{ category?: string }>();

  const [gifs, setGifs] = useState<string[]>([]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('down(sm)');

  useEffect(() => {
    if (category && categories.find((item) => item.label === category)) {
      fetchGifs();
    } else {
      navigate('/');
    }
  }, [category]);

  const fetchGifs = async () => {
    const result = await client.query<GetNumberOfGifsData>(GET_NUMBER_OF_GIFS, { category }).toPromise();
    const totalNumber = result.data?.gifs_aggregate.aggregate.count;

    if (totalNumber) {
      const randomOffsets = new Set<number>();
      while (randomOffsets.size < 3) {
        randomOffsets.add(Math.floor(Math.random() * totalNumber));
      }

      const randomItems = await Promise.all(Array.from(randomOffsets).map((offset) => client.query<GetRandomGifsData>(GET_RANDOM_GIFS, { category, offset }).toPromise()));
      console.log(randomItems);
      const gifs = randomItems.map((item) => item.data?.gifs[0].url).filter((url) => !!url) as string[];
      console.log(gifs);
      setGifs(gifs);
    }
  };

  return (
    <PageWrapper>
      <Stack width={'100%'} direction={isSmallScreen ? 'column' : 'row'} spacing={2}>
        {gifs.map((gif, index) => (
          <Image
            sx={{
              width: isSmallScreen ? '100%' : '33%',
              height: '400px',
            }}
            key={index}
            src={gif}
            alt="Random gif"
          />
        ))}
      </Stack>
      <Stack direction="column" spacing={2} marginTop={2}>
        <Button size="large" startIcon={<Icon icon="fad:random-1dice" />} variant="contained" color="primary" onClick={fetchGifs}>
          Show me more!
        </Button>
        <Button size="small" startIcon={<Icon icon="mdi:paw" />} variant="contained" color="info" onClick={() => navigate('/')}>
          I want a different animal!
        </Button>
      </Stack>
    </PageWrapper>
  );
}

export default AnimalPage;
