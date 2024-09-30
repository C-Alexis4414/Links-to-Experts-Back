import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';

@ApiTags('security')
@Controller('security')
export class SecurityController {
    @ApiHeader({
        name: 'X-CSRF-Token',
        description: 'CSRF token',
    })
    @Get('csrf-token')
    @ApiOperation({ summary: 'Get CSRF token' })
    getCsrfToken(@Req() req: Request) {
        return { csrfToken: req.csrfToken() };
    }
}
