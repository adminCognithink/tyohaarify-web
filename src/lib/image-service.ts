import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  fit?: 'cover' | 'contain' | 'fill';
}

export class ImageService {
  private static uploadDir = process.env.UPLOAD_FOLDER || './public/uploads';

  static async processAndSaveImage(
    buffer: Buffer,
    options: ImageProcessingOptions = {}
  ): Promise<{ url: string; filename: string }> {
    const {
      width = 800,
      height = 600,
      quality = 85,
      format = 'jpeg',
      fit = 'cover'
    } = options;

    const filename = `${uuidv4()}.${format}`;
    const filepath = path.join(this.uploadDir, filename);

    // Ensure upload directory exists
    await fs.mkdir(this.uploadDir, { recursive: true });

    // Process image
    await sharp(buffer)
      .resize(width, height, { fit })
      .jpeg({ quality: format === 'jpeg' ? quality : undefined })
      .png({ quality: format === 'png' ? quality : undefined })
      .webp({ quality: format === 'webp' ? quality : undefined })
      .toFile(filepath);

    return {
      url: `/uploads/${filename}`,
      filename
    };
  }

  static async createThumbnail(
    buffer: Buffer,
    size: number = 150
  ): Promise<{ url: string; filename: string }> {
    return this.processAndSaveImage(buffer, {
      width: size,
      height: size,
      quality: 80,
      format: 'jpeg'
    });
  }

  static async optimizeForWeb(buffer: Buffer): Promise<{
    original: { url: string; filename: string };
    optimized: { url: string; filename: string };
    thumbnail: { url: string; filename: string };
  }> {
    const [original, optimized, thumbnail] = await Promise.all([
      this.processAndSaveImage(buffer, { quality: 95 }),
      this.processAndSaveImage(buffer, { width: 1200, height: 900, quality: 75 }),
      this.createThumbnail(buffer)
    ]);

    return { original, optimized, thumbnail };
  }

  static async deleteImage(filename: string): Promise<void> {
    try {
      const filepath = path.join(this.uploadDir, filename);
      await fs.unlink(filepath);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  static async getImageMetadata(buffer: Buffer) {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation
    };
  }

  static validateImageBuffer(buffer: Buffer): boolean {
    // Basic validation - check if it's a valid image
    const imageHeaders = [
      [0xFF, 0xD8, 0xFF], // JPEG
      [0x89, 0x50, 0x4E, 0x47], // PNG
      [0x47, 0x49, 0x46], // GIF
      [0x52, 0x49, 0x46, 0x46], // WEBP (RIFF)
    ];

    return imageHeaders.some(header => 
      header.every((byte, index) => buffer[index] === byte)
    );
  }

  static async applyFilters(
    buffer: Buffer,
    filters: {
      brightness?: number; // -1 to 1
      contrast?: number; // -1 to 1
      saturation?: number; // -1 to 1
      blur?: number; // 0.3 to 1000
      sharpen?: boolean;
      grayscale?: boolean;
      sepia?: boolean;
    }
  ): Promise<Buffer> {
    let pipeline = sharp(buffer);

    if (filters.brightness !== undefined) {
      pipeline = pipeline.modulate({ brightness: 1 + filters.brightness });
    }

    if (filters.contrast !== undefined) {
      pipeline = pipeline.linear(1 + filters.contrast, 0);
    }

    if (filters.saturation !== undefined) {
      pipeline = pipeline.modulate({ saturation: 1 + filters.saturation });
    }

    if (filters.blur !== undefined) {
      pipeline = pipeline.blur(filters.blur);
    }

    if (filters.sharpen) {
      pipeline = pipeline.sharpen();
    }

    if (filters.grayscale) {
      pipeline = pipeline.grayscale();
    }

    if (filters.sepia) {
      pipeline = pipeline.tint({ r: 255, g: 240, b: 196 });
    }

    return pipeline.toBuffer();
  }

  static async generateImageVariants(
    buffer: Buffer,
    festival: string
  ): Promise<{
    square: { url: string; filename: string };
    story: { url: string; filename: string };
    banner: { url: string; filename: string };
    postcard: { url: string; filename: string };
  }> {
    const [square, story, banner, postcard] = await Promise.all([
      // Instagram square post
      this.processAndSaveImage(buffer, { 
        width: 1080, 
        height: 1080, 
        quality: 85,
        fit: 'cover'
      }),
      // Instagram/Facebook story
      this.processAndSaveImage(buffer, { 
        width: 1080, 
        height: 1920, 
        quality: 85,
        fit: 'cover'
      }),
      // Facebook banner/cover
      this.processAndSaveImage(buffer, { 
        width: 1200, 
        height: 630, 
        quality: 85,
        fit: 'cover'
      }),
      // Printable postcard
      this.processAndSaveImage(buffer, { 
        width: 1800, 
        height: 1200, 
        quality: 95,
        fit: 'cover'
      })
    ]);

    return { square, story, banner, postcard };
  }
}