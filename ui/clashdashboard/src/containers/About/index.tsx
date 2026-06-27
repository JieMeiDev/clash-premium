import { Header } from '@components'
import { useI18n, useClashXData, useVersion } from '@stores'

import { GitHubIcon } from './GitHubIcon'
import './style.scss'

const CLASH_SOURCE = 'https://github.com/JieMeiDev/clash'
const DASHBOARD_SOURCE = 'https://github.com/JieMeiDev/clash-dashboard'

interface VersionBlockProps {
    name: string
    version: string
    link: string
    versionLabel: string
    sourceLabel: string
}

function VersionBlock (props: VersionBlockProps) {
    const { name, version, link, versionLabel, sourceLabel } = props

    return (
        <section className="about-block">
            <h2 className="about-block-title">{ name }</h2>
            <p className="about-block-line">
                <span>{ versionLabel } </span>
                <span className="about-block-version">{ version }</span>
            </p>
            <p className="about-block-line">
                <a className="about-block-link" href={link} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon size={20} />
                    <span>{ sourceLabel }</span>
                </a>
            </p>
        </section>
    )
}

export default function About () {
    const { translation } = useI18n()
    const { t } = translation('About')
    const { version, premium } = useVersion()
    const { data } = useClashXData()

    const clashName = `Clash${data?.isClashX ? 'X' : ''}`
    const clashVersion = version
        ? `${version}${premium ? ' Premium' : ''}`
        : '—'

    return (
        <div className="page about-page">
            <Header title={t('title')} />
            { version && (
                <VersionBlock
                    name={clashName}
                    version={clashVersion}
                    link={CLASH_SOURCE}
                    versionLabel={t('version')}
                    sourceLabel={t('source')}
                />
            ) }
            <VersionBlock
                name={t('dashboard')}
                version={__APP_VERSION__}
                link={DASHBOARD_SOURCE}
                versionLabel={t('version')}
                sourceLabel={t('source')}
            />
        </div>
    )
}
