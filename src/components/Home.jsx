import {
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import TopDrawer from './TopDrawer';
import { dictionariesUrl, randomWordUrl } from '../common/constants';

const Home = () => {
  const [dictionaries, setDictionaries] = useState([]);
  const [activeDictionary, setActiveDictionary] = useState(undefined);
  const [wordAndDefinition, setWordAndDefinition] = useState(undefined);

  useEffect(() => {
    fetch(dictionariesUrl)
      .then((data) => data.json())
      .then((data) => {
        setDictionaries(data);
        setActiveDictionary(data[0]);
      })
      .catch((e) => console.log(e));
  }, []);

  const getRandomWord = () => {
    fetch(`${randomWordUrl}?tag=${activeDictionary.tags[0]}`)
      .then((data) => data.json())
      .then((data) => setWordAndDefinition(data))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <TopDrawer />
      <Grid container spacing={4} direction={'row'}>
        <Grid item>
          <Stack direction='column' spacing={2}>
            {dictionaries &&
              dictionaries.map((d) => (
                <Chip
                  label={d.title}
                  key={d._id}
                  onClick={() => {
                    setActiveDictionary(d);
                  }}
                  color={
                    d._id === activeDictionary._id ? 'primary' : 'secondary'
                  }
                />
              ))}
          </Stack>
        </Grid>
        <Grid item sm={4}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item sm={4}>
              <Button onClick={getRandomWord} variant='contained'>
                Get Random Word
              </Button>
            </Grid>
            {wordAndDefinition && (
              <Grid item sm={4}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>{wordAndDefinition.word}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{wordAndDefinition.definition}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
