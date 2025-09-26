import { NextRequest, NextResponse } from 'next/server';
import {
  classicElegantTemplate,
  modernMinimalistTemplate,
  festiveCollageTemplate,
  vintagePostcardTemplate,
  socialMediaTemplate,
  blackShadowTemplate,
  whiteShadowTemplate,
  darkGradientTemplate,
  lightGradientTemplate,
  glassMorphismTemplate,
  neonGlowTemplate,
  paperCutTemplate,
  watercolorTemplate,
  floating3DTemplate,
  holographicTemplate
} from '@/templates/cardTemplates';
import { getFestivalById } from '@/data/festivals';

const templates = {
  classic: classicElegantTemplate,
  modern: modernMinimalistTemplate,
  collage: festiveCollageTemplate,
  vintage: vintagePostcardTemplate,
  social: socialMediaTemplate,
  blackshadow: blackShadowTemplate,
  whiteshadow: whiteShadowTemplate,
  darkgradient: darkGradientTemplate,
  lightgradient: lightGradientTemplate,
  glassmorphism: glassMorphismTemplate,
  neonglow: neonGlowTemplate,
  papercut: paperCutTemplate,
  watercolor: watercolorTemplate,
  floating3d: floating3DTemplate,
  holographic: holographicTemplate
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { festivalId, templateId, imageIndex, message, senderName } = body;

    // Validate required fields
    if (!festivalId || !templateId || imageIndex === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: festivalId, templateId, imageIndex' },
        { status: 400 }
      );
    }

    // Get festival data
    const festival = getFestivalById(festivalId);
    if (!festival) {
      return NextResponse.json(
        { error: 'Festival not found' },
        { status: 404 }
      );
    }

    // Get template function
    const templateFunction = templates[templateId as keyof typeof templates];
    if (!templateFunction) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Validate image index
    if (imageIndex >= festival.images.length || imageIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid image index' },
        { status: 400 }
      );
    }

    // Generate HTML
    const imagePath = festival.images[imageIndex];
    const finalMessage = message || festival.defaultMessage;
    const finalSenderName = senderName || 'Anonymous';

    const html = templateFunction(
      festival.name,
      imagePath,
      finalMessage,
      finalSenderName
    );

    return NextResponse.json({
      html,
      festival: {
        name: festival.name,
        emoji: festival.emoji,
        description: festival.description
      },
      template: templateId,
      image: imagePath
    });

  } catch (error) {
    console.error('Error generating card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to generate greeting cards',
    availableTemplates: Object.keys(templates),
    example: {
      festivalId: 'diwali',
      templateId: 'classic',
      imageIndex: 0,
      message: 'Happy Diwali! Wishing you joy and prosperity.',
      senderName: 'Your Name'
    }
  });
}