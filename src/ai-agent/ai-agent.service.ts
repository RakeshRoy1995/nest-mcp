import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { McpService } from '../mcp/mcp.service';

@Injectable()
export class AiAgentService {
  private openai: OpenAI;

  constructor(private mcpService: McpService) {
    // Initialize OpenRouter client
    this.openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': '',       // optional
        'X-OpenRouter-Title': '', // optional
      },
    });
  }

  async handlePrompt(prompt: string) {
    // System prompt forces structured JSON output
    const systemPrompt = `
    You are an AI agent for MCP server tools. 
    When the user wants to use a tool, always respond in JSON format with two keys: 
    1. "tool" (exact name of the tool as in MCP)
    2. "args" (object with parameters)

    Available tools: ${this.mcpService.getTools().map(t => t.name).join(', ')}

    Example response:
    { "tool": "getProducts", "args": {} }
    `;

    const response = await this.openai.chat.completions.create({
      model: 'openrouter/free', // free OpenRouter model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });

    const aiText = response.choices?.[0]?.message?.content ?? '';

    // Try to parse structured JSON from AI response
    let parsed: { tool?: string; args?: Record<string, any> } | null = null;
    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      // If AI didn’t follow JSON format, return text
      return { text: aiText };
    }

    // If valid tool detected, call MCP tool
    if (parsed?.tool && this.mcpService.getTools().map(t => t.name).includes(parsed.tool)) {
      const result = await this.mcpService.callTool(parsed.tool, parsed.args || {});
      return { tool: parsed.tool, result };
    }

    // Fallback: return AI text if tool not recognized
    return { text: aiText };
  }
}