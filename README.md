# Wide Angle Analytics Nuxt3 Module

[![License][license-src]][license-href]
[![Latest][npm-version-src]][npm-version-href]
[![Downloads][npm-downloads-src]][npm-downloads-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Wide Angle][wideangle-src]][wideangle-href]

![Wide Angle Analytics Large Logo](https://github.com/inputobjects/wideangle-nuxt/assets/4896588/7efee4f1-d9e1-4b54-a5cd-257d13494f41)

# Wide Angle Analytics module for Nuxt

Enable **privacy-friendly** web analytics in your [Nuxt 3.x](https://nuxt.com/) application with our official plugin.

[Wide Angle Analytics](https://wideangle.co) is powerful, strictly-GDPR compliant Google Analytics alternative. 

# How to get started

You can enable Wide Angle Analytics in your Nuxt projects in just a few steps. No complex configuration needed, as our sane defaults provide you with a reliable and privacy-centric deployment out of the box. 

1. Go to the [Wide Angle](https://wideangle.co) website and create an account. You can enjoy a free 14-day trail. No Credit Card is required. [Learn more.](https://wideangle.co/documentation/create-account) 
2. [Create a new site](https://wideangle.co/documentation/create-and-configure-site) and activate it.
3. Install the `wideangle-vuejs` plugin in your Vue application.

```npm install wideangle-nuxt```

4. Enable and configure the module.

```javascript
export default defineNuxtConfig({
  modules: ['wideangle-nuxt'],

  runtimeConfig: {
    public: {
      wideangle: {
        siteId: "8D27G3B9ACA01F4241"
      }
    }
  }
})
```

# Configuring Wide Angle Analytics plugin

The Wide Angle Analytics plugin must be initialized with a configuration object as there are required settings without defaults.


option|description|required|default|example
------|-----------|--------|-------|-------
siteId| The Site ID from the Wide Angle Site settings| :white_check_mark: | _none_ | 8D27G3B9ACA01F4241
domain| Domain hosting the script, can be found in Wide Angle Analytics Site settings | :x: | stats.wideangle.co | your.domain.com
fingerprint | Should script use browser fingerprinting; this might require collecting consent depending on the applicable laws | :x: | false | true
supressDnt | Should script ingore Do Not Track browser setting. If not enabled, no events will be sent if user's browser has DNT enabled | :x: | false | true
includeParams | An array of query parameters that can be passed as part of tracking event. By default only `utm_*` and `ref` parameters are passed in the event | :x: | `[]` | `['sessionId', 'offset']`
excludePaths | An array of URL paths that should not trigger default events such as page view, page leave | :x: | `[]` | `['^/wp-admin/.*', ]`
ignoreHash | If enabled, a change in the URL fragment will not trigger page view event | :x: | false | true

You can find more details about these settings in the [Wide Angle Analytics documentation](https://wideangle.co/documentation/configure-site).


Example:

```javascript 
export default defineNuxtConfig({
  modules: ['wideangle-nuxt'],

  runtimeConfig: {
    public: {
      wideangle: {
        siteId: "8D27G3B9ACA01F4241",
        domain: "your.domain.com",
        fingerprint: false,
        supressDnt: true,
        includeParams: ['q', 'customerId'],
        excludePaths: ['^/admin.*'],
        ignoreHash: true
      }
    }  
  }
})
```


# Usage 

The Wide Angle Analytics provides an instance of `waa` which can be then injected to your component. 

```javascript
useWaaEvent('purchase', {'basket_element': 'dress'}, {'basket_item_price': 123.44});
```

You will find a fully functional example in this [repository](playground/app.vue).


## Tracking Pageviews

No action necessary. The tracker script automatically issues **Page View** and **Page Leave** events.

## Tracking Events 

Wide Angle supports three specialized events:
* clicks
* downloads 
* custom actions

Site has to have these events enabled in the Wide Angle Analytics configuration prior to usage. Otherwise the tracker script will not send these events. Consult the [official documentation](https://wideangle.co/documentation/tracking-custom-actions) regarding how to enable event handling. 

### Tracking Clicks 

Currently **Click Events** are [emitted automatically](https://wideangle.co/documentation/tracking-click-events) based on element data attributes. 

### Tracking Downloads

Depending on the configured mode, the **Download Event** will fire automatically when either:
* a file with recognized extension is being downloaded, or
* when a link is marked with `data-waa-name` attribute.

### Tracking Custom Actions

Custom actions are the most flexible and can be triggered directly from Vue components. As such, their usage is not limitted due to the Shadow DOM.

Example:

```vue
<template>
  <button @click="sendEvent()">Send Event</button>    
</template>

<script setup>
import { useWaaEvent } from '#imports'
const sendEvent = async () => {
  const params = {
    session: 'cjhw92nf9aq',
    cohort: 'c1233'
  }  
  useWaaEvent('interest', params);  
}
</script>
```

### Module Assets
You can find a high-resolution Wide Angle Analytics logo and icon on our [media page](https://wideangle.co/media).


<!-- Badges -->

[license-src]: https://img.shields.io/npm/l/wideangle-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://opensource.org/license/apache-2-0/

[npm-downloads-src]: https://img.shields.io/npm/dm/wideangle-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8DD
[npm-downloads-href]: https://npmjs.com/package/wideangle-nuxt

[npm-version-src]: https://img.shields.io/npm/v/wideangle-nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8DD
[npm-version-href]: https://npmjs.com/package/wideangle-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?&logo=nuxt.js
[nuxt-href]: https://nuxt.com

[wideangle-src]: https://img.shields.io/badge/logo-wideangle-blue?label=&logo=data:image/png;base64,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
[wideangle-href]: https://wideangle.co?utm_source=github&utm_content=wideangle-nuxt



