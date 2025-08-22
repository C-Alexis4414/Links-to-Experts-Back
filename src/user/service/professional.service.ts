import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { ProfessionalType } from '../type/professional.type';

@Injectable()
export class ProfessionalService {
    constructor(private readonly prisma: PrismaService) {}

    async getUrlLinkedinById(id: number): Promise<ProfessionalType> {
        return await this.prisma.professional.findUnique({ where: { userId: id } });
    }
}
