import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LikedService } from '../service/liked.service';

@Controller('likes')
export class LikedController {
    constructor(
        private readonly likedService: LikedService,
    ) { }

}