import React, { useEffect, useRef } from 'react';
// import anime from 'animejs';
const AboutPage = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const stepsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => {
      const anime = window.anime;

      // Hero animation
      anime({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuart',
        delay: 200
      });

      anime({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart',
        delay: 600
      });

      // Stats counter animation
      anime({
        targets: '.stat-number',
        innerHTML: [0, (el) => el.getAttribute('data-count')],
        duration: 2000,
        round: 1,
        easing: 'easeOutExpo',
        delay: 1000
      });

      // Steps animation
      anime({
        targets: '.step-item',
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart',
        delay: anime.stagger(200, {start: 1500})
      });

      // Features grid animation
      anime({
        targets: '.feature-card',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuart',
        delay: anime.stagger(100, {start: 2000})
      });

      // Testimonials scroll animation
      anime({
        targets: '.testimonial-track',
        translateX: [0, -50 + '%'],
        duration: 30000,
        easing: 'linear',
        loop: true,
        delay: 3000
      });

      // CTA animation
      anime({
        targets: ctaRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuart',
        delay: 2500
      });

      // Background particles animation
      anime({
        targets: '.particle',
        translateY: [0, -20],
        translateX: [0, 10],
        opacity: [0.3, 0.8, 0.3],
        duration: 4000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        delay: anime.stagger(500)
      });
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-orange-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          <div className="hero-title opacity-0">
            <h1 className="text-7xl md:text-9xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Make ship happen
              </span>
            </h1>
            <p className="text-2xl md:text-4xl text-gray-300 font-light mb-12">
              OctoDock is the AI-powered backend engineer for <br/>
              <span className="text-orange-400">JavaScript and TypeScript codebases</span>
            </p>
          </div>
          
          <div className="hero-subtitle opacity-0 mb-16">
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full px-8 py-4 mb-8">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">
                <span className="stat-number text-orange-400 font-bold" data-count="500">0</span>+ 
                hours of dev time saved
              </span>
            </div>
            
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 p-1 rounded-xl">
              <div className="bg-black px-8 py-4 rounded-lg">
                <code className="text-gray-300">$ npm i octodock-cli</code>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "80", suffix: "%", label: "Faster project setup" },
              { number: "500", suffix: "+", label: "Hours saved" },
              { number: "300", suffix: "+", label: "Repos generated" },
              { number: "90", suffix: "%", label: "Less boilerplate" }
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="text-5xl font-bold text-orange-400 mb-2">
                  <span className="stat-number" data-count={stat.number}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={stepsRef} className="py-20 bg-gradient-to-br from-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get started in 3 steps
            </span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Transform your ideas into production-ready codebases in minutes, not hours
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Idea",
                desc: "Tell OctoDock what you want to build in plain English",
                code: `# Example prompt\n"Build a REST API for a blog with\nuser auth, posts, and comments"`
              },
              {
                step: "02",
                title: "AI Generates Code",
                desc: "Our AI understands your requirements and creates the complete backend structure",
                code: `✨ Generating...\n├── models/\n├── routes/\n├── middleware/\n└── database/`
              },
              {
                step: "03",
                title: "Push to GitHub",
                desc: "Get a complete, ready-to-deploy repository pushed to your GitHub account",
                code: `🚀 Repository created!\ngithub.com/you/your-blog-api\n\n✅ Ready to deploy`
              }
            ].map((step, i) => (
              <div key={i} className="step-item opacity-0">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="text-6xl font-black text-orange-500/20 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 mb-6">{step.desc}</p>
                  <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">{step.code}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div ref={featuresRef} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Everything you need to ship fast
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "Smart Code Generation", desc: "AI understands context and generates production-ready code" },
              { icon: "⚡", title: "Lightning Fast", desc: "From idea to GitHub repo in under 5 minutes" },
              { icon: "🔒", title: "Secure by Default", desc: "Built-in security best practices and authentication" },
              { icon: "🌐", title: "Full Stack Ready", desc: "Complete backend with API routes, models, and middleware" },
              { icon: "📱", title: "Any Framework", desc: "Support for Express, Fastify, NestJS, and more" },
              { icon: "🔄", title: "Git Integration", desc: "Automatic repository creation and version control" }
            ].map((feature, i) => (
              <div key={i} className="feature-card opacity-0">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef} className="py-20 overflow-hidden border-t border-gray-800">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              What builders say about OctoDock
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="testimonial-track flex gap-6" style={{width: '200%'}}>
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6" style={{width: '50%'}}>
                {[
                  { name: "@sarah_dev", avatar: "👩‍💻", text: "🤯 @octodock saved us 67 HOURS of development time since we adopted it. That's a team of only 4 full-time devs. Incredible!" },
                  { name: "@mikecodes", avatar: "👨‍💻", text: "If OctoDock has a million fans, then I am one of them. This tool has revolutionized how we approach backend development." },
                  { name: "@alexbuilds", avatar: "🧑‍💻", text: "I'm really enjoying @octodock. It's a game changer. The AI understands exactly what I need and generates perfect code every time." },
                  { name: "@devlisa", avatar: "👩‍🔬", text: "Finally, an AI tool that actually understands backend architecture! The code quality is production-ready from day one." }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 min-w-[400px]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div className="font-bold text-orange-400">{testimonial.name}</div>
                    </div>
                    <p className="text-gray-300">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="py-32 opacity-0">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Deploy your idea today
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of developers who are shipping faster with OctoDock
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 p-1 rounded-xl">
              <button className="bg-black px-8 py-4 rounded-lg text-white font-bold text-lg hover:bg-gray-900 transition-colors duration-300">
                Get Started Free
              </button>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl px-8 py-4">
              <code className="text-gray-300">$ npm i octodock-cli</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;