import { defineNuxtModule, addPlugin, addImports, createResolver, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import { fileURLToPath } from 'url'

const logger = useLogger('nuxt:wideangle')

export interface ModuleOptions {
  siteId?: string
  domain?: string
  fingerprint?: boolean
  supressDnt?: boolean
  includeParams?: string[]
  excludePaths?: string[]
  ignoreHash?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'wideangle',
    configKey: 'wideangle',
    compatibility: {
      nuxt: '^3'
    }
  },
  defaults: {
    domain: "stats.wideangle.co",
    fingerprint: false,
    supressDnt: false,
    includeParams: [],
    excludePaths: [],
    ignoreHash: false
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    logger.info(`Module options: ${JSON.stringify(options)}`);
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.wideangle = defu(nuxt.options.runtimeConfig.public.wideangle, options);

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
