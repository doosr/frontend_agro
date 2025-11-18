import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Droplets,
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Clock,
  BarChart3,
  Smartphone,
  Cloud,
  Award,
  Play,
  ChevronRight
} from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Droplets,
      title: 'Irrigation Intelligente',
      description: 'Système automatisé basé sur les données en temps réel pour optimiser l\'utilisation de l\'eau',
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'IA de Détection',
      description: 'Intelligence artificielle avancée pour détecter les maladies des plantes avec 95% de précision',
      color: 'purple'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avancés',
      description: 'Tableaux de bord détaillés avec statistiques et prévisions pour optimiser vos cultures',
      color: 'green'
    },
    {
      icon: Smartphone,
      title: 'Application Mobile',
      description: 'Contrôlez votre exploitation depuis n\'importe où avec notre interface intuitive',
      color: 'orange'
    },
    {
      icon: Cloud,
      title: 'Cloud Sécurisé',
      description: 'Vos données sont stockées en toute sécurité sur des serveurs cloud hautement disponibles',
      color: 'cyan'
    },
    {
      icon: Zap,
      title: 'Temps Réel',
      description: 'Notifications instantanées et mise à jour en temps réel de tous vos capteurs',
      color: 'yellow'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Hectares Gérés', icon: TrendingUp },
    { value: '95%', label: 'Économie d\'Eau', icon: Droplets },
    { value: '500+', label: 'Agriculteurs', icon: Users },
    { value: '24/7', label: 'Support', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Ahmed Ben Salem',
      role: 'Agriculteur, Kairouan',
      image: '👨‍🌾',
      rating: 5,
      text: 'SmartPlant IA a révolutionné ma façon de cultiver. J\'ai augmenté mon rendement de 40% tout en réduisant ma consommation d\'eau de 60%.'
    },
    {
      name: 'Fatma Trabelsi',
      role: 'Ingénieur Agronome, Bizerte',
      image: '👩‍🌾',
      rating: 5,
      text: 'La détection précoce des maladies m\'a permis de sauver plusieurs récoltes. L\'IA est impressionnante de précision.'
    },
    {
      name: 'Mohamed Gharbi',
      role: 'Exploitant Agricole, Sousse',
      image: '👨‍💼',
      rating: 5,
      text: 'Interface intuitive, données en temps réel, support réactif. C\'est l\'outil qu\'il me fallait pour moderniser mon exploitation.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '99',
      period: 'mois',
      description: 'Parfait pour les petites exploitations',
      features: [
        'Jusqu\'à 5 capteurs',
        'Détection IA basique',
        'Dashboard web',
        'Support email',
        'Historique 30 jours'
      ],
      color: 'gray',
      popular: false
    },
    {
      name: 'Professional',
      price: '249',
      period: 'mois',
      description: 'Pour les agriculteurs professionnels',
      features: [
        'Jusqu\'à 20 capteurs',
        'IA avancée + recommandations',
        'Dashboard + Application mobile',
        'Support prioritaire 24/7',
        'Historique illimité',
        'Alertes personnalisées',
        'API access'
      ],
      color: 'primary',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sur mesure',
      period: '',
      description: 'Solutions personnalisées pour grandes exploitations',
      features: [
        'Capteurs illimités',
        'IA sur mesure',
        'Intégrations personnalisées',
        'Support dédié',
        'Formation sur site',
        'SLA garanti',
        'Multi-sites'
      ],
      color: 'gray',
      popular: false
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SmartPlant IA</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Fonctionnalités
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Comment ça marche
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Tarifs
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Témoignages
              </button>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Commencer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Fonctionnalités
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Comment ça marche
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Tarifs
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Témoignages
              </button>
              <Link to="/login" className="block px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                Connexion
              </Link>
              <Link to="/register" className="block px-4 py-2 bg-primary-600 text-white rounded-lg text-center">
                Commencer
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 -z-10" />
        
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4" />
                <span>Solution #1 en Agriculture Intelligente</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                L'agriculture du futur,
                <span className="text-primary-600"> aujourd'hui</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Optimisez vos cultures avec l'intelligence artificielle. 
                Détectez les maladies, automatisez l'irrigation et augmentez 
                vos rendements jusqu'à 40%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 font-semibold text-lg group"
                >
                  Démarrer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-primary-600 hover:text-primary-600 transition-all font-semibold text-lg group"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la démo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {['👨‍🌾', '👩‍🌾', '👨‍💼', '👩‍💼'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">500+</span> agriculteurs nous font confiance
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="font-semibold text-gray-900">Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                      <Droplets className="h-6 w-6 mb-2 opacity-80" />
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-sm opacity-90">Humidité Sol</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                      <TrendingUp className="h-6 w-6 mb-2 opacity-80" />
                      <div className="text-2xl font-bold">+42%</div>
                      <div className="text-sm opacity-90">Rendement</div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-gray-50 rounded-xl p-4 h-40 flex items-end justify-around space-x-2">
                    {[60, 80, 45, 90, 70, 95, 85].map((height, i) => (
                      <div key={i} className="flex-1 bg-primary-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }} />
                    ))}
                  </div>

                  {/* Alert */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-900">Irrigation automatique activée</p>
                      <p className="text-xs text-yellow-700 mt-1">Basée sur les données en temps réel</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-bounce">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-pulse">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 text-primary-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* Features Section */}
<section id="features" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Tout ce dont vous avez besoin
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Une suite complète d'outils pour gérer votre exploitation agricole 
        de manière intelligente et efficace
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        
        // Generate Tailwind color classes dynamically
        const bgColor = {
          blue: 'bg-blue-100',
          purple: 'bg-purple-100',
          green: 'bg-green-100',
          orange: 'bg-orange-100',
          cyan: 'bg-cyan-100',
          yellow: 'bg-yellow-100'
        }[feature.color];

        const textColor = {
          blue: 'text-blue-600',
          purple: 'text-purple-600',
          green: 'text-green-600',
          orange: 'text-orange-600',
          cyan: 'text-cyan-600',
          yellow: 'text-yellow-600'
        }[feature.color];

        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
          >
            <div className={`inline-flex p-4 rounded-xl ${bgColor} mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`h-8 w-8 ${textColor}`} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>
  
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes simples pour transformer votre agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary-600 to-purple-600" style={{ top: '80px' }} />

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-600 text-white text-2xl font-bold mb-6 relative z-10">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Installez les capteurs
              </h3>
              <p className="text-gray-600">
                Installation rapide et facile de nos capteurs IoT dans votre exploitation. 
                Aucune compétence technique requise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600 text-white text-2xl font-bold mb-6 relative z-10">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Connectez-vous
              </h3>
              <p className="text-gray-600">
                Accédez à votre tableau de bord depuis n'importe quel appareil. 
                Les données arrivent en temps réel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white text-2xl font-bold mb-6 relative z-10">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Optimisez vos cultures
              </h3>
              <p className="text-gray-600">
                Laissez l'IA analyser vos données et vous fournir des recommandations 
                personnalisées pour maximiser vos rendements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs transparents
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le plan qui convient à votre exploitation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-4 ring-primary-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    Populaire
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    {plan.price === 'Sur mesure' ? (
                      <div className="text-3xl font-bold text-gray-900">
                        Sur mesure
                      </div>
                    ) : (
                      <div>
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">DT/{plan.period}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.price === 'Sur mesure' ? 'Nous contacter' : 'Commencer'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des centaines d'agriculteurs satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à révolutionner votre agriculture ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez SmartPlant IA aujourd'hui et bénéficiez de 30 jours d'essai gratuit
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg group"
          >
            Commencer gratuitement
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SmartPlant IA</span>
              </div>
              <p className="text-gray-400 text-sm">
                L'agriculture intelligente pour un avenir durable
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Fonctionnalités</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Tarifs</button></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
             {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licences</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 SmartPlant IA. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all transform hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing; 