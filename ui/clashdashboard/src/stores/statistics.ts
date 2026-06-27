import { atom, useAtom, useSetAtom } from 'jotai'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import * as Stats from '@lib/statistics'
import type * as API from '@lib/request'

import { useAPIInfo } from './request'
import { useConnectionStreamReader } from './jotai'

export const statisticsStoreAtom = atom<Stats.StatisticsStore>({ version: Stats.STATS_VERSION, months: {} })

export function useStatisticsFeed () {
    const apiInfo = useAPIInfo()
    const connReader = useConnectionStreamReader()
    const setStore = useSetAtom(statisticsStoreAtom)
    const storageKey = Stats.getStorageKey(apiInfo.hostname, apiInfo.port)
    const inFlightRef = useRef(new Map<string, { upload: number, download: number }>())
    const storeRef = useRef<Stats.StatisticsStore>(Stats.loadStore(storageKey))
    const saveTimerRef = useRef<number>()
    const monthRef = useRef(Stats.getMonthKey())

    useEffect(() => {
        inFlightRef.current.clear()
        storeRef.current = Stats.loadStore(storageKey)
        monthRef.current = Stats.getMonthKey()
        setStore({ ...storeRef.current })
    }, [storageKey, setStore])

    const scheduleSave = useCallback(() => {
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current)
        }
        saveTimerRef.current = window.setTimeout(() => {
            Stats.saveStore(storageKey, storeRef.current)
        }, 1000)
    }, [storageKey])

    useLayoutEffect(() => {
        function process (connections: API.Connections[]) {
            const month = Stats.getMonthKey()
            if (month !== monthRef.current) {
                monthRef.current = month
                inFlightRef.current.clear()
            }

            const bucket = Stats.getCurrentMonthBucket(storeRef.current, month)
            const currentIds = new Set<string>()
            let changed = false

            for (const c of connections) {
                currentIds.add(c.id)
                const sourceIP = c.metadata.sourceIP || '-'
                const destKey = Stats.getDestinationKey(c.metadata)

                const prev = inFlightRef.current.get(c.id)
                if (!prev) {
                    inFlightRef.current.set(c.id, { upload: c.upload, download: c.download })
                    continue
                }

                const dUpload = c.upload - prev.upload
                const dDownload = c.download - prev.download
                if (dUpload > 0 || dDownload > 0) {
                    Stats.addTraffic(bucket, sourceIP, destKey, dUpload, dDownload)
                    changed = true
                }
                prev.upload = c.upload
                prev.download = c.download
            }

            for (const id of [...inFlightRef.current.keys()]) {
                if (!currentIds.has(id)) {
                    inFlightRef.current.delete(id)
                }
            }

            if (changed) {
                setStore({ ...storeRef.current })
                scheduleSave()
            }
        }

        function handle (snapshots: API.Snapshot[]) {
            for (const snapshot of snapshots) {
                process(snapshot.connections)
            }
        }

        connReader.subscribe('data', handle)
        return () => connReader.unsubscribe('data', handle)
    }, [connReader, scheduleSave, setStore])

    useEffect(() => () => {
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current)
        }
        Stats.saveStore(storageKey, storeRef.current)
    }, [storageKey])
}

export function useStatistics () {
    const [store] = useAtom(statisticsStoreAtom)
    const apiInfo = useAPIInfo()
    const setStore = useSetAtom(statisticsStoreAtom)
    const month = Stats.getMonthKey()
    const bucket = store.months[month] ?? Stats.createEmptyBucket()

    const clearCurrentMonth = useCallback(() => {
        const key = Stats.getStorageKey(apiInfo.hostname, apiInfo.port)
        const next = Stats.clearMonth(store, month)
        Stats.saveStore(key, next)
        setStore(next)
    }, [apiInfo.hostname, apiInfo.port, month, setStore, store])

    return {
        month,
        monthLabel: Stats.formatMonthLabel(month),
        topSourceIP: Stats.topByDownload(bucket.sourceIP),
        topDestinationIP: Stats.topByDownload(bucket.destinationIP),
        clearCurrentMonth,
    }
}
