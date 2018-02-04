import { JsonController, UseBefore, Get } from 'routing-controllers';
import { TokenValidate } from '../Middleware/TokenValidate';
import { Cors } from '../Middleware/Cors';
const constants = require('../../Shared/Constants');
const enums = require('../../Shared/Enums');

@JsonController('/AppSettings')
@UseBefore(TokenValidate)
@UseBefore(Cors)
export class AppSettingsController {
    @Get()
    public Get(): any {
        const appSettings: any = {};
        appSettings.Constants = constants;
        appSettings.Enums = enums;

        return appSettings;
    }
}
