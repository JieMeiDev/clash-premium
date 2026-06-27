import { useMemo } from 'react'

import { Button, Card, Header, Modal } from '@components'
import { formatTraffic } from '@lib/helper'
import { useVisible } from '@lib/hook'
import { useI18n, useStatistics } from '@stores'

import './style.scss'

function RankList (props: {
    title: string
    emptyText: string
    items: Array<{ ip: string, download: number }>
}) {
    const { title, emptyText, items } = props

    return (
        <Card className="statistics-panel">
            <div className="statistics-panel-title">{ title }</div>
            { items.length === 0
                ? <div className="statistics-empty">{ emptyText }</div>
                : (
                    <ol className="statistics-list">
                        { items.map((item, index) => (
                            <li className="statistics-row" key={item.ip}>
                                <span className="statistics-rank">{ index + 1 }</span>
                                <span className="statistics-ip overview-stat-label">{ item.ip }</span>
                                <span className="statistics-value overview-stat-value">{ formatTraffic(item.download) }</span>
                            </li>
                        )) }
                    </ol>
                ) }
        </Card>
    )
}

export default function Statistics () {
    const { translation } = useI18n()
    const t = useMemo(() => translation('Statistics').t, [translation])
    const { monthLabel, topSourceIP, topDestinationIP, clearCurrentMonth } = useStatistics()
    const { visible, show, hide } = useVisible()

    function handleClear () {
        clearCurrentMonth()
        hide()
    }

    return (
        <div className="page statistics-page">
            <Header title={t('title')}>
                <span className="statistics-month">{ monthLabel }</span>
                <Button type="danger" onClick={show}>{ t('clear') }</Button>
            </Header>
            <div className="statistics-grid">
                <RankList
                    title={t('topSourceIP')}
                    emptyText={t('empty')}
                    items={topSourceIP}
                />
                <RankList
                    title={t('topDestinationIP')}
                    emptyText={t('empty')}
                    items={topDestinationIP}
                />
            </div>
            <Modal title={t('clearConfirm.title')} show={visible} onClose={hide} onOk={handleClear}>
                { t('clearConfirm.content') }
            </Modal>
        </div>
    )
}
