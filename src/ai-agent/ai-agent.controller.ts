import { Controller, Post, Body } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';

@Controller('ai')
export class AiAgentController {
  constructor(private aiAgent: AiAgentService) {}

  @Post('prompt')
  async prompt(@Body('text') text: string) {
    return this.aiAgent.handlePrompt(text);
  }
}