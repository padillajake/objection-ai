import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CaseAnalysis, AnalysisResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specialized in analyzing case studies and providing balanced arguments for both plaintiff and defense perspectives. Use your knowledge of constitutional law, legal precedents, and BARBRI exam materials to form compelling arguments."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{"plaintiff":[],"defense":[]}') as CaseAnalysis;

    return NextResponse.json<CaseAnalysis>(response);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json<AnalysisResponse>(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 