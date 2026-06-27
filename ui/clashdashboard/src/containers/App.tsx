import classnames from 'classnames'
import { Route, Navigate, Routes, useLocation, Outlet } from 'react-router-dom'

import About from '@containers/About'
import Overview from '@containers/Overview'
import Connections from '@containers/Connections'
import ExternalControllerModal from '@containers/ExternalControllerDrawer'
import Logs from '@containers/Logs'
import Proxies from '@containers/Proxies'
import Rules from '@containers/Rules'
import Settings from '@containers/Settings'
import Statistics from '@containers/Statistics'
import SideBar from '@containers/Sidebar'
import { isClashX } from '@lib/jsBridge'
import { useLogsStreamReader, useStatisticsFeed } from '@stores'

import '../styles/common.scss'
import '../styles/dark-mode.scss'
import '../styles/apple-theme.scss'
import '../styles/iconfont.scss'

export default function App () {
    useLogsStreamReader()
    useStatisticsFeed()

    const location = useLocation()

    const routes = [
        { path: '/overview', name: 'Overview', element: <Overview /> },
        { path: '/proxies', name: 'Proxies', element: <Proxies /> },
        { path: '/logs', name: 'Logs', element: <Logs /> },
        { path: '/rules', name: 'Rules', element: <Rules />, noMobile: true },
        { path: '/connections', name: 'Connections', element: <Connections /> },
        { path: '/statistics', name: 'Statistics', element: <Statistics /> },
        { path: '/settings', name: 'Settings', element: <Settings /> },
        { path: '/about', name: 'About', element: <About />, footerOnly: true },
    ]

    const layout = (
        <div className={classnames('app', { 'not-clashx': !isClashX() })}>
            <SideBar routes={routes} />
            <div className="page-container">
                <Outlet />
            </div>
            <ExternalControllerModal />
        </div>
    )

    return (
        <Routes>
            <Route path="/" element={layout}>
                <Route path="/" element={<Navigate to={{ pathname: '/overview', search: location.search }} replace />} />
                {
                    routes.map(
                        route => <Route path={route.path} key={route.path} element={route.element} />,
                    )
                }
            </Route>
        </Routes>
    )
}
