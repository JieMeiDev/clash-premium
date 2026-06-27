import type * as API from '@lib/request'

import { type Rule } from './Rule'

/**
 * clash config
 * @see https://github.com/Dreamacro/clash#config
 */
export interface Config {

    general?: {

        /**
         * http proxy port
         */
        port?: number

        /**
         * socks proxy port
         */
        socksPort?: number

        /**
         * redir proxy port
         */
        redirPort?: number

        /**
         * clash proxy mode
         */
        mode?: string

        /**
         * clash tty log level
         */
        logLevel?: string
    }

    rules?: Rule[]

}

export interface Data {
    version?: string

    general: {

        /**
         * http proxy port
         */
        port?: number

        /**
         * socks proxy port
         */
        socksPort?: number

        /**
         * mixed porxy port
         */
        mixedPort?: number

        /**
         * redir proxy port
         */
        redirPort?: number

        /**
         * tproxy port
         */
        tproxyPort?: number

        /**
         * clash proxy mode
         */
        mode: 'script' | 'rule' | 'direct' | 'global'

        /**
         * clash tty log level
         */
        logLevel?: string
    }

    proxy?: API.Proxy[]

    proxyGroup?: API.Group[]

    proxyProviders?: API.Provider[]

    rules?: API.Rule[]

    proxyMap?: Map<string, API.Proxy>
}
