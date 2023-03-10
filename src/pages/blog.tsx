import Head from 'next/head'
import {
    Heading,
    Flex,
    Stack,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'

import Container from '../components/Container'
import BlogPost from '../components/BlogPost'

import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

type Props = {
    posts: {
        title: string
        by: string
        publishedAt: string
        readingTime: {
            text: string
            minutes: number
        }
    }[]
}

export default function Blog(props:Props) {
    const { posts } = props
    const [searchValue, setSearchValue] = useState('')

    const filteredBlogPosts = posts
        .sort(
            (a:any, b:any) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter((frontMatter:any) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (
        <>
            <Head>
                <title>Blog - Benjamin Carlson</title>
            </Head>
            <Container>
                <Stack
                    as="main"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    m="0 auto 4rem auto"
                    maxWidth="700px"
                >
                    <Flex
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        maxWidth="700px"
                        px={4}
                    >
                        <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
                            Blog ({posts.length} posts)
                        </Heading>
                        <InputGroup mb={4} mr={4} w="100%">
                            <Input
                                aria-label="Search by title"
                                placeholder="Search by title"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <SearchIcon color="gray.300" />
                            </InputRightElement>
                        </InputGroup>
                        {!filteredBlogPosts.length && 'No posts found :('}
                        {filteredBlogPosts.map((frontMatter: any) => <BlogPost key={frontMatter.title} {...frontMatter} />)}
                    </Flex>
                </Stack>
            </Container>
        </>
    )
}

export async function getStaticProps() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
  return { props: { posts } };
}