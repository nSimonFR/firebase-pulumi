import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as prandom from "@pulumi/random";

import { projectName, billingAccount } from './variables';

const projectIdSuffix = new prandom.RandomId("project-id-suffix", {
  byteLength: 3,
});

export const project = new gcp.organizations.Project(projectName, {
  name: projectName,
  projectId: pulumi.concat(projectName, "-", projectIdSuffix.hex),
  autoCreateNetwork: false,
  billingAccount,
  labels: { "firebase": "enabled" }
}, {
  dependsOn: [projectIdSuffix]
});