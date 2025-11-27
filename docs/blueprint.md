# **App Name**: LegalEase

## Core Features:

- Issue Mapping: Use AI with access to a legal database tool to analyze user input (text or voice) and map it to relevant law sections, providing a severity score (low, medium, high) based on keywords related to threats or violence.
- Law Article Display: Display law articles with section number, act name, official text, simple explanation, punishment, keywords, bookmarking, sharing, and 'Add evidence' options.
- Template Editor: Provide templates (FIR, Complaint, RTI, Notice) with editable fields, autofill from user details, export to PDF, download/share, and copy-to-clipboard functionality.
- Evidence Vault: Securely upload and encrypt evidence (image/audio/text) with local encryption and optional biometric lock; securely store in Firebase Storage.
- AI Chatbot: Offer in-app chatbot that uses AI to provide legal assistance based on the provided law dataset.
- Multilingual Support: Implement multilingual support for English, Hindi, and Kannada, with a UI to switch languages.
- Offline Access: Enable offline access to law articles and templates via local SQLite cache, syncing when online.

## Style Guidelines:

- Primary color: Indigo-purple (#6C5CE7) for a sense of authority and trustworthiness.
- Background color: Very light gray (#F7F8FC) to ensure readability and a clean interface.
- Accent color: Soft red (#FF7675) to highlight important actions and danger alerts (SOS).
- Headline font: 'Poppins' (sans-serif) for headings, providing a modern and approachable feel.
- Body font: 'Roboto' (sans-serif) for body text, ensuring readability and clarity.
- Use clear, modern icons to represent different legal categories and actions. Ensure icons are accessible and easily recognizable.
- Subtle animations using Lottie for loading screens and micro-interactions (button presses, successful actions). Page transitions to utilize FadeScaleTransition for smooth navigation.