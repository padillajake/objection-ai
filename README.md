# Objection.ai - AI-Powered Legal Case Study Assistant

Objection.ai is a web application that helps law students analyze case studies by generating compelling arguments for both plaintiff and defense perspectives. The application uses advanced AI to analyze cases and provide insights based on constitutional principles, legal precedents, and BARBRI exam materials.

## Features

- Case study analysis with AI-powered insights
- Balanced arguments for both plaintiff and defense perspectives
- Modern, user-friendly interface
- Real-time analysis using GPT-4

## Prerequisites

- Node.js 18.x or later
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/objection-ai.git
cd objection-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Navigate to the "Analyze Case" page
2. Paste your case study text into the input field
3. Click "Analyze Case" to generate arguments
4. Review the generated plaintiff and defense arguments

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI GPT-4
- Heroicons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 