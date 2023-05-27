# Wide Angle Analytics Nuxt3 Module

[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

![Wide Angle Analytics Large Logo](https://github.com/inputobjects/wideangle-nuxt/assets/4896588/7efee4f1-d9e1-4b54-a5cd-257d13494f41)

# Wide Angle Analytics module for Nuxt

Enable **privacy-friendly** web analytics in your [Nuxt 3.x](https://nuxt.com/) application with our official plugin.

[Wide Angle Analytics](https://wideangle.co) is powerful, strictly-GDPR compliant Google Analytics alternative. 

# How to get started

You can enable Wide Angle Analytics in your Nuxt projects in just few steps. No complex configuration needed as our sane defaults give you reliable and privacy centric deployment out of the box. 

1. Go to [Wide Angle](https://wideangle.co) website, create an account. You can create free 14-day trail. No Credit Card is required. [Learn more.](https://wideangle.co/documentation/create-account) 
2. [Create new Site](https://wideangle.co/documentation/create-and-configure-site) and activate it.
3. Install `wideangle-vuejs` plugin in your Vue application.

```npm install wideangle-nuxt```

4. Enable and configure module.

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

The Wide Angle Analytics plugin must be initialized with configuration object as there are required settings without defaults.


option|description|required|default|example
------|-----------|--------|-------|-------
siteId| The Site ID from Wide Angle Site settings| :white_check_mark: | _none_ | 8D27G3B9ACA01F4241
domain| Domain hosting the script, can be found in Wide Angle Analytics Site settings | :x: | stats.wideangle.co | your.domain.com
fingerprint | Should script use browser fingerprinting; this might require collecting consent depeing on the applicable laws | :x: | false | true
supressDnt | Should script ingore Do Not Track browser setting. If not enabled, not events will be sent if user's browser has DNT enabled | :x: | false | true
includeParams | An array of query parameters that can be passed as part of tracking event. By default only `utm_*` and `ref` parameters are passed in the event | :x: | `[]` | `['sessionId', 'offset']`
excludePaths | An array of URL paths that should not trigger default events such as page view, page leave | :x: | `[]` | `['^/wp-admin/.*', ]`
ignoreHash | If enabled, change in the URL fragment will not trigger page view event | :x: | false | true

You will find more details about these settings in [Wide Angle Analytics documentation](https://wideangle.co/documentation/configure-site).


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
import { useWideAngle } from '#imports'

useWideAngle('purchase', {'basket_value': '45.00'})
```

You will find a fully functional example in this [repository](playground/app.vue).


## Tracking Pageviews

No action necessary. The tracker script automatically issues **Page View** and **Page Leave** events.

## Tracking Events 

Wide Angle supports three specialized events:
* clicks
* downloads 
* custom actions

Site has to have these event enable in Wide Angle Analytics configuration prior to usage. Otherwise the tracker script will not sent these events. Consult [official documentation](https://wideangle.co/documentation/tracking-custom-actions) regarding how to enable event handling. 

### Tracking Clicks 

Currently **Click Events** are [emitted automatically](https://wideangle.co/documentation/tracking-click-events) based on element data attributes. 

### Tracking Downloads

Depending on the configured mode, the **Download Event** will fire automatically when either:
* a file with recognized extension is being downloaded, or
* when a link is marked with `data-waa-name` attribute.

### Tracking Custom Actions

Custom action are the most flexible and can be triggered directly from Vue components. As such their usage is not limitted due to Shadow DOM.

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
You can find high-resolution Wide Angle Analytics logo and icon on our [media page](https://wideangle.co/media).


<!-- Badges -->

[license-src]: https://img.shields.io/npm/l/wideangle.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/wideangle

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
