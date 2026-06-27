import classnames from 'classnames'
import { useEffect, useId, useRef, useState } from 'react'

import { useTheme } from '@lib/hook'
import { type ThemePreference } from '@lib/theme'
import { useI18n } from '@stores'

import './theme-switcher.scss'

const options: Array<{ value: ThemePreference, label: string }> = [
    { value: 'auto', label: 'Auto' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
]

function ThemeIcon ({ theme }: { theme: ThemePreference }) {
    const clipId = useId()

    switch (theme) {
    case 'dark':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        )
    case 'light':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        )
    default:
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden>
                <circle cx="12" cy="12" r="11" />
                <clipPath id={clipId}>
                    <rect x="12" y="0" width="12" height="24" />
                </clipPath>
                <circle cx="12" cy="12" r="6" clipPath={`url(#${clipId})`} fill="currentColor" stroke="none" />
            </svg>
        )
    }
}

function CheckIcon () {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

export default function ThemeSwitcher () {
    const { preference, setPreference } = useTheme()
    const { translation } = useI18n()
    const { t } = translation('SideBar')
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) {
            return
        }
        function handlePointerDown (event: MouseEvent) {
            if (rootRef.current != null && !rootRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        function handleKeyDown (event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    return (
        <div className={classnames('sidebar-theme-switcher', { open })} ref={rootRef}>
            <button
                type="button"
                className="sidebar-theme-trigger"
                title={t('switchTheme')}
                aria-label={t('switchTheme')}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(value => !value)}>
                <ThemeIcon theme={preference} />
            </button>
            { open && (
                <div className="sidebar-theme-menu" role="menu">
                    {
                        options.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                className="sidebar-theme-menu-item"
                                role="menuitem"
                                onClick={() => {
                                    setPreference(value)
                                    setOpen(false)
                                }}>
                                <span className={classnames('sidebar-theme-check', { active: preference === value })}>
                                    <CheckIcon />
                                </span>
                                <span>{ label }</span>
                            </button>
                        ))
                    }
                </div>
            ) }
        </div>
    )
}
