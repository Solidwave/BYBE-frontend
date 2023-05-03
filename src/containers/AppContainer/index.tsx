
import { Button, DialogContent, Grid, Modal, useMediaQuery, useTheme } from '@mui/material';
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
import { setPartyLevels } from '../../services/partySlice';

const AppContainer = () => {
  const [encounter, { data }] = useLazyGenerateEncounterQuery()

  const [modalOpen,setModalOpen] = useState(false)

  const [localCreatures, setLocalCreatures] = useState<Creature[]>(() => {
    let storedEncounter = localStorage.getItem('encounter_list')

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
      setLocalCreatures(data)
    }
  },[data])
 
    
  useEffect(() => {
    localStorage.setItem('encounter_list',JSON.stringify(localCreatures))
  },[localCreatures])

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const addCreature = (creature: Creature) => {
    setLocalCreatures(() => {
      let tmpData = [...localCreatures]

      tmpData.push(creature)

      return tmpData
    })
  }

  const removeCreature = (index: number) => {
    setLocalCreatures(() => {
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
      let value: (string & number[]) | undefined = field.value as (string & number[]) | undefined;

      tmpEncounterRequest[field.field.fieldName] = value 
    });

    return tmpEncounterRequest
  }

  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Background >
        <Panel  sx={{
          height: '100%',
          background: theme.gradient?.main,
          position: 'relative',
          [theme.breakpoints.down('md')]: {
            width: '100%'
          }
      }} borderRadius='2rem' padding={mobile ? '0' : '4rem 5.25rem 4rem 4rem'} border={mobile ? '0px' : '1rem solid'}>
          {mobile ? '' : <MainActions handleAction={handleAction} />}
          <Grid justifyContent={'space-evenly'} alignItems='flex-start' container spacing={'30px'}>
            <Grid  sx={{
            }} item xs={12} md={7}>
                <Panel  borderRadius='1rem' padding='1rem' border='5px solid' sx={{
                  maxHeight: 'calc(100vh - 300px)',
                  background: theme.gradient?.secondary,
                  boxShadow: theme.extraShadows?.panel
                }}>
                  <Header text='Total encounter cost:' cost={180}></Header>
                  <BasicTable onRowClick={addCreature} ></BasicTable>
                </Panel>
            </Grid>
            {mobile && <Grid item xs={12}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button variant='action' fullWidth onClick={() => {
                handleAction({type: 'encounter_builder', label: 'anything'})
              }} sx={{
                margin: 'auto'
              }}>Generate random encounter</Button>
            </div>
            </Grid> }
            <Grid item xs={12} md={5}>
            <Panel minWidth='100px'  minHeight='400px' border='0px' >
                <CreaturesList removeCreature={removeCreature} creatures={localCreatures || []} />
              </Panel>
            </Grid>
          </Grid>

        </Panel>
        <Modal keepMounted onClose={handleModalClose} open={modalOpen} >
          <DialogContent>
            <Form onSubmit={(values: ValuesType) => {
              const encounterRequest = getRequestEncounter(values)
              encounter(encounterRequest)

              if (encounterRequest.party_levels) {
                setPartyLevels(encounterRequest.party_levels)
              }
            }} form={form} />
          </DialogContent>
        </Modal>
    </Background>
  );
}

export default AppContainer