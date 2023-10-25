import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

import { iosBundleId, projectName } from "./variables";
import { providerOverride } from "./providers";
import { project } from "./project";
import { firebaseApi } from "./apis";
import { iosAPIKey } from "./apikeys";

const firebaseProject = new gcp.firebase.Project(`${projectName}-firebase`, {
  project: project.projectId,
}, {
  parent: firebaseApi,
  provider: providerOverride,
  dependsOn: [firebaseApi]
});
firebaseProject.project
  .apply(p => console.log(`Remove "Browser key (auto created by Firebase)" from https://console.cloud.google.com/apis/credentials?project=${p}`));

const appleApp = new gcp.firebase.AppleApp(iosBundleId, {
  project: project.projectId,
  displayName: iosBundleId,
  bundleId: iosBundleId,
  apiKeyId: iosAPIKey.uid,
}, {
  parent: firebaseProject,
  provider: providerOverride,
  dependsOn: [firebaseProject, iosAPIKey]
});
pulumi
  .all([project.projectId, appleApp.bundleId])
  .apply(([p, b]) => console.log(`Download "GoogleService-Info.plist": https://console.firebase.google.com/u/0/project/${p}/settings/general/ios:${b}`));