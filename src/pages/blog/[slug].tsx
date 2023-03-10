// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate'
import BlogLayout from '../../layouts/blog'
import MDXComponents from '../../components/MDXComponents'

type Props = {
    mdxSource: any
    frontMatter: {
    title: string;
    by: string;
    publishedAt: string;
    readingTime: {
        text: string;
        minutes: number;
    };
}  
}

export default function Blog(props:Props) {
    const { mdxSource, frontMatter } = props
    const content = hydrate(mdxSource, {
        components: MDXComponents
    })

    return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export async function getStaticPaths() {
    const posts = await getFiles('blog')

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    }
}

export async function getStaticProps(params:any) {
    const post = await getFileBySlug('blog', params.slug)

    return { props: post }
}