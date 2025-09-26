'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Palette, Download, Share2, Calendar, CheckCircle, PlayCircle, Users, Gift, Star, Zap, Heart, Clock, Smartphone, Globe, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Choose Your Festival",
      description: "Browse our collection of festivals and select the one you want to celebrate",
      icon: <Calendar className="w-12 h-12" />,
      color: "from-purple-500 to-pink-500",
      details: [
        "Browse 9+ popular festivals including Diwali, Christmas, Eid, and more",
        "Check upcoming festivals with countdown timers",
        "View festival-specific template collections",
        "Get inspired by traditional and modern celebration themes"
      ],
      image: "/images/diwali/diwali1.jpeg"
    },
    {
      id: 2,
      title: "Pick a Template",
      description: "Select from our premium collection of 15+ beautiful, professionally designed templates",
      icon: <Palette className="w-12 h-12" />,
      color: "from-blue-500 to-purple-500",
      details: [
        "15+ premium templates with unique designs",
        "Glass Morphism, Neon Glow, 3D effects, and more",
        "Mobile-optimized and print-ready formats",
        "Regular updates with new seasonal templates"
      ],
      image: "/images/christmas/christmas1.jpg"
    },
    {
      id: 3,
      title: "Customize Your Card",
      description: "Add your personal message, upload photos, and customize colors to make it uniquely yours",
      icon: <Wand2 className="w-12 h-12" />,
      color: "from-green-500 to-blue-500",
      details: [
        "Add personalized messages and wishes",
        "Upload your own photos and images",
        "Customize colors, fonts, and layouts",
        "Real-time preview as you edit"
      ],
      image: "/images/holi/holi1.jpg"
    },
    {
      id: 4,
      title: "Download & Share",
      description: "Export your card in high quality and share it with family and friends across all platforms",
      icon: <Share2 className="w-12 h-12" />,
      color: "from-orange-500 to-red-500",
      details: [
        "Download in multiple formats (PNG, JPG, PDF)",
        "High-resolution output for print and digital use",
        "Direct sharing to social media platforms",
        "Save to your device or cloud storage"
      ],
      image: "/images/eid/eid1.jpg"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent suggestions for messages and design elements based on your chosen festival"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Create beautiful cards on any device - desktop, tablet, or smartphone"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Cultural",
      description: "Celebrate festivals from around the world with culturally appropriate designs"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Creation",
      description: "Design and create professional greeting cards in just 3-5 minutes"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Friendly",
      description: "Easy-to-use interface suitable for all ages and technical skill levels"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personal Touch",
      description: "Add your own photos, messages, and personal elements to make each card special"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Happy User",
      content: "Tyohaarify made creating Diwali cards for my family so easy! The templates are beautiful and the customization options are perfect.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Event Organizer",
      content: "We use Tyohaarify for all our community festival celebrations. The quality and variety of templates is outstanding.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Teacher",
      content: "My students love using Tyohaarify to create cards for different cultural festivals. It's educational and fun!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-[#e773b4] to-purple-600 bg-clip-text text-transparent">
                Tyohaarify
              </span>{' '}
              Works
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create stunning, personalized greeting cards for any festival in just 4 simple steps. 
              Join thousands of users who trust Tyohaarify for their celebration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e773b4] to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Create Beautiful Cards in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intuitive process makes card creation effortless and enjoyable for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps List */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'transform scale-105'
                      : 'hover:transform hover:scale-102'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-white shadow-xl border-primary-200'
                      : 'bg-white/70 hover:bg-white shadow-lg border-gray-200 hover:border-primary-100'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-2 flex items-center justify-center text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                            activeStep === index
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            Step {step.id}
                          </span>
                          {activeStep === index && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {step.description}
                        </p>
                        {activeStep === index && (
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Preview */}
            <div className="relative">
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `url('${steps[activeStep].image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-sm opacity-90">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center space-x-3 mt-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-primary-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tyohaarify?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Packed with powerful features to make your card creation experience seamless and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#e773b4] to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy users who create beautiful cards with Tyohaarify
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#e773b4] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#e773b4] to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            <Gift className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Create Your First Card?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of users and start creating beautiful, personalized greeting cards today. 
              It's free, fast, and incredibly easy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Creating Now
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                Browse Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}