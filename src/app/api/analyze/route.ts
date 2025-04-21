import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { caseText } = await request.json();

    if (!caseText) {
      return NextResponse.json(
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
      model: "gpt-4-turbo-preview",
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

    const response = JSON.parse(completion.choices[0].message.content || '{"plaintiff":[],"defense":[]}');

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 