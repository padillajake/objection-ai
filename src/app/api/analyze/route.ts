import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CaseAnalysis, AnalysisResponse } from '@/types';

// Validate OpenAI API key at startup
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Provide empty string as fallback
});

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json<AnalysisResponse>(
        { error: 'OpenAI API key is not configured. Please check server configuration.' },
        { status: 500 }
      );
    }

    const { caseText } = await request.json();

    if (!caseText) {
      return NextResponse.json<AnalysisResponse>(
        { error: 'Case text is required' },
        { status: 400 }
      );
    }

    const prompt = `Analyze the following legal case study and provide two sets of arguments:
1. Arguments for the plaintiff's perspective, citing relevant constitutional principles and legal precedents
2. Arguments for the defense, using appropriate legal frameworks and principles

Case study:
${caseText}

Please format your response as a JSON object with two arrays: 'plaintiff' and 'defense', where each array contains string arguments.`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal expert specialized in analyzing case studies and providing balanced arguments for both plaintiff and defense perspectives. Use your knowledge of constitutional law, legal precedents, and BARBRI exam materials to form compelling arguments. Always respond in JSON format with 'plaintiff' and 'defense' arrays."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      if (!completion.choices[0]?.message?.content) {
        console.error('No content in OpenAI response');
        return NextResponse.json<AnalysisResponse>(
          { error: 'Failed to generate analysis' },
          { status: 500 }
        );
      }

      try {
        const response = JSON.parse(completion.choices[0].message.content) as CaseAnalysis;
        
        // Validate the response has the required arrays
        if (!Array.isArray(response.plaintiff) || !Array.isArray(response.defense)) {
          console.error('Invalid response format:', response);
          return NextResponse.json<AnalysisResponse>(
            { error: 'Invalid response format from server' },
            { status: 500 }
          );
        }

        return NextResponse.json<CaseAnalysis>(response);
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        return NextResponse.json<AnalysisResponse>(
          { error: 'Error processing the analysis' },
          { status: 500 }
        );
      }
    } catch (openaiError: any) {
      console.error('OpenAI API Error:', openaiError?.message || openaiError);
      if (openaiError?.message?.includes('429')) {
        return NextResponse.json<AnalysisResponse>(
          { error: 'API usage limit reached. Please check your OpenAI account billing settings.' },
          { status: 500 }
        );
      }
      return NextResponse.json<AnalysisResponse>(
        { error: 'Error communicating with AI service: ' + (openaiError?.message || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json<AnalysisResponse>(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 