import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { McpService } from '../mcp/mcp.service';

@Injectable()
export class AiAgentService {
  private openai: OpenAI;

  constructor(private mcpService: McpService) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  // Handle natural language prompt
  async handlePrompt(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI agent for MCP server tools. Analyze user intent and decide which tool to call.' },
        { role: 'user', content: prompt },
      ],
    });

    const aiText = response.choices?.[0]?.message?.content ?? '';

    // Detect tool name from AI response dynamically
    const availableTools = this.mcpService.getTools().map(t => t.name);

    for (const toolName of availableTools) {
      if (aiText.toLowerCase().includes(toolName.toLowerCase())) {
        // Call the MCP tool with optional args
        // Here, we just pass empty args, can enhance later
        const result = await this.mcpService.callTool(toolName, {});
        return { tool: toolName, result };
      }
    }

    // If no tool detected, just return AI text
    return { text: aiText };
  }
}