import { PropsWithChildren, useCallback, FC, useRef, forwardRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { withDataId } from '~/utils'

const Container = withDataId('Layout')
const Top = withDataId('Top', { as: 'header' })
const Left = withDataId('Left', { as: 'aside' })
const Center = withDataId('Center', { as: 'main' })

let topHeight = '56px'

export function Layout({ children }: PropsWithChildren<{}>) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    return (
        <Container
            {...{
                d: 'grid',
                position: 'fixed',
                gridTemplateColumns: 'auto 1fr',
                gridTemplateRows: '56px 1fr',
                gridTemplateAreas: `
                    'Left Top'
                    'Left Center'
                `,
                h: '100vh',
                // w: 'calc(100vw - 240px)',
                w: 'full',
            }}
        >
            <Left
                {...{
                    gridArea: 'Left',
                    d: 'flex',
                    flexDirection: 'column',
                    // pt: 3,
                    w: '240px',
                    // bg: '#E2E8F0',
                    bg: 'transparent',
                    // bg: 'rgb(242, 242, 242)',
                    boxShadow: 'rgba(0, 0, 0, 0.09) 2px 0px 10px -3px',
                }}
            />

            <Top
                {...{
                    gridArea: 'Top',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: 4,
                    height: topHeight,
                    bg: 'transparent',
                    // boxShadow: 'inset 0 -1px 0 0 rgba(110,117,130,.2)',
                    // boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 10px -3px',
                }}
            />
            <Center
                {...{
                    bg: 'white',
                    gridArea: 'Center',
                    // w: 'full',
                }}
            >
                {children}
            </Center>
        </Container>
    )
}
