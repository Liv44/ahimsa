import {
  ReactIntegration,
  createReactRouterV6DataOptions,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { matchRoutes } from 'react-router-dom';
import { version } from '../../package.json';

initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/e158f1f6d84da4c3e79238bb09752a58',
  app: {
    name: 'Ahimsa',
    version,
    environment: 'production',
  },

  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),

    // React integration for React applications.
    new ReactIntegration({
      router: createReactRouterV6DataOptions({
        matchRoutes,
      }),
    }),
  ],
});
