import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
// import { UserIsYoutuber } from '../dto/userData.dto';
import { YoutuberType } from '../type/youtuber.type';

@Injectable()
export class YoutuberService {
    constructor(private readonly prisma: PrismaService) {}

    async getTagChannelById(id: number): Promise<YoutuberType> {
        return await this.prisma.youtuber.findUnique({ where: { userId: id } });
    }
}
