import * as gcp from "@pulumi/gcp";

import { gcpRegion, gcpCredentials } from './variables';

export const providerOverride = new gcp.Provider("billing-override-provider", {
  region: gcpRegion,
  credentials: gcpCredentials,
  userProjectOverride: true,
});