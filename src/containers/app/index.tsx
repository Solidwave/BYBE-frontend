
import { Paper, Grid } from '@mui/material';
import { useGetCreaturesListQuery } from '../../services/creatures';
import { Theme, useTheme } from '@emotion/react';
import { log } from 'console';


const AppContainer = () => {
  // const data = useGetCreaturesListQuery('');
  
  const theme = useTheme()

  
  
  // console.log(data.data);
  // if (data.isLoading) {
  //   return (
  //     <div>Loading</div>
  //   )
  // }

  // if (data.error) {
  //   return (
  //     <div>Error</div>
  //   )
  // }
     
  return (
    <div className="app" style={{
      backgroundColor: theme.palette.brown.main,
      minHeight: 1000,
      padding: 20
    }}>
     
          <div style={{
            borderRadius: 5,
            margin: 10,
            height: '100%',
            border: '5px solid',
            borderColor: theme.palette.brown.secondary,
            backgroundColor: theme.palette.brown.main,
            
          }}>
            <Grid>
              <Paper  >
                
              </Paper>
            </Grid>
            {/* {data.data?.results?.map((creature, index) => (
              <div>
                {creature.name}
              </div>
            ))} */}

          </div>
    </div>
  );
}

export default AppContainer