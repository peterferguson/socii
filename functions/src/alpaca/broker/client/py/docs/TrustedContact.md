# TrustedContact

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**given_name** | **str** |  | 
**family_name** | **str** |  | 
**email_address** | **str** | at least one of &#x60;email_address&#x60;, &#x60;phone_number&#x60; or &#x60;street_address&#x60; is required  | [optional] 
**phone_number** | **str** | at least one of &#x60;email_address&#x60;, &#x60;phone_number&#x60; or &#x60;street_address&#x60; is required  | [optional] 
**street_address** | **list[str]** | at least one of &#x60;email_address&#x60;, &#x60;phone_number&#x60; or &#x60;street_address&#x60; is required  | [optional] 
**city** | **str** | required if &#x60;street_address&#x60; is set  | [optional] 
**state** | **str** | required if &#x60;street_address&#x60; is set  | [optional] 
**postal_code** | **str** | required if &#x60;street_address&#x60; is set  | [optional] 
**country** | **str** | [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html). required if &#x60;street_address&#x60; is set  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

