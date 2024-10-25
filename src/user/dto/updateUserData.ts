import {  PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './userData.dto';

export class UpdateUserDataDto extends PartialType(CreateUserDto) {

}