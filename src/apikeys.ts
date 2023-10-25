import * as gcp from "@pulumi/gcp";

import { project } from "./project";
import { iosBundleId } from "./variables";
import { mapsIOSApi } from "./apis";

export const iosAPIKey = new gcp.projects.ApiKey('ios-maps-apikey', {
  project: project.projectId,
  displayName: iosBundleId,
  restrictions: {
    iosKeyRestrictions: {
      allowedBundleIds: [iosBundleId]
    },
    apiTargets: [{
      service: mapsIOSApi.service,
    }],
  },
}, {
  parent: project,
  dependsOn: [project, mapsIOSApi]
});

iosAPIKey.keyString
  .apply(key => console.log(`Google Maps API key for "${iosBundleId}": ${key}`));