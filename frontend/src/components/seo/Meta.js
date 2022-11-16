import { Helmet } from 'react-helmet-async'

const Meta = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />

            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}

export default Meta;