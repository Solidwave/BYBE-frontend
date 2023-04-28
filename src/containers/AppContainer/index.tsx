
import { Grid, Modal, Select, Typography, useTheme } from '@mui/material';
import { useGetCreaturesListQuery } from '../../services/creatures';
import Panel from '../../components/panel';
import Background from '../../components/background';
import Container from '../../components/container';
import BasicTable from '../../components/table';
import Header from '../../components/header';
import CreaturesList from '../CreaturesList';
import { Creature } from '../../types/creature';
import React, { useState } from 'react';
// import encounterFormJson from '../../services/FormConfigurations/encounter-form.json'
import MainActions, { ActionType } from '../../components/MainActions';
import Form, { ValuesType } from '../../components/Form';
import { EncounterField, EncounterForm } from '../../types/EncounterForm';
import { EncounterRequest, useLazyGenerateEncounterQuery } from '../../services/encounter';

const AppContainer = () => {
  const [encounter, { data }] = useLazyGenerateEncounterQuery()

  const [modalOpen,setModalOpen] = useState(false)

  const [localCreatures, setLocalCraetures] = useState<Creature[]>(data || [])

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const onRowClick = (creature: Creature) => {
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
  
  const updateEncounter = (encounter: Creature[]) => {
    console.log('')
  }

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
          background: theme.gradient.main,
          position: 'relative'
        }} borderRadius='2rem' padding='4rem 5.25rem 4rem 4rem' border='1rem solid'>
          <MainActions handleAction={handleAction} />
          <Grid justifyContent={'space-evenly'} alignItems='flex-start' container spacing={'30px'}>
            <Grid  sx={{
            }} item xs={8}>
                <Panel  borderRadius='1rem' padding='1rem' border='5px solid' sx={{
                  maxHeight: 'calc(100vh - 300px)',
                  background: theme.gradient.secondary,
                  boxShadow: theme.extraShadows.panel
                }}>
                  <Header text='Total encounter cost:' cost={180}></Header>
                  <BasicTable  ></BasicTable>
                </Panel>
            </Grid>
            <Grid  item xs={4}>
            <Panel minWidth='100px'  minHeight='400px' border='0px' >
                <CreaturesList creatures={localCreatures || []} />
              </Panel>
            </Grid>
          </Grid>

        </Panel>
        <Modal onClose={handleModalClose} open={modalOpen} >
            <Form onSubmit={(values: ValuesType) => {
              encounter(getRequestEncounter(values))
            }} form={form} />
        </Modal>
    </Background>
  );
}

export default AppContainer