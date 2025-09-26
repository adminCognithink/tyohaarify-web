import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportOptions {
  format: 'png' | 'jpeg' | 'pdf' | 'svg' | 'webp';
  quality?: number;
  width?: number;
  height?: number;
  scale?: number;
  background?: string;
}

export interface SocialMediaFormat {
  platform: 'instagram-post' | 'instagram-story' | 'facebook-post' | 'facebook-cover' | 'twitter-post' | 'linkedin-post';
  width: number;
  height: number;
  format: 'png' | 'jpeg';
}

export class ExportService {
  private static socialFormats: Record<SocialMediaFormat['platform'], Omit<SocialMediaFormat, 'platform'>> = {
    'instagram-post': { width: 1080, height: 1080, format: 'png' },
    'instagram-story': { width: 1080, height: 1920, format: 'png' },
    'facebook-post': { width: 1200, height: 630, format: 'png' },
    'facebook-cover': { width: 1200, height: 315, format: 'png' },
    'twitter-post': { width: 1200, height: 675, format: 'png' },
    'linkedin-post': { width: 1200, height: 627, format: 'png' }
  };

  static async exportAsImage(
    htmlContent: string,
    options: ExportOptions = { format: 'png' }
  ): Promise<Blob> {
    // Create a temporary iframe to render HTML
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = `${options.width || 800}px`;
    iframe.style.height = `${options.height || 600}px`;
    
    document.body.appendChild(iframe);
    
    try {
      const doc = iframe.contentDocument!;
      doc.open();
      doc.write(htmlContent);
      doc.close();

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(doc.body, {
        width: options.width || 800,
        height: options.height || 600,
        scale: options.scale || 2,
        backgroundColor: options.background || '#ffffff',
        useCORS: true,
        allowTaint: true
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, `image/${options.format}`, options.quality || 0.9);
      });
    } finally {
      document.body.removeChild(iframe);
    }
  }

  static async exportAsPDF(
    htmlContent: string,
    options: {
      format?: 'a4' | 'letter' | 'a5' | 'postcard';
      orientation?: 'portrait' | 'landscape';
      margin?: number;
      title?: string;
    } = {}
  ): Promise<Blob> {
    const { format = 'a4', orientation = 'portrait', margin = 10, title = 'Festival Greeting' } = options;

    // Get dimensions based on format
    const dimensions = this.getPDFDimensions(format, orientation);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format === 'postcard' ? [152, 102] : format
    });

    // Convert HTML to image first
    const imageBlob = await this.exportAsImage(htmlContent, {
      format: 'png',
      width: dimensions.width * 3, // Higher resolution
      height: dimensions.height * 3,
      scale: 3
    });

    // Convert blob to data URL
    const imageDataUrl = await this.blobToDataUrl(imageBlob);

    // Add image to PDF
    pdf.addImage(
      imageDataUrl,
      'PNG',
      margin,
      margin,
      dimensions.width - (margin * 2),
      dimensions.height - (margin * 2)
    );

    // Add metadata
    pdf.setProperties({
      title,
      creator: 'Tyohaarify',
      subject: 'Festival Greeting Card'
    });

    return pdf.output('blob');
  }

  static async exportForSocialMedia(
    htmlContent: string,
    platform: SocialMediaFormat['platform']
  ): Promise<Blob> {
    const format = this.socialFormats[platform];
    
    return this.exportAsImage(htmlContent, {
      format: format.format,
      width: format.width,
      height: format.height,
      scale: 1,
      quality: 0.9
    });
  }

  static async exportMultipleFormats(
    htmlContent: string,
    formats: Array<{
      name: string;
      options: ExportOptions | { type: 'pdf'; options?: any } | { type: 'social'; platform: SocialMediaFormat['platform'] };
    }>
  ): Promise<Array<{ name: string; blob: Blob; filename: string }>> {
    const results = await Promise.all(
      formats.map(async ({ name, options }) => {
        let blob: Blob;
        let extension: string;

        if ('type' in options && options.type === 'pdf') {
          blob = await this.exportAsPDF(htmlContent, options.options);
          extension = 'pdf';
        } else if ('type' in options && options.type === 'social') {
          blob = await this.exportForSocialMedia(htmlContent, options.platform);
          extension = 'png';
        } else {
          blob = await this.exportAsImage(htmlContent, options as ExportOptions);
          extension = (options as ExportOptions).format || 'png';
        }

        return {
          name,
          blob,
          filename: `${name.toLowerCase().replace(/\s+/g, '-')}.${extension}`
        };
      })
    );

    return results;
  }

  static async createPrintableVersion(
    htmlContent: string,
    size: 'a4' | 'a5' | 'postcard' | 'letter' = 'a4'
  ): Promise<{
    pdf: Blob;
    highResPng: Blob;
  }> {
    const dimensions = this.getPDFDimensions(size, 'portrait');
    
    const [pdf, highResPng] = await Promise.all([
      this.exportAsPDF(htmlContent, { format: size }),
      this.exportAsImage(htmlContent, {
        format: 'png',
        width: dimensions.width * 4, // Very high resolution for printing
        height: dimensions.height * 4,
        scale: 4,
        quality: 1.0
      })
    ]);

    return { pdf, highResPng };
  }

  private static getPDFDimensions(format: string, orientation: string) {
    const dimensions = {
      a4: { width: 210, height: 297 },
      a5: { width: 148, height: 210 },
      letter: { width: 216, height: 279 },
      postcard: { width: 152, height: 102 }
    };

    const dim = dimensions[format as keyof typeof dimensions] || dimensions.a4;
    
    return orientation === 'landscape' 
      ? { width: dim.height, height: dim.width }
      : dim;
  }

  private static async blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async createZipPackage(
    files: Array<{ name: string; blob: Blob }>
  ): Promise<Blob> {
    // For now, return the first file. In production, you'd use JSZip
    console.log('Creating zip with files:', files.map(f => f.name));
    return files[0]?.blob || new Blob();
  }
}