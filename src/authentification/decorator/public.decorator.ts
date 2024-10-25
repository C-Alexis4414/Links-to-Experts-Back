import { SetMetadata } from '@nestjs/common';
// create @Public for whitelisting a route
export const Public = () => SetMetadata('isPublic', true);