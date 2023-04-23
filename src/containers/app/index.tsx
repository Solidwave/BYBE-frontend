
import { Grid, Select, Typography, useTheme } from '@mui/material';
import { useGetCreaturesListQuery } from '../../services/creatures';
import Panel from '../../components/panel';
import Background from '../../components/background';
import Container from '../../components/container';
import BasicTable from '../../components/table';
import Header from '../../components/header';
import CreaturesList from '../CreaturesList';
import { Creature } from '../../types/creature';
import { useState } from 'react';

const AppContainer = () => {
  const [encounter, setEncounter] = useState<Creature[]>([])

  const updateEncounter = (encounter: Creature[]) => {
    setEncounter(encounter)
  }

  const theme = useTheme()

  return (
    <Background >
        <Panel  sx={{
          height: '100%',
          background: theme.gradient.main
        }} borderRadius='2rem' padding='4rem 5.25rem 4rem 4rem' border='1rem solid'>
          <Grid justifyContent={'space-evenly'} alignItems='flex-start' container spacing={'30px'}>
            <Grid  sx={{
            }} item xs={8}>
                <Panel  borderRadius='1rem' padding='1rem' border='5px solid' sx={{
                  maxHeight: 'calc(100vh - 300px)',
                  background: theme.gradient.secondary,
                  boxShadow: theme.extraShadows.panel
                }}>
                  <Header text='Total encounter cost:' cost={180}></Header>
                  <BasicTable updateEncounter={setEncounter}></BasicTable>
                </Panel>
            </Grid>
            <Grid  item xs={4}>
            <Panel minWidth='100px'  minHeight='400px' border='0px' >
                <CreaturesList creatures={encounter} />
              </Panel>
            </Grid>
          </Grid>

        </Panel>


    </Background>
  );
}

export default AppContainer