import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    const AccountType = {
        attributeDataType: 'Integer',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'account_type',
        required: false,
    }


}
