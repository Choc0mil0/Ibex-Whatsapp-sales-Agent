import { PrismaService } from '../prisma.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBusiness(@Body() body: { name: string; whatsappNumber: string }, @Req() req: any) {
    const userId = req.user.userId; // Retrieved from JWT
    const business = await this.prisma.business.create({
      data: {
        name: body.name,
        whatsappNumber: body.whatsappNumber,
        ownerId: userId,
      },
    });
    return { message: 'Business created successfully', business };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBusinesses(@Req() req: any) {
    const userId = req.user.userId; // Retrieved from JWT
    const businesses = await this.prisma.business.findMany({ where: { ownerId: userId } });
    return businesses;
  }
}