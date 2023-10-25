import * as gcp from "@pulumi/gcp";

import { project } from "./project";
import { identityToolkitApi } from "./apis";
import { providerOverride } from "./providers";

new gcp.identityplatform.Config("identity", {
  project: project.projectId,
  autodeleteAnonymousUsers: true,
  signIn: {
    allowDuplicateEmails: true,
    anonymous: {
      enabled: true,
    },
    email: {
      enabled: true,
      passwordRequired: false,
    },
    phoneNumber: {
      enabled: true,
      testPhoneNumbers: {
        "+11231231234": "000000",
      },
    },
  },
}, {
  provider: providerOverride,
  parent: identityToolkitApi,
  dependsOn: [identityToolkitApi]
});