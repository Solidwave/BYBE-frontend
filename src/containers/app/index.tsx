
import { Grid, Select, Typography, useTheme } from '@mui/material';
import { useGetCreaturesListQuery } from '../../services/creatures';
import Panel from '../../components/panel';
import Background from '../../components/background';
import Container from '../../components/container';
import BasicTable from '../../components/table';
import Header from '../../components/header';

const AppContainer = () => {

  return (
    <Background >
        <Panel padding='4rem' border='16px solid'>
          <Grid justifyContent={'space-evenly'} alignItems={'center'} container spacing={'30px'}>
            <Grid  sx={{
            }} item xs={8}>
                <Panel  padding='16px' border='5px solid' sx={{
                  overflow: 'hidden'
                }}>
                  <Header text='Total encounter cost:' cost={180}></Header>
                  <BasicTable></BasicTable>
                </Panel>
            </Grid>
            <Grid  item xs={4}>
              <Panel border='5px solid' ></Panel>
            </Grid>
          </Grid>

        </Panel>


    </Background>
  );
}

export default AppContainer