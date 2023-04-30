
import { DialogContent, Grid, Modal, useTheme } from '@mui/material';
import Panel from '../../components/panel';
import Background from '../../components/background';
import BasicTable from '../../components/BasicTable';
import Header from '../../components/header';
import CreaturesList from '../CreaturesList';
import { Creature } from '../../types/creature';
import React, { useEffect, useState } from 'react';
// import encounterFormJson from '../../services/FormConfigurations/encounter-form.json'
import MainActions, { ActionType } from '../../components/MainActions';
import Form, { ValuesType } from '../../components/Form';
import { EncounterForm } from '../../types/EncounterForm';
import { EncounterRequest, useLazyGenerateEncounterQuery } from '../../services/encounter';

const AppContainer = () => {
  const [encounter, { data }] = useLazyGenerateEncounterQuery()

  const [modalOpen,setModalOpen] = useState(false)

  const [localCreatures, setLocalCraetures] = useState<Creature[]>(() => {
    let storedEncounter = localStorage.getItem('encounter_list')
    console.log(storedEncounter, 'reading storage');

    let tmpData: Creature[] = []

    if (storedEncounter !== null) {
      try {
        tmpData = JSON.parse(storedEncounter) || []
        return tmpData
      } catch (error) {
        
      }
    }

    return data || []
    
  })

  useEffect(() => {
    if (data) {
      setLocalCraetures(data)
    }
  },[data])
 
    
  useEffect(() => {
    localStorage.setItem('encounter_list',JSON.stringify(localCreatures))
  },[localCreatures])

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const addCreature = (creature: Creature) => {
    setLocalCraetures(() => {
      let tmpData = [...localCreatures]

      tmpData.push(creature)

      return tmpData
    })
  }

  const removeCreature = (index: number) => {
    setLocalCraetures(() => {
      let tmpData = [...localCreatures]

      tmpData.splice(index, 1)

      return tmpData
    })
  }

  const handleAction = (action: ActionType) => {
    switch(action.type){
      case 'encounter_builder':
        setModalOpen(true)
    }
  }

  const form: EncounterForm = require('../../services/FormConfigurations/encounter-form.json')

  const getRequestEncounter = (form: ValuesType): EncounterRequest => {
    const tmpEncounterRequest : EncounterRequest = {}
    form.forEach(field => {
      let value: (string & Number[]) | undefined = field.value as (string & Number[]) | undefined;

      tmpEncounterRequest[field.field.fieldName] = value 
    });

    return tmpEncounterRequest
  }

  const theme = useTheme()

  return (
    <Background >
        <Panel  sx={{
          height: '100%',
          background: theme.gradient?.main,
          position: 'relative'
        }} borderRadius='2rem' padding='4rem 5.25rem 4rem 4rem' border='1rem solid'>
          <MainActions handleAction={handleAction} />
          <Grid justifyContent={'space-evenly'} alignItems='flex-start' container spacing={'30px'}>
            <Grid  sx={{
            }} item xs={7}>
                <Panel  borderRadius='1rem' padding='1rem' border='5px solid' sx={{
                  maxHeight: 'calc(100vh - 300px)',
                  background: theme.gradient?.secondary,
                  boxShadow: theme.extraShadows?.panel
                }}>
                  <Header text='Total encounter cost:' cost={180}></Header>
                  <BasicTable onRowClick={addCreature} ></BasicTable>
                </Panel>
            </Grid>
            <Grid  item xs={5}>
            <Panel minWidth='100px'  minHeight='400px' border='0px' >
                <CreaturesList removeCreature={removeCreature} creatures={localCreatures || []} />
              </Panel>
            </Grid>
          </Grid>

        </Panel>
        <Modal keepMounted onClose={handleModalClose} open={modalOpen} >
          <DialogContent>
            <Form onSubmit={(values: ValuesType) => {
              encounter(getRequestEncounter(values))
            }} form={form} />
          </DialogContent>
        </Modal>
    </Background>
  );
}

export default AppContainer