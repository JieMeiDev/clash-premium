import classnames from 'classnames'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

import { Header, Card, ButtonSelect, Input, Select } from '@components'
import { useObject } from '@lib/hook'
import { useI18n, useClashXData, useGeneral, useVersion, useClient, identityAtom, hostSelectIdxStorageAtom, hostsStorageAtom, useAPIInfo } from '@stores'
import './style.scss'

export default function Settings () {
    const { premium } = useVersion()
    const { data: clashXData } = useClashXData()
    const { general, update: fetchGeneral } = useGeneral()
    const setIdentity = useSetAtom(identityAtom)
    const [hostSelectIdx, setHostSelectIdx] = useAtom(hostSelectIdxStorageAtom)
    const hostsStorage = useAtomValue(hostsStorageAtom)
    const apiInfo = useAPIInfo()
    const { translation } = useI18n()
    const { t } = translation('Settings')
    const client = useClient()
    const [info, set] = useObject({
        socks5ProxyPort: 7891,
        httpProxyPort: 7890,
        redirPort: 0,
        tproxyPort: 0,
        mixedProxyPort: 0,
    })

    useEffect(() => {
        set('socks5ProxyPort', general?.socksPort ?? 0)
        set('httpProxyPort', general?.port ?? 0)
        set('redirPort', general?.redirPort ?? 0)
        set('tproxyPort', general?.tproxyPort ?? 0)
        set('mixedProxyPort', general?.mixedPort ?? 0)
    }, [general, set])

    async function handleProxyModeChange (mode: string) {
        await client.updateConfig({ mode })
        await fetchGeneral()
    }

    async function handleHttpPortSave () {
        await client.updateConfig({ port: info.httpProxyPort })
        await fetchGeneral()
    }

    async function handleRedirPortSave () {
        await client.updateConfig({ 'redir-port': info.redirPort })
        await fetchGeneral()
    }

    async function handleTproxyPortSave () {
        await client.updateConfig({ 'tproxy-port': info.tproxyPort })
        await fetchGeneral()
    }

    async function handleSocksPortSave () {
        await client.updateConfig({ 'socks-port': info.socks5ProxyPort })
        await fetchGeneral()
    }

    async function handleMixedPortSave () {
        await client.updateConfig({ 'mixed-port': info.mixedProxyPort })
        await fetchGeneral()
    }

    const {
        hostname: externalControllerHost,
        port: externalControllerPort,
    } = apiInfo

    const { mode } = general
    const isClashX = clashXData?.isClashX ?? false

    const proxyModeOptions = useMemo(() => {
        const options = [
            { label: t('values.global'), value: 'global' },
            { label: t('values.rules'), value: 'rule' },
            { label: t('values.direct'), value: 'direct' },
        ] as Array<{ label: string, value: string }>
        if (premium) {
            options.push({ label: t('values.script'), value: 'script' })
        }
        return options
    }, [t, premium])

    const controllerOptions = hostsStorage.map(
        (h, idx) => ({ value: idx, label: <span className="truncate text-right">{h.hostname}</span> }),
    )

    const controllers = isClashX
        ? <span className="text-sm text-primary-darken">{`${externalControllerHost}:${externalControllerPort}`}</span>
        : (
            <>
                <Select
                    disabled={hostsStorage.length < 2 && !isClashX}
                    options={controllerOptions}
                    value={hostSelectIdx}
                    onSelect={idx => setHostSelectIdx(idx)}
                />
                <span
                    className={classnames({ 'modify-btn': !isClashX }, 'external-controller')}
                    onClick={() => !isClashX && setIdentity(false)}>
                    {t('labels.edit')}
                </span>
            </>
        )

    return (
        <div className="page">
            <Header title={t('title')} />
            <Card className="settings-card">
                <div className="flex flex-wrap">
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.proxyMode')}</span>
                        <ButtonSelect
                            options={proxyModeOptions}
                            value={mode}
                            onSelect={handleProxyModeChange}
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.socks5ProxyPort')}</span>
                        <Input
                            className="w-28"
                            disabled={isClashX}
                            value={info.socks5ProxyPort}
                            onChange={socks5ProxyPort => set('socks5ProxyPort', +socks5ProxyPort)}
                            onBlur={handleSocksPortSave}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.httpProxyPort')}</span>
                        <Input
                            className="w-28"
                            disabled={isClashX}
                            value={info.httpProxyPort}
                            onChange={httpProxyPort => set('httpProxyPort', +httpProxyPort)}
                            onBlur={handleHttpPortSave}
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.redirPort')}</span>
                        <Input
                            className="w-28"
                            disabled={isClashX}
                            value={info.redirPort}
                            onChange={redirPort => set('redirPort', +redirPort)}
                            onBlur={handleRedirPortSave}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.tproxyPort')}</span>
                        <Input
                            className="w-28"
                            disabled={isClashX}
                            value={info.tproxyPort}
                            onChange={tproxyPort => set('tproxyPort', +tproxyPort)}
                            onBlur={handleTproxyPortSave}
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.mixedProxyPort')}</span>
                        <Input
                            className="w-28"
                            disabled={isClashX}
                            value={info.mixedProxyPort}
                            onChange={mixedProxyPort => set('mixedProxyPort', +mixedProxyPort)}
                            onBlur={handleMixedPortSave}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full flex items-center justify-between px-8 py-3 md:w-1/2">
                        <span className="label font-medium">{t('labels.externalController')}</span>
                        <div className="flex items-center space-x-2">
                            { controllers }
                        </div>
                    </div>
                    <div className="w-1/2 px-8"></div>
                </div>
            </Card>
        </div>
    )
}
