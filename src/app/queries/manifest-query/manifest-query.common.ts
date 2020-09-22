export class ManifestQueryCommon {
public static manifestFormErrors = {
'scacCode': '',
'billOfLadingNumber': '',
'bolIndicator': '',
'limitOutputOption': '',
'entryDataIndicator': '',
};

public static manifestFormValidationMessages = {
'scacCode': {
'required': 'scacCode is required.',
'minLength': 'scacCode is maxLength 4.',
'maxLength': 'scacCode is required 4',
},
'billOfLadingNumber': {
'required': 'billOfLading is required.',
'maxLength': 'billOfLading maxLength 12.',
},
'bolIndicator': {
'required': 'bolIndicator is required.',
},
'limitOutputOption': {
'required': 'limitOutputOption is required.',
},
'entryDataIndicator': {
'required': 'entryDataIndicator is required.',
},
};
}


