import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class LikedService {
    private readonly prisma = new PrismaService();
    
}