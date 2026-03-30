import { Controller, Get, Post, Body } from '@nestjs/common';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  // 🔧 List tools
  @Get('tools')
  getTools() {
    return this.mcpService.getTools();
  }

  // ⚡ Call tool
  @Post('call')
  async callTool(@Body() body: { name: string; args: any }) {
    return this.mcpService.callTool(body.name, body.args);
  }
}