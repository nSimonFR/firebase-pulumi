import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
export const projectName = config.require("project");
export const billingAccount = config.require("billing-account");
export const iosBundleId = config.require("ios-bundle-id");

const gcpConfig = new pulumi.Config("gcp");
export const gcpRegion = gcpConfig.require("region");
export const gcpCredentials = gcpConfig.require("credentials");
