import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Link, LinkProps } from '@chakra-ui/core'
import NextLink from 'next/link'

export const RouteLink: FC<{ href: string } & LinkProps> = ({ children, href, ...props }) => {
    const router = useRouter()
    const style = React.useMemo(
        () => ({
            color: 'rgb(53,64,82,0.75)',
            _hover: {
                bg: 'gray.200',
            },
            _focus: {
                boxShadow: ['', '0 0 0 3px rgb(200,200,200)'],
            },
            ...(router.pathname === href
                ? {
                      bg: 'gray.100',
                  }
                : {}),
        }),
        [router.pathname, href]
    )

    return (
        <NextLink href={href} passHref shallow>
            <Link {...style} {...props}>
                {children}
            </Link>
        </NextLink>
    )
}
