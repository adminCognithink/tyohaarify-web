# 🎨 Tyohaarify - Festival Greeting Card Generator# Tyohaarify - Festival Greeting Maker



A beautiful, modern Next.js application for creating personalized festival greeting cards with AI-powered suggestions, advanced export options, and professional templates.A modern Next.js application for creating beautiful festival greeting cards and celebrations.



## ✨ Features## Features



### 🎊 Core Features- 🎉 Festival-specific templates for various celebrations

- **9 Festivals Supported**: Diwali, Christmas, Holi, Eid, Easter, Ganesh Chaturthi, Dussehra, New Year, Chinese New Year- ✨ Custom design capabilities

- **5 Professional Templates**: Classic Elegant, Modern Minimalist, Festive Collage, Vintage Postcard, Social Media Ready- 🪔 Beautiful, responsive UI with Tailwind CSS

- **54+ High-Quality Images**: 6 curated images per festival for stunning backgrounds- 🎨 Personalized greetings and messages

- **Real-time Preview**: Live preview of your greeting cards as you customize- 📱 Mobile-friendly design

- **Multiple Export Formats**: HTML, PNG, JPEG, PDF, WebP, and social media optimized sizes

## Getting Started

### 🤖 AI-Powered Features

- **Smart Message Suggestions**: AI-generated personalized messages based on tone and relationship### Prerequisites

- **Content Personalization**: Tailored suggestions for different recipients

- **Image Analysis**: AI can analyze uploaded images to suggest appropriate festivals- Node.js 18.17 or later

- npm, yarn, pnpm, or bun

### 📱 Enhanced User Experience

- **Drag-and-Drop Image Upload**: Upload custom images with preview### Installation

- **Responsive Design**: Perfect on desktop, tablet, and mobile devices

- **Animated Interactions**: Smooth animations powered by Framer Motion1. Clone the repository or navigate to the project directory

- **Preview Modes**: Desktop, tablet, and mobile preview options2. Install dependencies:



### 🔧 Advanced Export & Sharing```bash

- **Multi-Format Export**: Export as PNG, JPEG, PDF, WebP with various sizesnpm install

- **Social Media Ready**: Pre-configured sizes for Instagram, Facebook, Twitter# or

- **Print Optimization**: High-resolution formats perfect for printingyarn install

- **Email Integration**: One-click email sharing with formatted content# or

- **Social Media Sharing**: Direct sharing to WhatsApp, Facebook, Twitter, Telegrampnpm install

# or

## 🚀 Tech Stackbun install

```

### Frontend

- **Next.js 15.5.4** - React framework with App Router### Development

- **TypeScript** - Type safety and better development experience

- **Tailwind CSS** - Utility-first CSS frameworkRun the development server:

- **Framer Motion** - Smooth animations and interactions

```bash

### Backend & Servicesnpm run dev

- **Prisma ORM** - Type-safe database access# or

- **NextAuth.js** - Authentication with Google OAuthyarn dev

- **OpenAI API** - AI-powered message suggestions# or

- **Sharp** - High-performance image processingpnpm dev

# or

### Additional Librariesbun dev

- **html2canvas** - Client-side screenshot functionality```

- **jsPDF** - PDF generation

- **react-dropzone** - File upload with drag-and-dropOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## 🎯 Festival Coverage### Building for Production



| Festival | Images | Colors | Description |```bash

|----------|---------|--------|-------------|npm run build

| 🪔 Diwali | 6 | Orange, Gold | Festival of Lights |npm run start

| 🎄 Christmas | 6 | Red, Green | Christian celebration |```

| 🌈 Holi | 6 | Multicolor | Festival of Colors |

| 🌙 Eid | 6 | Green, Gold | Islamic celebration |## Tech Stack

| 🐣 Easter | 6 | Pastel | Christian spring festival |

| 🐘 Ganesh Chaturthi | 6 | Orange, Red | Hindu elephant deity festival |- **Framework:** Next.js 15.5.4 with App Router

| 🏹 Dussehra | 6 | Red, Gold | Victory of good over evil |- **Language:** TypeScript

| 🎊 New Year | 6 | Gold, Blue | Global celebration |- **Styling:** Tailwind CSS

| 🐉 Chinese New Year | 6 | Red, Gold | Lunar new year |- **Linting:** ESLint with Next.js configuration



## 🛠️ Setup & Installation## Project Structure



### Prerequisites```

- Node.js 18.0 or highersrc/

- npm or yarn package manager├── app/

- Optional: Google OAuth credentials for authentication│   ├── layout.tsx    # Root layout component

- Optional: OpenAI API key for AI features│   ├── page.tsx      # Home page

│   └── globals.css   # Global styles

### Quick Start```



1. **Clone the repository**## Contributing

   ```bash

   git clone https://github.com/yourusername/tyohaarify.gitContributions are welcome! Please feel free to submit a Pull Request.

   cd tyohaarify

   ```## License



2. **Install dependencies**This project is private and proprietary.

   ```bash

   npm install---

   ```

Made with ❤️ for festival celebrations
3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys (optional for basic functionality)
   ```

4. **Set up the database** (optional for enhanced features)
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3001
   ```

## 🎨 Template Showcase

### 1. Classic Elegant 👑
- **Best for**: Formal occasions, email sharing
- **Style**: Traditional layout with elegant typography
- **Colors**: Festival-appropriate with gold accents

### 2. Modern Minimalist ✨
- **Best for**: Professional sharing, clean aesthetic
- **Style**: Clean lines, plenty of white space
- **Colors**: Subtle tones with minimal decoration

### 3. Festive Collage 🎊
- **Best for**: Social media, fun celebrations
- **Style**: Colorful, vibrant with multiple elements
- **Colors**: Bright, festive color schemes

### 4. Vintage Postcard 📜
- **Best for**: Traditional feel, printing
- **Style**: Classic postcard design with borders
- **Colors**: Warm, nostalgic color palette

### 5. Social Media Ready 🚀
- **Best for**: Instagram, Facebook posts
- **Style**: Square format, social-optimized
- **Colors**: Trendy, social media friendly

## 🎯 Usage Guide

### Basic Card Creation
1. **Select Festival**: Choose from 9 available festivals
2. **Pick Template**: Select from 5 professional designs
3. **Choose Image**: Pick from 6 curated images per festival or upload custom
4. **Write Message**: Use the text editor or AI suggestions
5. **Add Your Name**: Personalize with sender information
6. **Generate Card**: Click to create your beautiful card
7. **Export & Share**: Download, print, or share directly

### Advanced Features
- **AI Suggestions**: Get personalized message recommendations
- **Custom Images**: Upload your own background images
- **Multi-Format Export**: Choose from various file formats and sizes
- **Social Optimization**: Export in perfect sizes for different platforms

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_key

# Optional - for enhanced features
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
```

## 📱 Mobile & Responsive

- **Touch Optimized**: Large buttons and touch-friendly interface
- **Responsive Templates**: All templates work perfectly on mobile
- **Performance**: Optimized for mobile networks
- **Offline Capable**: Core functionality works offline

## 🎉 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Festival image contributors and photographers
- The React and Next.js communities
- Open source library maintainers
- Festival celebration communities worldwide

## 🗺️ Roadmap

### Coming Soon
- [ ] More festivals and regional celebrations
- [ ] Video greeting cards
- [ ] Voice message integration
- [ ] Collaborative card creation
- [ ] Mobile app version
- [ ] Enterprise features

### Technical Improvements
- [ ] Enhanced accessibility
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Real-time collaboration
- [ ] Advanced analytics

## 📞 Support

- **Documentation**: This README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/yourusername/tyohaarify/issues) for bug reports
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/tyohaarify/discussions) for questions

---

## 🌟 Show Your Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
- 📢 Sharing with friends and family

---

**Tyohaarify** - Bringing joy and personalization to festival greetings worldwide! 🎊

*Made with ❤️ for celebrating festivals together*