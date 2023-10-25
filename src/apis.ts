import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

import { project } from './project';

// Just a simple resource to group APIs & to display as parent
const apisParent = new pulumi.ComponentResource("gcp:projects:apis", "apis", undefined, {
  parent: project
});

const createAPI = (api: string) => new gcp.projects.Service(
  api,
  {
    service: api,
    project: project.projectId,
    disableDependentServices: true,
  },
  {
    parent: apisParent,
    dependsOn: [project]
  }
);

export const cloudBillingApi = createAPI("cloudbilling.googleapis.com");
export const cloudResourceManagerApi = createAPI("cloudresourcemanager.googleapis.com");
export const serviceUsageApi = createAPI("serviceusage.googleapis.com");
export const mapsIOSApi = createAPI("maps-ios-backend.googleapis.com");
export const firebaseApi = createAPI("firebase.googleapis.com");
export const identityToolkitApi = createAPI("identitytoolkit.googleapis.com");
