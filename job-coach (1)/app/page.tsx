import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, MessageSquare, FileText, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            CareerPrep
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Prepare for your dream job with AI-powered coaching
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Get personalized interview preparation, resume building assistance, and expert advice to land your next
            role.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get started <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Try demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to succeed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Interview Coach</h3>
              <p className="text-gray-600">
                Practice with our AI chatbot that simulates real interviews and provides instant feedback.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Builder</h3>
              <p className="text-gray-600">
                Create a professional resume with AI assistance that highlights your strengths and experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HR Question Bank</h3>
              <p className="text-gray-600">
                Access a comprehensive database of HR questions and expert-crafted answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an account</h3>
              <p className="text-gray-600">Sign up and tell us about your career goals and target positions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice with AI</h3>
              <p className="text-gray-600">Use our AI chatbot to practice interviews and build your resume.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Land your dream job</h3>
              <p className="text-gray-600">Apply with confidence and ace your interviews with our preparation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What our users say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <p className="text-gray-600 mb-4">
                "The AI interview coach helped me prepare for questions I never thought of. I felt so much more
                confident in my interview and got the job!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Software Engineer at Google</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <p className="text-gray-600 mb-4">
                "The resume builder transformed my CV completely. I started getting callbacks immediately after using
                the suggestions."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-500">Marketing Manager at Adobe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, transparent pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">
                $0<span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic interview questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Simple resume feedback</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>5 AI chat sessions/month</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="p-6 rounded-lg border bg-blue-50 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">
                $19<span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced interview simulations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Detailed resume builder</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited AI chat sessions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>HR question database</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full">Get started</Button>
              </Link>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">
                $49<span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Industry-specific coaching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom interview scenarios</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with our help.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Get started today <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CareerPrep</h3>
              <p className="text-sm text-gray-400">
                Your AI-powered career coach for interview preparation and job success.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI Interview Coach
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    HR Question Bank
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} CareerPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
