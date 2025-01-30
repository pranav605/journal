import Image from "next/image";
import Link from "next/link";
import NavBar from "./ui/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar/>
      {/* Hero Section */}
      <div className="flex mx-auto h-screen justify-center items-center px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-3xl p-8 w-4/5 md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your stories, your memories, secure and with you forever – start journaling for free today
          </h1>
          <p className="md:text-l text-gray-400 max-w-2xl">
            Your personal space for self-reflection, growth, and mindful journaling.
            Start your journey today.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="/signup"
              className="text-sm md:text-l px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Get Started - It's Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose Our Journal?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-6 bg-gray-900 rounded-xl hover:transform hover:scale-105 transition duration-300 "
              >
                <div className="text-blue-400 bg-blue-900 bg-opacity-50 backdrop-blur-sm text-4xl mb-4  rounded-full p-10">{feature.icon}</div>
                <h3 className="text-l font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Motivation section*/}
      <section className="bg-gray-900 py-20">
        <div className="flex flex-col justify-center items-center mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent h-auto p-5">
            <h1 className="text-3xl md:text-4xl text-center font-bold ">Start your journey today</h1>
          </div>
          <p className="text-base md:text-l text-gray-400 max-w-2xl text-center">Journaling is a proven way to completely change your life, especially when you stick with it over time. Each time you write you'll get unparalleled clarity and life perspective.</p>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 pt-10">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-base md:text-2xl font-bold text-gray-400">1. Start Writing</h2>
              <p className="text-sm md:text-l text-gray-400 pt-3">All you have to do is start. Take 5 minutes to write in your journal about how you're feeling or reflect on the day.</p>
              <h2 className="text-base md:text-2xl font-bold text-gray-400 pt-8">2. Keep it going</h2>
              <p className="text-sm md:text-l text-gray-400 pt-3">The more you write the easier it will be. Set reminders to keep a regular daily, weekly, or monthly cadence.</p>
              <h2 className="text-base md:text-2xl font-bold text-gray-400 pt-8">3. Reflect and grow</h2>
              <p className="text-sm md:text-l text-gray-400 pt-3">Links to your entries will be sent to you in the future so you can get see through clear window into the past.</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={'/journal_anime.png'}
                alt="Journal image"
                width={400}
                height={400}
                className="h-2/3 md:h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 rounded-xl"
              >
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-l text-gray-200 mb-8">
            Join thousands of others who have transformed their lives through journaling.
          </p>
          <Link
            href="/signup"
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Start Journaling Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Journal App. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-300">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "🔒",
    title: "Private & Secure",
    description: "Your thoughts are encrypted and completely private. We take security seriously."
  },
  {
    icon: "🎨",
    title: "Custom Journals",
    description: "Choose different covers, backgrounds, fonts and more for each of your journals and entries."
  },
  {
    icon: "📱",
    title: "Access Anywhere",
    description: "Write from any device with our mobile-friendly interface and sync across platforms."
  },
  {
    icon: "📄",
    title: "Unlimited Entries",
    description: "Unlike other journaling platforms, you can write as much and as often as you like, all for free."
  },
  {
    icon: "💾",
    title: "Save as you go",
    description: "Never worry about losing your work — Journal saves as you type at your computer or on the go."
  },
  {
    icon: "💗",
    title: "So much more",
    description: "Enjoy encription, customization, search, journal and entry locking, entry sharing and more."
  }
];

const testimonials = [
  {
    text: "This journal app has helped me maintain consistency in my daily reflection practice. It's beautifully designed and easy to use.",
    name: "Sarah Johnson",
    title: "Daily User",
    avatar: "/sarah.jpg"
  },
  {
    text: "The journal app is great!! everyone should start using this",
    name: "Michael Chen",
    title: "Premium Member",
    avatar: "/michael.jpg"
  }
];
