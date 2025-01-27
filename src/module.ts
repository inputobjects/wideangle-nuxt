import { defineNuxtModule, addPlugin, addImports, createResolver, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import { fileURLToPath } from 'url'

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
      nuxt: '>=3'
    }
  },
  defaults: {
    domain: "stats.wideangle.co",
    fingerprint: false,
    suppressDnt: false,
    includeParams: [],
    excludePaths: [],
    ignoreHash: false,
    consentMarker: null
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.runtimeConfig.public.wideangle = defu(
      nuxt.options.runtimeConfig.public.wideangle,
      options,
    )

    nuxt.options.build.transpile.push(runtimeDir);
    const resolver = createResolver(import.meta.url);

    logger.info('Adding Wide Angle Analytics runtime plugin');

    addImports({
      name: "useWaaEvent",
      as: "useWaaEvent",
      from: resolver.resolve('./runtime/composables/useWaaEvent')
    });

    addPlugin({
      src: resolver.resolve('./runtime/plugin.client')
    });

  }
})
