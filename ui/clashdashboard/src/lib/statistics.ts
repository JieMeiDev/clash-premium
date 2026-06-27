import type * as API from '@lib/request'

export const STATS_VERSION = 1 as const

export interface IpTraffic {
    download: number
    upload: number
}

export interface MonthBucket {
    sourceIP: Record<string, IpTraffic>
    destinationIP: Record<string, IpTraffic>
}

export interface StatisticsStore {
    version: typeof STATS_VERSION
    months: Record<string, MonthBucket>
}

export interface RankedIp {
    ip: string
    download: number
    upload: number
}

export function getMonthKey (date = new Date()) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    return `${y}-${m}`
}

export function getStorageKey (hostname: string, port: string | number) {
    return `clash-dashboard-statistics:${hostname}:${port}`
}

export function createEmptyBucket (): MonthBucket {
    return { sourceIP: {}, destinationIP: {} }
}

export function loadStore (key: string): StatisticsStore {
    try {
        const raw = localStorage.getItem(key)
        if (!raw) {
            return { version: STATS_VERSION, months: {} }
        }
        const parsed = JSON.parse(raw) as StatisticsStore
        if (parsed.version !== STATS_VERSION) {
            return { version: STATS_VERSION, months: {} }
        }
        return parsed
    } catch {
        return { version: STATS_VERSION, months: {} }
    }
}

export function saveStore (key: string, store: StatisticsStore) {
    localStorage.setItem(key, JSON.stringify(store))
}

export function getCurrentMonthBucket (store: StatisticsStore, month = getMonthKey()) {
    if (!store.months[month]) {
        store.months[month] = createEmptyBucket()
    }
    return store.months[month]
}

export function addTraffic (
    bucket: MonthBucket,
    sourceIP: string,
    destKey: string,
    upload: number,
    download: number,
) {
    if (upload > 0) {
        if (!bucket.sourceIP[sourceIP]) {
            bucket.sourceIP[sourceIP] = { upload: 0, download: 0 }
        }
        bucket.sourceIP[sourceIP].upload += upload
    }
    if (download > 0) {
        if (!bucket.sourceIP[sourceIP]) {
            bucket.sourceIP[sourceIP] = { upload: 0, download: 0 }
        }
        bucket.sourceIP[sourceIP].download += download

        if (!bucket.destinationIP[destKey]) {
            bucket.destinationIP[destKey] = { upload: 0, download: 0 }
        }
        bucket.destinationIP[destKey].download += download
    }
    if (upload > 0) {
        if (!bucket.destinationIP[destKey]) {
            bucket.destinationIP[destKey] = { upload: 0, download: 0 }
        }
        bucket.destinationIP[destKey].upload += upload
    }
}

export function topByDownload (records: Record<string, IpTraffic>, limit = 10): RankedIp[] {
    return Object.entries(records)
        .map(([ip, traffic]) => ({ ip, download: traffic.download, upload: traffic.upload }))
        .sort((a, b) => b.download - a.download)
        .slice(0, limit)
}

export function clearMonth (store: StatisticsStore, month = getMonthKey()): StatisticsStore {
    const months = { ...store.months }
    delete months[month]
    return { ...store, months }
}

export function formatMonthLabel (monthKey: string) {
    const [y, m] = monthKey.split('-')
    const date = new Date(Number(y), Number(m) - 1, 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export function getDestinationKey (metadata: API.Connections['metadata']) {
    if (metadata.destinationIP) {
        return `${metadata.destinationIP}:${metadata.destinationPort}`
    }
    return metadata.host || '-'
}
