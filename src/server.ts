import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  getAllowedHosts,
  getContext,
  getTrustProxyHeaders,
} from '@netlify/angular-runtime/app-engine.js';

const angularAppEngine = new AngularAppEngine({
  allowedHosts: getAllowedHosts(),
  trustProxyHeaders: getTrustProxyHeaders(),
});

/** Netlify SSR handler. The Angular runtime invokes this for HTML routes. */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const response = await angularAppEngine.handle(request, getContext());
  return response ?? new Response('Not found', { status: 404 });
}

/** Used by both the Angular CLI development server and Netlify runtime. */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
