import { Module } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AiAgentController } from './ai-agent.controller';
import { McpModule } from '../mcp/mcp.module';

@Module({
  imports: [McpModule],
  providers: [AiAgentService],
  controllers: [AiAgentController],
})
export class AiAgentModule {}