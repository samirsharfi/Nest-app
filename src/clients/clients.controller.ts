import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @UseGuards(AuthGuard) // Secure the endpoint with JWT authentication
  async getClients() {
    return await this.clientsService.getClientsWithUsers();
  }
}
