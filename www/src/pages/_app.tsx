import React, { ReactNode, FC, useEffect, useState, ReactElement } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { InMemoryCache, ApolloProvider, ApolloClient, HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { ThemeProvider } from '@chakra-ui/core'
import { CSSReset, Grid, Spinner } from '@chakra-ui/core'
import { Global } from '@emotion/core'

import { theme } from '~/theme'

const DefaultOnSSR = () => <span />

const NoSSRComponent = ({ children }: { children: ReactElement }) => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    return state ? children : <DefaultOnSSR />
}

const NoSSR = (Component: any) => (props: any) => (
    <NoSSRComponent>
        <Component {...props} />
    </NoSSRComponent>
)

function createApolloClient() {
    // let wsLink = new WebSocketLink({
    //     uri: process.env.NEXT_PUBLIC_WS_API_URL,
    //     options: {
    //         reconnect: true,
    //     },
    // })
    let httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL, // must be absolute
        // credentials: 'include',
        fetch,
    })
    // const splitLink = split(
    //     ({ query }) => {
    //         const definition = getMainDefinition(query)
    //         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    //     },
    //     wsLink,
    //     httpLink
    // )

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    })
}

export let client: ReturnType<typeof createApolloClient>

import { Layout } from '~/Layout'

function MyApp({ Component, pageProps }: AppProps) {
    console.log('App MOUNT')
    client = createApolloClient()

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Global
                styles={{
                    '::-webkit-search-cancel-button': {
                        WebkitAppearance: 'none',
                    },
                    body: {
                        backgroundColor: 'rgb(245,247,251)',
                        color: 'rgb(53,64,82)',
                        fontSize: '14px',
                        lineHeight: '24px',
                    },
                }}
            />
            <ApolloProvider client={client}>
                <Head>
                    {/* <meta charSet='utf-8' name='viewport' content='width=1170' /> */}
                    <meta
                        charSet='utf-8'
                        name='viewport'
                        content='width=device-width, initial-scale=1, shrink-to-fit=no'
                    />
                    <meta name='description' content='Boards' />
                    <title>Show Room</title>
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext'
                    />
                    <link rel='icon' type='image/x-icon' href='favicon.ico' />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default NoSSR(MyApp)
