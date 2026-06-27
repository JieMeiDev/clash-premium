import { useMemo } from 'react'

import { formatTraffic } from '@lib/helper'

interface TrafficChartProps {
    up: number[]
    down: number[]
    upLabel: string
    downLabel: string
}

const WIDTH = 1000
const HEIGHT = 280
const PADDING = { top: 16, right: 16, bottom: 28, left: 56 }

function scaleY (value: number, max: number, innerHeight: number) {
    if (max <= 0) {
        return innerHeight
    }
    return innerHeight - (value / max) * innerHeight
}

export function TrafficChart (props: TrafficChartProps) {
    const { up, down, upLabel, downLabel } = props

    const innerWidth = WIDTH - PADDING.left - PADDING.right
    const innerHeight = HEIGHT - PADDING.top - PADDING.bottom

    const { upPath, downAreaPath, gridLines } = useMemo(() => {
        const length = Math.max(up.length, down.length, 2)
        const maxValue = Math.max(...up, ...down, 1)
        const niceMax = maxValue * 1.1

        const xStep = innerWidth / (length - 1)
        const pointsUp = up.map((v, i) => ({
            x: PADDING.left + i * xStep,
            y: PADDING.top + scaleY(v, niceMax, innerHeight),
        }))
        const pointsDown = down.map((v, i) => ({
            x: PADDING.left + i * xStep,
            y: PADDING.top + scaleY(v, niceMax, innerHeight),
        }))

        const linePath = (pts: typeof pointsUp) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

        const downArea = pointsDown.length > 0
            ? `${linePath(pointsDown)} L ${pointsDown[pointsDown.length - 1].x} ${PADDING.top + innerHeight} L ${pointsDown[0].x} ${PADDING.top + innerHeight} Z`
            : ''

        const grids = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const y = PADDING.top + innerHeight * (1 - ratio)
            const value = niceMax * ratio
            return { y, label: `${formatTraffic(value)}/s` }
        })

        return {
            upPath: pointsUp.length > 0 ? linePath(pointsUp) : '',
            downAreaPath: downArea,
            gridLines: grids,
        }
    }, [down, innerHeight, innerWidth, up])

    return (
        <div className="overview-chart">
            <div className="overview-chart-legend">
                <span className="overview-chart-legend-up">{upLabel}</span>
                <span className="overview-chart-legend-down">{downLabel}</span>
            </div>
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="overview-chart-svg" preserveAspectRatio="none">
                { gridLines.map(({ y, label }) => (
                    <g key={label}>
                        <line
                            x1={PADDING.left}
                            x2={WIDTH - PADDING.right}
                            y1={y}
                            y2={y}
                            className="overview-chart-grid"
                        />
                        <text x={PADDING.left - 8} y={y + 4} className="overview-chart-axis" textAnchor="end">
                            { label }
                        </text>
                    </g>
                )) }
                { downAreaPath && <path d={downAreaPath} className="overview-chart-down-area" /> }
                { upPath && <path d={upPath} className="overview-chart-up-line" fill="none" /> }
            </svg>
        </div>
    )
}
