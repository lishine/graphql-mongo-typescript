import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, Box, Button, Collapse, Image, css } from '@chakra-ui/core'
import { gql } from '@apollo/client'
import { useInterval } from 'react-use'
import _throttle from 'lodash/throttle'
import { useParamsHandler } from 'react-handler-hooks'
import { useShowRoomQuery, useAddUserActivityMutation, EventType } from '~/generated/graphql'
import { Spinner as _Spinner } from '@chakra-ui/core'

const Spinner = () => {
    return <_Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
}

gql`
    query ShowRoom {
        showRoom {
            _id
            title
            boards {
                _id
                title
                image
            }
        }
    }
`

gql`
    mutation AddUserActivity($userActivity: UserActivityInput!) {
        addUserActivity(userActivity: $userActivity) {
            _id
        }
    }
`

export function Feed() {
    let { data, loading, error } = useShowRoomQuery()
    let [addUserActivity] = useAddUserActivityMutation()
    const [cntThrottledCalls, setCntThrottledCalls] = useState(0)
    const [hovers, setHovers] = useState([] as string[])

    let boardsRef = useRef(new Set<string>())
    useInterval(() => {
        let ar = [...boardsRef.current]
        if (data && ar.length > 0) {
            boardsRef.current.clear()
            addUserActivity({
                variables: {
                    userActivity: {
                        page: 'showroom_feed',
                        entity_id: data?.showRoom._id,
                        event_type: EventType.BoardHover,
                        data: ar.map((id) => ({ board_id: id })),
                    },
                },
            })
            setHovers(ar)
            setCntThrottledCalls(0)
        }
    }, 3000)
    let throttledCallback = useCallback(
        _throttle((_id: string) => {
            setCntThrottledCalls((c) => c + 1)
            boardsRef.current.add(_id)
        }, 200),
        []
    )
    let handler = useParamsHandler((_id: string) => throttledCallback(_id), [])

    if (loading || error) {
        return (
            <Box w='1000px' zIndex={100} d='flex' justifyContent='center' pt={10} fontSize='25px' fontWeight='bold'>
                {loading ? <Spinner /> : 'Some error has occurred'}
            </Box>
        )
    }

    return (
        <Box data-id='ShowRoom' h='full' ml={8} d='flex' flexDir='column' w='1000px'>
            <Box data-id='Boards' d='flex' flexWrap='wrap' as='dl'>
                {data?.showRoom.boards.map((b, index) => {
                    return (
                        <Box as='dd' data-id='Board' key={b._id} mt={16} onMouseEnter={handler(b._id)}>
                            <Image src={b.image} w='200px' />
                            <Box className='row' data-id='Board Title' mt={4} d='flex' justifyContent='center'>
                                {b.title}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box
                mx='auto'
                data-id='Counts'
                mt={16}
                w='500px'
                fontSize='20px'
                css={css({
                    '.hcell, .cell': {
                        flex: 1,
                    },
                    '.hcell, .cell, .header, .row': {
                        d: 'flex',
                        justifyContent: 'center',
                    },
                    '.header, .row': {
                        d: 'flex',
                    },
                    '.row': {
                        fontSize: '25px',
                        marginTop: '10px',
                    },
                })()}
            >
                <Box className='header'>
                    <Box className='hcell'>Count Throttled calls</Box>
                    <Box className='hcell'>Count Board hovers</Box>
                </Box>
                <Box className='row'>
                    <Box className='cell'>{cntThrottledCalls}</Box>
                    <Box className='cell'>{hovers.length}</Box>
                </Box>
            </Box>
        </Box>
    )
}
