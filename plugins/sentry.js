import Vue from 'vue'

import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { ExtraErrorData } from '@sentry/integrations'

export default ({ app }, inject) => {
  Sentry.init({
    Vue,
    normalizeDepth: 11,
    environment: 'development',
    tracesSampleRate: 1.0,
    dsn:
      'https://77d64bf85f644caeb936808349280e1a@o1123840.ingest.sentry.io/6162034',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(app.router),
        tracingOrigins: ['localhost', /^\//],
      }),
      new ExtraErrorData({ depth: 10 }),
    ],
  })
  inject('sentry', Sentry)
}
