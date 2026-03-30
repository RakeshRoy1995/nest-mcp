import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { McpService } from '../mcp/mcp.service';

@Injectable()
export class AiAgentService {
  private openai: OpenAI;

  constructor(private mcpService: McpService) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async handlePrompt(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an assistant that calls MCP tools.' },
        { role: 'user', content: prompt },
      ],
    });

    // Use optional chaining and fallback to empty string
    const aiText = response.choices?.[0]?.message?.content ?? '';

    // ✅ Safe check
    if (aiText.includes('getProducts')) {
      const products = await this.mcpService.callTool('getProducts', {});
      return products;
    }

    return aiText;
  }
}