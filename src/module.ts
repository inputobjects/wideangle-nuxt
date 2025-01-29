import { defineNuxtModule, addPlugin, addImportsDir, createResolver, useLogger } from '@nuxt/kit'
import { defu } from 'defu'

const logger = useLogger('nuxt:wideangle')

export interface ModuleOptions {
  siteId?: string
  domain: string
  fingerprint: boolean
  suppressDnt: boolean
  includeParams: string[]
  excludePaths: string[]
  ignoreHash: boolean
  consentMarker: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'wideangle',
    configKey: 'wideangle',
    compatibility: {
      nuxt: '>=3',
    },
  },
  defaults: {
    domain: 'stats.wideangle.co',
    fingerprint: false,
    suppressDnt: false,
    includeParams: [],
    excludePaths: [],
    ignoreHash: false,
    consentMarker: undefined,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.wideangle = defu(
      nuxt.options.runtimeConfig.public.wideangle,
      options,
    )

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    logger.info('Adding Wide Angle Analytics (useWideAngle) import')
    addImportsDir(resolver.resolve('./runtime/composables'))

    logger.info('Adding Wide Angle Analytics runtime plugin')
    addPlugin(resolver.resolve('./runtime/plugin.client'))

  },
})
