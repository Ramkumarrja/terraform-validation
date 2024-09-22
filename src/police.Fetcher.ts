import { DefaultAzureCredential } from "@azure/identity";
import { PolicyClient } from "@azure/arm-policy";
const AWS = require('aws-sdk');
const iam = new AWS.IAM();


async function fetchAzurePolicies(subscriptionId: string) {
    const credential = new DefaultAzureCredential();
    const client = new PolicyClient(credential, subscriptionId);
    const policies = await client.policyDefinitions.list();
    return policies.map((policy: { name: any; properties: { displayName: any; policyType: any; }; }) => ({
        name: policy.name,
        displayName: policy.properties.displayName,
        policyType: policy.properties.policyType,
    }));
}



async function fetchPolicies() {
    try {
        const data = await iam.listPolicies({ Scope: 'Local' }).promise();
        return data.Policies.map((policy: { PolicyName: any; Arn: any; }) => ({
            name: policy.PolicyName,
            arn: policy.Arn,
        }));
    } catch (error) {
        console.error('Error fetching policies:', error);
    }
}
