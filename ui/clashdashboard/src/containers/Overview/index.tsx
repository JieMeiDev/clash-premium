import { useLayoutEffect, useMemo, useState } from 'react'

import { Card, Header } from '@components'
import { formatTraffic } from '@lib/helper'
import type * as API from '@lib/request'
import { useConnectionStreamReader, useI18n, useTrafficStreamReader } from '@stores'

import { TrafficChart } from './TrafficChart'
import './style.scss'

const CHART_SIZE = 150

function formatSpeed (value: number) {
    return `${formatTraffic(value)}/s`
}

export default function Overview () {
    const { translation } = useI18n()
    const t = useMemo(() => translation('Overview').t, [translation])

    const trafficReader = useTrafficStreamReader()
    const connectionReader = useConnectionStreamReader()

    const [speed, setSpeed] = useState({ up: 0, down: 0 })
    const [totals, setTotals] = useState({
        uploadTotal: 0,
        downloadTotal: 0,
        connections: 0,
    })
    const [chartUp, setChartUp] = useState<number[]>(() => Array(CHART_SIZE).fill(0))
    const [chartDown, setChartDown] = useState<number[]>(() => Array(CHART_SIZE).fill(0))

    useLayoutEffect(() => {
        function handleTraffic (items: API.Traffic[]) {
            for (const item of items) {
                setSpeed({ up: item.up, down: item.down })
                setChartUp(prev => [...prev.slice(-(CHART_SIZE - 1)), item.up])
                setChartDown(prev => [...prev.slice(-(CHART_SIZE - 1)), item.down])
            }
        }

        const buffered = trafficReader.buffer() as API.Traffic[]
        if (buffered.length > 0) {
            setChartUp(buffered.map(i => i.up))
            setChartDown(buffered.map(i => i.down))
            const latest = buffered[buffered.length - 1]
            setSpeed({ up: latest.up, down: latest.down })
        }

        trafficReader.subscribe('data', handleTraffic)
        return () => trafficReader.unsubscribe('data', handleTraffic)
    }, [trafficReader])

    useLayoutEffect(() => {
        function handleSnapshot (snapshots: API.Snapshot[]) {
            for (const snapshot of snapshots) {
                setTotals({
                    uploadTotal: snapshot.uploadTotal,
                    downloadTotal: snapshot.downloadTotal,
                    connections: snapshot.connections.length,
                })
            }
        }

        connectionReader.subscribe('data', handleSnapshot)
        return () => connectionReader.unsubscribe('data', handleSnapshot)
    }, [connectionReader])

    const stats = [
        { label: t('upload'), value: formatSpeed(speed.up) },
        { label: t('download'), value: formatSpeed(speed.down) },
        { label: t('uploadTotal'), value: formatTraffic(totals.uploadTotal) },
        { label: t('downloadTotal'), value: formatTraffic(totals.downloadTotal) },
        { label: t('activeConnections'), value: String(totals.connections) },
    ]

    return (
        <div className="page">
            <Header title={t('title')} />
            <div className="overview-stats">
                { stats.map(stat => (
                    <Card className="overview-stat" key={stat.label}>
                        <div className="overview-stat-label">{ stat.label }</div>
                        <div className="overview-stat-value">{ stat.value }</div>
                    </Card>
                )) }
            </div>
            <Card className="overview-chart">
                <TrafficChart
                    up={chartUp}
                    down={chartDown}
                    upLabel={t('chartUp')}
                    downLabel={t('chartDown')}
                />
            </Card>
        </div>
    )
}
