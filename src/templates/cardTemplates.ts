// Template 1: Classic Elegant Card
export const classicElegantTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .header {
            background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
            padding: 30px;
            text-align: center;
            color: #4a4a4a;
        }
        .festival-title {
            font-size: 2.5em;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-weight: bold;
        }
        .image-container {
            position: relative;
            height: 300px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
        }
        .message-container {
            position: relative;
            z-index: 2;
            background: rgba(255,255,255,0.95);
            padding: 20px;
            margin: 20px;
            border-radius: 15px;
            text-align: center;
        }
        .message {
            font-size: 1.3em;
            line-height: 1.6;
            color: #333;
            margin: 0 0 15px 0;
        }
        .footer {
            padding: 30px;
            text-align: center;
            background: #f8f9fa;
        }
        .sender {
            font-size: 1.2em;
            color: #666;
            font-style: italic;
        }
        .decorative-border {
            height: 5px;
            background: linear-gradient(90deg, #ff9a9e, #fecfef, #ff9a9e);
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="decorative-border"></div>
        <div class="header">
            <h1 class="festival-title">Happy ${festivalName}!</h1>
        </div>
        <div class="image-container">
            <div class="overlay"></div>
            <div class="message-container">
                <p class="message">${message}</p>
            </div>
        </div>
        <div class="footer">
            <p class="sender">With warm wishes,<br><strong>${senderName}</strong></p>
        </div>
        <div class="decorative-border"></div>
    </div>
</body>
</html>`;

// Template 2: Modern Minimalist Card
export const modernMinimalistTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: #f5f5f5;
        }
        .card {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .image-section {
            height: 350px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            position: relative;
        }
        .gradient-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
        }
        .festival-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.95);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .festival-title {
            font-size: 2.2em;
            margin: 0 0 20px 0;
            color: #333;
            font-weight: 300;
            letter-spacing: 2px;
        }
        .message {
            font-size: 1.1em;
            line-height: 1.8;
            color: #666;
            margin: 0 0 30px 0;
            font-weight: 300;
        }
        .sender {
            font-size: 1em;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="image-section">
            <div class="gradient-overlay"></div>
            <div class="festival-badge">${festivalName}</div>
        </div>
        <div class="content">
            <h1 class="festival-title">Celebrate Together</h1>
            <p class="message">${message}</p>
            <p class="sender">${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 3: Festive Collage Style
export const festiveCollageTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Verdana', sans-serif;
            background: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
        }
        .card {
            max-width: 550px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            position: relative;
        }
        .decorative-frame {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 3px dashed #ff6b6b;
            border-radius: 20px;
            z-index: 1;
            pointer-events: none;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 25px;
            text-align: center;
            color: white;
            position: relative;
            z-index: 2;
        }
        .festival-emoji {
            font-size: 3em;
            margin-bottom: 10px;
            display: block;
        }
        .festival-title {
            font-size: 1.8em;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .main-image {
            height: 280px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            position: relative;
            z-index: 2;
            margin: 20px;
            border-radius: 15px;
            border: 5px solid #fff;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .message-section {
            padding: 25px 30px;
            text-align: center;
            position: relative;
            z-index: 2;
        }
        .message {
            font-size: 1.2em;
            line-height: 1.7;
            color: #444;
            margin: 0 0 20px 0;
            background: linear-gradient(135deg, #ffeaa7, #fab1a0);
            padding: 20px;
            border-radius: 15px;
            border-left: 5px solid #e17055;
        }
        .sender {
            font-size: 1.1em;
            color: #666;
            font-weight: bold;
        }
        .corner-decoration {
            position: absolute;
            width: 40px;
            height: 40px;
            background: #ff6b6b;
            transform: rotate(45deg);
        }
        .corner-decoration.top-left { top: -20px; left: -20px; }
        .corner-decoration.top-right { top: -20px; right: -20px; }
        .corner-decoration.bottom-left { bottom: -20px; left: -20px; }
        .corner-decoration.bottom-right { bottom: -20px; right: -20px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="decorative-frame"></div>
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>
        
        <div class="header">
            <span class="festival-emoji">🎉</span>
            <h1 class="festival-title">${festivalName}</h1>
        </div>
        
        <div class="main-image"></div>
        
        <div class="message-section">
            <p class="message">${message}</p>
            <p class="sender">- ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 4: Vintage Postcard Style
export const vintagePostcardTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            background: #d4c5b9;
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            background: #f4f1e8;
            border: 8px solid #8b4513;
            box-shadow: 0 0 0 3px #d4c5b9, 0 15px 25px rgba(0,0,0,0.3);
            position: relative;
        }
        .vintage-border {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 2px solid #8b4513;
            border-style: double;
        }
        .header {
            text-align: center;
            padding: 30px 20px 20px;
            position: relative;
            z-index: 2;
        }
        .festival-title {
            font-size: 2.8em;
            color: #8b4513;
            margin: 0;
            text-shadow: 2px 2px 0 #d4c5b9;
            font-weight: bold;
            letter-spacing: 3px;
        }
        .subtitle {
            font-size: 1.2em;
            color: #a0522d;
            margin: 10px 0 0 0;
            font-style: italic;
        }
        .content-grid {
            display: flex;
            position: relative;
            z-index: 2;
        }
        .image-section {
            width: 60%;
            height: 300px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            border: 5px solid #8b4513;
            margin: 0 0 0 20px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        }
        .message-section {
            width: 40%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .message {
            font-size: 1.1em;
            line-height: 1.6;
            color: #5d4037;
            margin: 0 0 20px 0;
            font-style: italic;
            text-align: justify;
        }
        .stamp {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 60px;
            background: #dc143c;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
            border: 3px solid white;
            border-style: dashed;
            z-index: 3;
        }
        .sender {
            font-size: 1.1em;
            color: #8b4513;
            text-align: right;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.9em;
            color: #a0522d;
            border-top: 2px solid #d4c5b9;
            position: relative;
            z-index: 2;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="vintage-border"></div>
        <div class="stamp">Festival<br>2025</div>
        
        <div class="header">
            <h1 class="festival-title">${festivalName}</h1>
            <p class="subtitle">Season's Greetings</p>
        </div>
        
        <div class="content-grid">
            <div class="image-section"></div>
            <div class="message-section">
                <p class="message">${message}</p>
                <p class="sender">From: ${senderName}</p>
            </div>
        </div>
        
        <div class="footer">
            "Celebrating traditions, creating memories"
        </div>
    </div>
</body>
</html>`;

// Template 5: Social Media Ready Card
export const socialMediaTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card {
            width: 500px;
            height: 500px;
            margin: 0 auto;
            position: relative;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            filter: brightness(0.7);
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,107,107,0.8), rgba(255,182,193,0.8));
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
            padding: 40px;
            box-sizing: border-box;
        }
        .festival-icon {
            font-size: 4em;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        .festival-title {
            font-size: 2.5em;
            font-weight: bold;
            margin: 0 0 15px 0;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .message {
            font-size: 1.3em;
            line-height: 1.5;
            margin: 0 0 25px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            max-width: 400px;
        }
        .sender {
            font-size: 1.1em;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            border-top: 2px solid rgba(255,255,255,0.5);
            padding-top: 15px;
            margin-top: 15px;
        }
        .hashtag {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.9em;
            backdrop-filter: blur(10px);
        }
        .decorative-corners {
            position: absolute;
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.6);
        }
        .decorative-corners.top-left {
            top: 20px;
            left: 20px;
            border-right: none;
            border-bottom: none;
        }
        .decorative-corners.top-right {
            top: 20px;
            right: 20px;
            border-left: none;
            border-bottom: none;
        }
        .decorative-corners.bottom-left {
            bottom: 20px;
            left: 20px;
            border-right: none;
            border-top: none;
        }
        .decorative-corners.bottom-right {
            bottom: 20px;
            right: 20px;
            border-left: none;
            border-top: none;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="background-image"></div>
        <div class="overlay">
            <div class="decorative-corners top-left"></div>
            <div class="decorative-corners top-right"></div>
            <div class="decorative-corners bottom-left"></div>
            <div class="decorative-corners bottom-right"></div>
            
            <div class="festival-icon">🎊</div>
            <h1 class="festival-title">Happy ${festivalName}</h1>
            <p class="message">${message}</p>
            <p class="sender">${senderName}</p>
            <div class="hashtag">#${festivalName}2025</div>
        </div>
    </div>
</body>
</html>`;

// Template 6: Black Shadow Overlay
export const blackShadowTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'Arial', sans-serif;
            background: #1a1a1a;
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            height: 600px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            filter: brightness(0.6);
        }
        .black-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                135deg,
                rgba(0,0,0,0.7) 0%,
                rgba(0,0,0,0.4) 50%,
                rgba(0,0,0,0.8) 100%
            );
        }
        .content {
            position: relative;
            z-index: 10;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
            color: white;
        }
        .festival-title {
            font-size: 3.5em;
            font-weight: 900;
            margin: 0 0 20px 0;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
            background: linear-gradient(45deg, #ffffff, #e0e0e0);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1px;
        }
        .message {
            font-size: 1.4em;
            line-height: 1.6;
            margin: 20px 0 30px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            max-width: 500px;
            font-weight: 300;
        }
        .sender {
            font-size: 1.2em;
            font-weight: 600;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
            margin-top: auto;
        }
        .decorative-element {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 2em;
            opacity: 0.8;
        }
        .bottom-accent {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="background-image"></div>
        <div class="black-overlay"></div>
        <div class="content">
            <div class="decorative-element">✨</div>
            <h1 class="festival-title">${festivalName}</h1>
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
        <div class="bottom-accent"></div>
    </div>
</body>
</html>`;

// Template 7: White Shadow Overlay
export const whiteShadowTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'Arial', sans-serif;
            background: #f8f9fa;
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            height: 600px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            filter: brightness(1.1) saturate(0.9);
        }
        .white-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                135deg,
                rgba(255,255,255,0.85) 0%,
                rgba(255,255,255,0.6) 50%,
                rgba(255,255,255,0.9) 100%
            );
            backdrop-filter: blur(2px);
        }
        .content {
            position: relative;
            z-index: 10;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
            color: #2d3748;
        }
        .festival-title {
            font-size: 3.2em;
            font-weight: 800;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(45deg, #e53e3e, #dd6b20, #d69e2e);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
        }
        .message {
            font-size: 1.3em;
            line-height: 1.7;
            margin: 20px 0 30px 0;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            max-width: 480px;
            font-weight: 400;
            color: #4a5568;
        }
        .sender {
            font-size: 1.1em;
            font-weight: 600;
            color: #2d3748;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            margin-top: auto;
        }
        .decorative-border {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid rgba(255,255,255,0.4);
            border-radius: 16px;
            pointer-events: none;
        }
        .corner-decoration {
            position: absolute;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, rgba(229,62,62,0.2), rgba(221,107,32,0.2));
            border-radius: 50%;
            backdrop-filter: blur(10px);
        }
        .corner-decoration.top-left {
            top: -30px;
            left: -30px;
        }
        .corner-decoration.bottom-right {
            bottom: -30px;
            right: -30px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="background-image"></div>
        <div class="white-overlay"></div>
        <div class="decorative-border"></div>
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration bottom-right"></div>
        <div class="content">
            <h1 class="festival-title">${festivalName}</h1>
            <p class="message">${message}</p>
            <p class="sender">With love, ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 8: Dark Gradient Overlay
export const darkGradientTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'Arial', sans-serif;
            background: #0f172a;
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            height: 650px;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            filter: brightness(0.5) contrast(1.1);
        }
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                180deg,
                rgba(15,23,42,0.3) 0%,
                rgba(30,41,59,0.6) 40%,
                rgba(15,23,42,0.9) 100%
            );
        }
        .content {
            position: relative;
            z-index: 10;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 40px;
            color: white;
        }
        .festival-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgba(139,69,19,0.8), rgba(160,82,45,0.8));
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.9em;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            backdrop-filter: blur(10px);
            margin-bottom: 20px;
            align-self: flex-start;
        }
        .festival-title {
            font-size: 3.8em;
            font-weight: 900;
            margin: 0 0 auto 0;
            text-shadow: 3px 3px 8px rgba(0,0,0,0.7);
            line-height: 0.9;
            background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .message {
            font-size: 1.4em;
            line-height: 1.6;
            margin: 30px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            font-weight: 300;
            max-width: 90%;
        }
        .sender {
            font-size: 1.1em;
            font-weight: 600;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
            opacity: 0.9;
        }
        .decorative-line {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #fbbf24, #f59e0b);
            margin: 20px 0;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="background-image"></div>
        <div class="gradient-overlay"></div>
        <div class="content">
            <div class="festival-badge">Festival</div>
            <h1 class="festival-title">${festivalName}</h1>
            <div class="decorative-line"></div>
            <p class="message">${message}</p>
            <p class="sender">${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 9: Light Gradient Overlay
export const lightGradientTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            height: 650px;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            border: 2px solid rgba(255,255,255,0.1);
        }
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            filter: brightness(1.2) saturate(0.8);
        }
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                45deg,
                rgba(255,255,255,0.9) 0%,
                rgba(255,255,255,0.7) 30%,
                rgba(255,255,255,0.4) 70%,
                rgba(255,255,255,0.8) 100%
            );
            backdrop-filter: blur(1px);
        }
        .content {
            position: relative;
            z-index: 10;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 50px 40px;
            color: #2d3748;
        }
        .festival-title {
            font-size: 3.5em;
            font-weight: 800;
            margin: 0 0 30px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1px;
        }
        .message {
            font-size: 1.4em;
            line-height: 1.7;
            margin: 20px 0 40px 0;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            max-width: 480px;
            font-weight: 400;
            color: #4a5568;
            background: rgba(255,255,255,0.7);
            padding: 25px 30px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
        }
        .sender {
            font-size: 1.2em;
            font-weight: 600;
            color: #2d3748;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
        }
        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .floating-element {
            position: absolute;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
        }
        .floating-element:nth-child(1) {
            top: 10%;
            left: 10%;
            font-size: 2em;
            animation-delay: 0s;
        }
        .floating-element:nth-child(2) {
            top: 20%;
            right: 15%;
            font-size: 1.5em;
            animation-delay: 2s;
        }
        .floating-element:nth-child(3) {
            bottom: 15%;
            left: 15%;
            font-size: 1.8em;
            animation-delay: 4s;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(2deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="background-image"></div>
        <div class="gradient-overlay"></div>
        <div class="floating-elements">
            <div class="floating-element">✨</div>
            <div class="floating-element">🌟</div>
            <div class="floating-element">💫</div>
        </div>
        <div class="content">
            <h1 class="festival-title">${festivalName}</h1>
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 10: Glass Morphism Card
export const glassMorphismTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            margin: 0;
            padding: 20px;
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .card {
            width: 400px;
            height: 500px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 0;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            position: relative;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -50%;
            width: 200%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .image-section {
            height: 250px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            position: relative;
            border-radius: 24px 24px 0 0;
        }
        .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
            display: flex;
            align-items: flex-end;
            padding: 20px;
        }
        .festival-title {
            font-size: 2em;
            font-weight: 700;
            color: white;
            margin: 0;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        .content {
            padding: 30px;
            text-align: center;
            color: white;
        }
        .message {
            font-size: 1.1em;
            line-height: 1.6;
            margin: 20px 0;
            font-weight: 400;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .sender {
            font-size: 1em;
            font-weight: 500;
            margin-top: 30px;
            opacity: 0.9;
            font-style: italic;
        }
        .decorative-circle {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            top: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="image-section">
            <div class="image-overlay">
                <h1 class="festival-title">${festivalName}</h1>
            </div>
        </div>
        <div class="decorative-circle">✨</div>
        <div class="content">
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 11: Neon Glow Card
export const neonGlowTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Futura', 'Avenir Next', sans-serif;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-image: radial-gradient(circle at 25% 25%, #1e3a8a 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #7c3aed 0%, transparent 50%);
        }
        .card {
            width: 400px;
            height: 550px;
            background: linear-gradient(145deg, #111111, #1a1a1a);
            border-radius: 20px;
            padding: 0;
            overflow: hidden;
            position: relative;
            border: 2px solid #333;
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.3);
        }
        .card::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #8b5cf6);
            background-size: 400% 400%;
            border-radius: 22px;
            z-index: -1;
            animation: gradientRotate 6s linear infinite;
        }
        @keyframes gradientRotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .image-container {
            height: 250px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            position: relative;
            border-radius: 18px 18px 0 0;
            filter: brightness(0.8) contrast(1.2);
        }
        .glow-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2));
            mix-blend-mode: overlay;
        }
        .festival-title {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2.2em;
            font-weight: 900;
            color: #fff;
            text-align: center;
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.8),
                         0 0 40px rgba(139, 92, 246, 0.6),
                         0 0 60px rgba(139, 92, 246, 0.4);
            letter-spacing: 2px;
            animation: neonPulse 2s ease-in-out infinite alternate;
        }
        @keyframes neonPulse {
            from { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6); }
            to { text-shadow: 0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.8); }
        }
        .content {
            padding: 40px 30px;
            text-align: center;
            background: linear-gradient(145deg, #1a1a1a, #111111);
        }
        .message {
            font-size: 1.1em;
            line-height: 1.7;
            color: #e5e7eb;
            margin: 0 0 30px 0;
            font-weight: 300;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .sender {
            font-size: 1em;
            color: #8b5cf6;
            font-weight: 600;
            text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
            letter-spacing: 1px;
        }
        .floating-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #8b5cf6;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
            animation: float 4s ease-in-out infinite;
        }
        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 80%; animation-delay: 1s; }
        .particle:nth-child(3) { top: 80%; left: 20%; animation-delay: 2s; }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="floating-particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
        </div>
        <div class="image-container">
            <div class="glow-overlay"></div>
            <h1 class="festival-title">${festivalName}</h1>
        </div>
        <div class="content">
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 12: Paper Cut Art Card
export const paperCutTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Playfair Display', serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            width: 420px;
            height: 580px;
            background: #ffffff;
            border-radius: 0;
            position: relative;
            box-shadow: 
                0 1px 3px rgba(0,0,0,0.12),
                0 1px 2px rgba(0,0,0,0.24),
                inset 0 0 0 1px #f0f0f0;
            overflow: hidden;
        }
        .paper-texture {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
            background-size: 20px 20px;
            pointer-events: none;
        }
        .decorative-border {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 3px solid transparent;
            background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37) border-box;
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            border-radius: 15px;
        }
        .image-frame {
            position: absolute;
            top: 40px;
            left: 40px;
            right: 40px;
            height: 200px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            box-shadow: 
                inset 0 0 0 3px #fff,
                inset 0 0 0 6px #d4af37,
                0 10px 20px rgba(0,0,0,0.1);
            position: relative;
        }
        .image-frame::after {
            content: '';
            position: absolute;
            top: -6px;
            left: -6px;
            right: -6px;
            bottom: -6px;
            background: linear-gradient(45deg, 
                transparent 0%, transparent 25%,
                rgba(212, 175, 55, 0.1) 25%, rgba(212, 175, 55, 0.1) 50%,
                transparent 50%, transparent 75%,
                rgba(212, 175, 55, 0.1) 75%);
            background-size: 20px 20px;
            border-radius: 16px;
            z-index: -1;
        }
        .festival-title {
            position: absolute;
            top: 260px;
            left: 40px;
            right: 40px;
            font-size: 2.5em;
            font-weight: 700;
            color: #2c3e50;
            text-align: center;
            margin: 0;
            text-shadow: 2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff;
            letter-spacing: 2px;
            line-height: 1.2;
        }
        .ornamental-line {
            position: absolute;
            top: 340px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }
        .ornamental-line::before,
        .ornamental-line::after {
            content: '❦';
            position: absolute;
            top: -8px;
            color: #d4af37;
            font-size: 18px;
        }
        .ornamental-line::before { left: -15px; }
        .ornamental-line::after { right: -15px; }
        .message {
            position: absolute;
            top: 380px;
            left: 50px;
            right: 50px;
            font-size: 1.1em;
            line-height: 1.6;
            color: #34495e;
            text-align: center;
            font-style: italic;
            margin: 0;
        }
        .sender {
            position: absolute;
            bottom: 80px;
            right: 60px;
            font-size: 1.1em;
            color: #2c3e50;
            font-weight: 600;
            font-style: normal;
        }
        .corner-flourish {
            position: absolute;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, #d4af37 2px, transparent 2px);
            background-size: 10px 10px;
        }
        .corner-flourish.top-left { top: 25px; left: 25px; }
        .corner-flourish.top-right { top: 25px; right: 25px; }
        .corner-flourish.bottom-left { bottom: 25px; left: 25px; }
        .corner-flourish.bottom-right { bottom: 25px; right: 25px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="paper-texture"></div>
        <div class="decorative-border"></div>
        <div class="corner-flourish top-left"></div>
        <div class="corner-flourish top-right"></div>
        <div class="corner-flourish bottom-left"></div>
        <div class="corner-flourish bottom-right"></div>
        <div class="image-frame"></div>
        <h1 class="festival-title">${festivalName}</h1>
        <div class="ornamental-line"></div>
        <p class="message">${message}</p>
        <p class="sender">— ${senderName}</p>
    </div>
</body>
</html>`;

// Template 13: Watercolor Dream Card
export const watercolorTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Dancing Script', cursive;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            width: 400px;
            height: 560px;
            background: #fff;
            border-radius: 25px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .watercolor-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 20% 30%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(72, 187, 120, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 70%, rgba(129, 140, 248, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 90% 80%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 10% 90%, rgba(236, 72, 153, 0.3) 0%, transparent 50%);
            filter: blur(1px);
            animation: watercolorFlow 20s ease-in-out infinite;
        }
        @keyframes watercolorFlow {
            0%, 100% { transform: rotate(0deg) scale(1); }
            33% { transform: rotate(1deg) scale(1.02); }
            66% { transform: rotate(-1deg) scale(0.98); }
        }
        .image-container {
            position: absolute;
            top: 40px;
            left: 40px;
            right: 40px;
            height: 220px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .image-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                rgba(255, 255, 255, 0.1) 0%,
                transparent 50%,
                rgba(255, 255, 255, 0.1) 100%);
            mix-blend-mode: overlay;
        }
        .festival-title {
            position: absolute;
            top: 280px;
            left: 0;
            right: 0;
            font-size: 3em;
            font-weight: 700;
            color: #2d3748;
            text-align: center;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            line-height: 1;
        }
        .message-area {
            position: absolute;
            top: 360px;
            left: 40px;
            right: 40px;
            bottom: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }
        .message {
            font-size: 1.3em;
            line-height: 1.5;
            color: #4a5568;
            margin: 0 0 20px 0;
            font-weight: 400;
        }
        .sender {
            font-size: 1.2em;
            color: #2d3748;
            font-weight: 600;
            align-self: flex-end;
        }
        .paint-splash {
            position: absolute;
            border-radius: 50%;
            opacity: 0.6;
            animation: splash 15s ease-in-out infinite;
        }
        .splash1 {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(255, 107, 107, 0.4), transparent 70%);
            top: 10px;
            right: 20px;
            animation-delay: 0s;
        }
        .splash2 {
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(72, 187, 120, 0.4), transparent 70%);
            bottom: 50px;
            left: 30px;
            animation-delay: 5s;
        }
        .splash3 {
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(129, 140, 248, 0.3), transparent 70%);
            top: 50%;
            right: -20px;
            animation-delay: 10s;
        }
        @keyframes splash {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="watercolor-bg"></div>
        <div class="paint-splash splash1"></div>
        <div class="paint-splash splash2"></div>
        <div class="paint-splash splash3"></div>
        <div class="image-container"></div>
        <h1 class="festival-title">${festivalName}</h1>
        <div class="message-area">
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
    </div>
</body>
</html>`;

// Template 14: 3D Floating Card
export const floating3DTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            perspective: 1000px;
        }
        .card-container {
            transform-style: preserve-3d;
            animation: cardFloat 6s ease-in-out infinite;
        }
        @keyframes cardFloat {
            0%, 100% { transform: translateY(0px) rotateX(5deg) rotateY(-5deg); }
            50% { transform: translateY(-20px) rotateX(-2deg) rotateY(2deg); }
        }
        .card {
            width: 380px;
            height: 520px;
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 20px;
            position: relative;
            box-shadow: 
                0 20px 40px rgba(0,0,0,0.1),
                0 40px 80px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,0.9),
                inset 0 -1px 0 rgba(0,0,0,0.05);
            overflow: hidden;
            transform-style: preserve-3d;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                rgba(255,255,255,0.1) 0%,
                transparent 50%,
                rgba(255,255,255,0.05) 100%);
            pointer-events: none;
            transform: translateZ(1px);
        }
        .image-layer {
            position: absolute;
            top: 30px;
            left: 30px;
            right: 30px;
            height: 200px;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
            border-radius: 15px;
            box-shadow: 
                0 15px 30px rgba(0,0,0,0.2),
                inset 0 1px 0 rgba(255,255,255,0.5);
            transform: translateZ(10px);
        }
        .content-layer {
            position: absolute;
            top: 250px;
            left: 30px;
            right: 30px;
            bottom: 30px;
            transform: translateZ(5px);
        }
        .festival-title {
            font-size: 2.2em;
            font-weight: 800;
            color: #1a202c;
            text-align: center;
            margin: 20px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: 1px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .message {
            font-size: 1.1em;
            line-height: 1.6;
            color: #4a5568;
            text-align: center;
            margin: 30px 0;
            font-weight: 400;
        }
        .sender {
            font-size: 1em;
            color: #2d3748;
            text-align: right;
            font-weight: 600;
            margin-top: auto;
            padding-top: 20px;
        }
        .floating-element {
            position: absolute;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            animation: elementFloat 8s ease-in-out infinite;
            transform: translateZ(15px);
        }
        .element1 {
            width: 12px;
            height: 12px;
            top: 60px;
            right: 50px;
            animation-delay: 0s;
        }
        .element2 {
            width: 8px;
            height: 8px;
            top: 120px;
            left: 60px;
            animation-delay: 2s;
        }
        .element3 {
            width: 15px;
            height: 15px;
            bottom: 100px;
            right: 40px;
            animation-delay: 4s;
        }
        @keyframes elementFloat {
            0%, 100% { transform: translateZ(15px) translateY(0px); opacity: 0.7; }
            50% { transform: translateZ(25px) translateY(-15px); opacity: 1; }
        }
        .light-reflection {
            position: absolute;
            top: 0;
            left: -50%;
            width: 200%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 30%,
                rgba(255,255,255,0.2) 50%,
                transparent 70%);
            transform: translateZ(20px);
            animation: lightSweep 8s ease-in-out infinite;
            pointer-events: none;
        }
        @keyframes lightSweep {
            0% { transform: translateX(-100%) translateZ(20px); }
            50% { transform: translateX(100%) translateZ(20px); }
            100% { transform: translateX(200%) translateZ(20px); }
        }
    </style>
</head>
<body>
    <div class="card-container">
        <div class="card">
            <div class="light-reflection"></div>
            <div class="floating-element element1"></div>
            <div class="floating-element element2"></div>
            <div class="floating-element element3"></div>
            <div class="image-layer"></div>
            <div class="content-layer">
                <h1 class="festival-title">${festivalName}</h1>
                <p class="message">${message}</p>
                <p class="sender">— ${senderName}</p>
            </div>
        </div>
    </div>
</body>
</html>`;

// Template 15: Holographic Card
export const holographicTemplate = (
  festivalName: string,
  imagePath: string,
  message: string,
  senderName: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${festivalName} Greetings</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Space Grotesk', sans-serif;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.3) 0%, transparent 50%);
        }
        .card {
            width: 400px;
            height: 550px;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.05) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            animation: cardRotate 10s linear infinite;
        }
        @keyframes cardRotate {
            0% { transform: perspective(1000px) rotateY(0deg); }
            100% { transform: perspective(1000px) rotateY(360deg); }
        }
        .holographic-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                transparent 0%,
                rgba(255, 0, 128, 0.1) 25%,
                rgba(0, 255, 255, 0.1) 50%,
                rgba(255, 255, 0, 0.1) 75%,
                transparent 100%);
            background-size: 200% 200%;
            animation: holoShift 3s ease-in-out infinite;
            mix-blend-mode: screen;
        }
        @keyframes holoShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .rainbow-border {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
                #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff, #ff006e);
            background-size: 300% 300%;
            border-radius: 22px;
            z-index: -1;
            animation: rainbowRotate 4s linear infinite;
        }
        @keyframes rainbowRotate {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
        }
        .image-section {
            position: relative;
            height: 250px;
            margin: 30px;
            border-radius: 15px;
            overflow: hidden;
            background-image: url('${imagePath}');
            background-size: cover;
            background-position: center;
        }
        .image-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                rgba(255, 0, 128, 0.2),
                rgba(0, 255, 255, 0.2),
                rgba(255, 255, 0, 0.2));
            background-size: 200% 200%;
            animation: holoImageShift 5s ease-in-out infinite;
            mix-blend-mode: overlay;
        }
        @keyframes holoImageShift {
            0%, 100% { background-position: 0% 0%; }
            33% { background-position: 100% 100%; }
            66% { background-position: 0% 100%; }
        }
        .festival-title {
            position: absolute;
            top: 300px;
            left: 30px;
            right: 30px;
            font-size: 2.5em;
            font-weight: 900;
            text-align: center;
            background: linear-gradient(45deg, 
                #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textShine 2s ease-in-out infinite;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            letter-spacing: 2px;
        }
        @keyframes textShine {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .content-area {
            position: absolute;
            bottom: 100px;
            left: 30px;
            right: 30px;
            text-align: center;
        }
        .message {
            font-size: 1.1em;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .sender {
            font-size: 1em;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 600;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .digital-glitch {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent, #00ffff, transparent);
            animation: glitchScan 3s linear infinite;
            opacity: 0.7;
        }
        @keyframes glitchScan {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="rainbow-border"></div>
        <div class="holographic-overlay"></div>
        <div class="digital-glitch"></div>
        <div class="image-section"></div>
        <h1 class="festival-title">${festivalName}</h1>
        <div class="content-area">
            <p class="message">${message}</p>
            <p class="sender">— ${senderName}</p>
        </div>
    </div>
</body>
</html>`;