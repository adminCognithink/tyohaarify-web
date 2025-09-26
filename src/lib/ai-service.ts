import OpenAI from 'openai';

// Initialize OpenAI with graceful error handling
let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  console.warn('OpenAI initialization failed:', error);
}

export interface MessageSuggestion {
  message: string;
  tone: 'formal' | 'casual' | 'heartfelt' | 'playful' | 'traditional';
  relationship: 'family' | 'friends' | 'colleagues' | 'general';
}

export class AIService {
  static async generateMessageSuggestions(
    festivalName: string,
    relationship: string = 'general',
    tone: string = 'heartfelt'
  ): Promise<MessageSuggestion[]> {
    try {
      // Return fallback suggestions if OpenAI is not available
      if (!openai) {
        console.warn('OpenAI not available, using fallback suggestions');
        return this.getFallbackSuggestions(festivalName, relationship, tone);
      }

      const prompt = `Generate 5 different ${tone} greeting messages for ${festivalName} festival suitable for ${relationship}. Each message should be 1-2 sentences, culturally appropriate, and unique. Format as JSON array with fields: message, tone, relationship.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that creates culturally appropriate, heartfelt festival greetings. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from AI');

      return JSON.parse(content);
    } catch (error) {
      console.error('AI service error:', error);
      // Fallback suggestions
      return this.getFallbackSuggestions(festivalName, relationship, tone);
    }
  }

  static async generateTemplateDescription(htmlContent: string): Promise<string> {
    try {
      if (!openai) {
        return 'Custom designed template with unique styling';
      }

      const prompt = `Analyze this HTML template and generate a brief, attractive description for users to understand what this template offers. Focus on design style, best use cases, and visual appeal. Keep it under 50 words.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a UX copywriter specializing in design descriptions. Be concise and appealing."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      });

      return response.choices[0]?.message?.content || 'Beautiful custom template';
    } catch (error) {
      console.error('AI description error:', error);
      return 'Custom designed template with unique styling';
    }
  }

  static async analyzeImageForFestival(imageBase64: string): Promise<string[]> {
    try {
      if (!openai) {
        return ['general'];
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image and suggest which festivals it would be most suitable for. Return as JSON array of festival names."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 100
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return ['general'];

      return JSON.parse(content);
    } catch (error) {
      console.error('Image analysis error:', error);
      return ['general'];
    }
  }

  private static getFallbackSuggestions(
    festivalName: string,
    relationship: string,
    tone: string
  ): MessageSuggestion[] {
    const suggestions: MessageSuggestion[] = [
      {
        message: `Wishing you and your loved ones a very Happy ${festivalName}! May this festival bring joy, prosperity, and happiness to your life.`,
        tone: tone as any,
        relationship: relationship as any
      },
      {
        message: `May the lights of ${festivalName} illuminate your path to success and fill your home with joy and laughter.`,
        tone: tone as any,
        relationship: relationship as any
      },
      {
        message: `Sending warm wishes on ${festivalName}! May this special occasion bring you peace, happiness, and countless blessings.`,
        tone: tone as any,
        relationship: relationship as any
      },
      {
        message: `Happy ${festivalName}! May this festival strengthen the bonds of love and bring prosperity to your family.`,
        tone: tone as any,
        relationship: relationship as any
      },
      {
        message: `Celebrating ${festivalName} with heartfelt wishes for your health, happiness, and success in all your endeavors.`,
        tone: tone as any,
        relationship: relationship as any
      }
    ];

    return suggestions;
  }

  static async getPersonalizedTemplate(
    userPreferences: any,
    festivalId: string
  ): Promise<string> {
    try {
      if (!openai) {
        return 'classic';
      }

      const prompt = `Based on user preferences: ${JSON.stringify(userPreferences)} and festival: ${festivalId}, suggest the best template style and customizations. Return as JSON with templateId, colorScheme, and reasoning.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a design advisor that helps users pick the best templates based on their preferences."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 200
      });

      return response.choices[0]?.message?.content || 'classic';
    } catch (error) {
      console.error('Personalization error:', error);
      return 'classic';
    }
  }
}