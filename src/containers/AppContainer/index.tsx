
import { Button, Grid, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import Panel from '../../components/Panel';
import Background from '../../components/Backround';
import BasicTable from '../../components/BasicTable';
import Header from '../../components/Header';
import CreaturesList from '../CreaturesList';
import { Creature } from '../../types/Creature';
import React, { useEffect, useState } from 'react';
// import encounterFormJson from '../../services/FormConfigurations/encounter-form.json'
import encounterFormJson from '../../services/FormConfigurations/encounter-form.json'

import MainActions from '../../components/MainActions';
import Form from '../../components/Form';
import { EncounterForm, ValuesType } from '../../types/EncounterForm';
import { EncounterRequest, useLazyGenerateEncounterQuery } from '../../services/encounter';
import { useAppDispatch } from '../../app/hooks';
import { ActionType } from '../../types/MainActions';
import ModalContainer from '../ModalContainer/indext';
import { closeModal, openModal } from '../../slices/modal';
import { useSelector } from 'react-redux';
import { selectPartyPlayersLevels } from '../../slices/partySlice';
import PartyBuilder from '../../components/PartyBuilder';
import { selectEncounterInfo } from '../../slices/encounterinfoslice';
import MobileList from '../../components/MobileList';

const encounterModalId = 'encounter_modal'

const partyManagerModalId = 'party_manager_modal'

const AppContainer = () => {
    const [encounter, { data : encounterData , isFetching }] = useLazyGenerateEncounterQuery()

    const encounterInfo = useSelector(selectEncounterInfo)

    const party_levels = useSelector(selectPartyPlayersLevels)

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [creatureAddedSnackbar, setCreatureAddedSnackbar] = useState(false)

    const dispatch = useAppDispatch()

    const [localCreatures, setLocalCreatures] = useState<Creature[]>(() => {
        const storedEncounter = localStorage.getItem('encounter_list')

        let tmpData: Creature[] = []

        if (storedEncounter !== null) {
            try {
                tmpData = JSON.parse(storedEncounter) || []
                return tmpData
            } catch (error) {
                console.log('error retrieving local data')
            }
        }

        return encounterData?.results || []

    })

    useEffect(() => {
        if (encounterData) {
            setLocalCreatures(encounterData.results)
        }
    }, [encounterData])

    useEffect(() => {
        localStorage.setItem('encounter_list', JSON.stringify(localCreatures))
    }, [localCreatures])


    const handleModalClose = () => {
        dispatch(closeModal())
    }

    const addCreature = (creature: Creature) => {
        setLocalCreatures(() => {
            const tmpData = [...localCreatures]

            const tmpCreature: Creature = { ...creature, variant: 'normal' }

            tmpData.push(tmpCreature)

            return tmpData
        })
        
        setCreatureAddedSnackbar(true)
    }

   

    const removeCreature = (index: number) => {
        setLocalCreatures(() => {
            const tmpData = [...localCreatures]

            tmpData.splice(index, 1)

            return tmpData
        })
    }

    const removeAllCreatures = () => {
        setLocalCreatures([])
    }

    const updateCreature = (creature: Creature, index: number) => {
        const tmpLocalCretures = [...localCreatures]

        tmpLocalCretures[index] = creature

        setLocalCreatures(tmpLocalCretures)
    }

    const handleAction = (action: ActionType) => {
        switch (action.type) {
            case 'encounter_builder':
                dispatch(openModal(encounterModalId))
                break
            case 'party_builder':
                dispatch(openModal(partyManagerModalId))
                break
            default:
                break
        }
    }



    const getRequestEncounter = (form: ValuesType): EncounterRequest => {
        const tmpEncounterRequest: EncounterRequest = {}
        form.forEach(field => {
            const value: (string & number[]) | undefined = field.value as (string & number[]) | undefined;

            tmpEncounterRequest[field.field.fieldName] = value
        });

        return tmpEncounterRequest
    }

    const theme = useTheme()

    const mobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Background >
            <Panel sx={{
                height: '100%',
                background: theme.gradient?.main,
                position: 'relative',
                width: '100%'
            }} borderRadius='2rem' padding={mobile ? '0' : '4rem 5.25rem'} border={mobile ? '0px' : '1rem solid'}>
                {!mobile && <MainActions handleAction={handleAction} />}
                <Grid justifyContent={'space-evenly'} alignItems='flex-start' container spacing={'30px'}>
                    <Grid sx={{
                        width: '100%'
                    }} item xs={12} md={7}>
                        <Panel borderRadius='1rem' padding='1rem' border='5px solid' sx={{
                            height: 'calc(100vh - 300px)',
                            background: theme.gradient?.secondary,
                            boxShadow: theme.extraShadows?.panel,
                            display: 'flex',
                            flexDirection: 'column'
                            
                        }}>
                            <Header text='Encounter experience' subtitle={encounterInfo?.difficulty !== '' ? `Difficulty: ${encounterInfo?.difficulty }` : ''} cost={encounterInfo?.experience}></Header>
                            {mobile ? <MobileList onRowClick={addCreature}/> : <BasicTable onRowClick={addCreature} ></BasicTable>}
                        </Panel>
                    </Grid>
                    {mobile && <React.Fragment>
                        <Grid sx={{
                            mx: '1rem'
                        }} item xs={12}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Button variant='action' fullWidth onClick={() => {
                                    handleAction({ type: 'encounter_builder', label: 'anything' })
                                }} sx={{
                                    margin: 'auto'
                                }}>ENCOUNTER BUILDER</Button>
                            </div>
                        </Grid>
                        <Grid sx={{
                            mx: '1rem'
                        }} item xs={12}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Button variant='action' fullWidth onClick={() => {
                                    handleAction({ type: 'party_builder', label: 'anything' })
                                }} sx={{
                                    margin: 'auto'
                                }}>PARTY BUILDER</Button>
                            </div>
                        </Grid>
                    </React.Fragment>}
                    <Grid item xs={12} md={5}>
                        <Panel border='0px' >
                            <CreaturesList removeAll={removeAllCreatures} removeCreature={removeCreature} updateCreature={updateCreature} creatures={localCreatures || []} />
                        </Panel>
                    </Grid>
                </Grid>

            </Panel>
            <ModalContainer modalId={encounterModalId}>
                <Form modalId={encounterModalId} isSubmitting={isFetching} onSubmit={(values: ValuesType) => {
                    const encounterRequest = getRequestEncounter(values)

                    encounterRequest['party_levels'] = party_levels

                    encounter(encounterRequest).then(res => {
                        if (res.isSuccess) {
                            handleModalClose()
                            if (res.data.results.length === 0) {
                                setOpenSnackbar(true)
                            }
                        }
                    })
                }} form={encounterFormJson as EncounterForm} />
            </ModalContainer>
            <ModalContainer modalId={partyManagerModalId}>
                <PartyBuilder />
            </ModalContainer>
            <Snackbar 
                open={openSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                message="The filters you chose didn't produce any creature... Try changing them!"
            />
            <Snackbar 
                open={creatureAddedSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => setCreatureAddedSnackbar(false)}
                message="Creature added!"
            />
        </Background>
    );
}

export default AppContainer