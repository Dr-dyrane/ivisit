import { useState, useEffect } from 'react';
import { Search, Globe, Clock, Star, ExternalLink, Crown, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface SitemapPage {
  url: string;
  title: string;
  description: string;
  priority: number;
  changeFreq: string;
  lastmod: string;
  category: 'core' | 'services' | 'legal' | 'premium';
  image?: string;
  isPremium?: boolean;
  cta?: string;
  discount?: string;
}

const sitemapData: SitemapPage[] = [
  {
    url: 'https://ivisit.ng/early-access',
    title: '🔥 Premium Early Access',
    description: '🎯 LIMITED TIME: Get lifetime premium access at 80% OFF - Only $10 (was $50)',
    priority: 1.0,
    changeFreq: 'daily',
    lastmod: '2025-01-21',
    category: 'premium',
    image: 'https://ivisit.ng/og-image.png',
    isPremium: true,
    cta: 'Get Premium Now',
    discount: '80% OFF'
  },
  {
    url: 'https://ivisit.ng/',
    title: 'Homepage',
    description: 'Ultra-rapid emergency medical dispatch and coordination platform',
    priority: 0.9,
    changeFreq: 'weekly',
    lastmod: '2025-01-21',
    category: 'core',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/ambulance',
    title: 'Emergency Ambulance',
    description: '5-minute response time for medical emergencies',
    priority: 0.8,
    changeFreq: 'weekly',
    lastmod: '2025-01-21',
    category: 'services',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/bed-booking',
    title: 'Hospital Bed Booking',
    description: 'Real-time hospital bed availability and booking system',
    priority: 0.8,
    changeFreq: 'weekly',
    lastmod: '2025-01-21',
    category: 'services',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/early-access',
    title: 'Premium Early Access',
    description: 'Limited time offer - Get lifetime premium access at 80% off',
    priority: 0.8,
    changeFreq: 'daily',
    lastmod: '2025-01-21',
    category: 'core',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/emergency',
    title: 'Emergency Dispatch',
    description: 'Immediate emergency medical response and coordination',
    priority: 0.8,
    changeFreq: 'weekly',
    lastmod: '2025-01-21',
    category: 'services',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/book-bed',
    title: 'Book Hospital Bed',
    description: 'Instant hospital bed booking and reservation system',
    priority: 0.8,
    changeFreq: 'weekly',
    lastmod: '2025-01-21',
    category: 'services',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/services',
    title: 'Medical Services',
    description: 'Comprehensive emergency medical services and healthcare coordination',
    priority: 0.8,
    changeFreq: 'monthly',
    lastmod: '2025-01-21',
    category: 'services',
    image: 'https://ivisit.ng/og-image.png'
  },
  {
    url: 'https://ivisit.ng/support',
    title: 'Support',
    description: '24/7 customer support and technical assistance',
    priority: 0.7,
    changeFreq: 'monthly',
    lastmod: '2025-01-21',
    category: 'core'
  },
  {
    url: 'https://ivisit.ng/privacy',
    title: 'Privacy Policy',
    description: 'Privacy policy and data protection information',
    priority: 0.3,
    changeFreq: 'yearly',
    lastmod: '2025-01-21',
    category: 'legal'
  },
  {
    url: 'https://ivisit.ng/terms',
    title: 'Terms of Service',
    description: 'Terms of service and usage guidelines',
    priority: 0.3,
    changeFreq: 'yearly',
    lastmod: '2025-01-21',
    category: 'legal'
  }
];

const categoryColors = {
  core: 'border-blue-500/50 bg-blue-500/5',
  services: 'border-green-500/50 bg-green-500/5',
  legal: 'border-gray-500/50 bg-gray-500/5',
  premium: 'border-gradient-to-r from-red-500/50 to-orange-500/50 bg-gradient-to-br from-red-500/10 to-orange-500/10 shadow-lg shadow-red-500/20'
};

const categoryIcons = {
  core: <Star className="h-4 w-4 text-blue-500" />,
  services: <Globe className="h-4 w-4 text-green-500" />,
  legal: <Clock className="h-4 w-4 text-gray-500" />,
  premium: <Crown className="h-4 w-4 text-red-500" />
};

export default function SitemapViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredPages = sitemapData.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Pages', count: sitemapData.length },
    { value: 'premium', label: '🔥 Premium Offer', count: sitemapData.filter(p => p.category === 'premium').length },
    { value: 'core', label: 'Core Pages', count: sitemapData.filter(p => p.category === 'core').length },
    { value: 'services', label: 'Services', count: sitemapData.filter(p => p.category === 'services').length },
    { value: 'legal', label: 'Legal', count: sitemapData.filter(p => p.category === 'legal').length }
  ];

  const getPriorityColor = (priority: number) => {
    if (priority >= 0.9) return 'text-green-600 bg-green-100';
    if (priority >= 0.7) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-background">
      <Section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
                Site Map<span className="text-primary">.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore all pages of iVisit.ng. Find emergency medical services, booking options, and support resources.
              </p>

              {/* Premium Alert Banner */}
              <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="h-5 w-5 text-red-500 animate-pulse" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-red-600">🔥 LIMITED TIME OFFER</p>
                    <p className="text-xs text-red-500">Get Premium Access for just $10 (Save $40 - 80% OFF)</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-red-500" />
                </div>
              </div>

              {/* Search */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map(category => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? (category.value === 'premium' ? 'accent' : 'outline') : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`rounded-full text-sm ${category.value === 'premium' ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : ''}`}
                  >
                    {category.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${category.value === 'premium' ? 'bg-red-500 text-white' : 'bg-primary/20 text-primary'}`}>
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPages.length} of {sitemapData.length} pages
              </p>
            </div>

            {/* Sitemap Grid */}
            <div className="grid gap-3 sm:gap-4">
              {filteredPages.map((page, index) => (
                <Card
                  key={index}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg ${page.isPremium
                    ? 'border-red-500/50 bg-red-500/5 shadow-lg shadow-red-500/10 scale-[1.01] sm:scale-[1.02]'
                    : categoryColors[page.category]
                    }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Page Image */}
                    {page.image && (
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <img
                          src={page.image}
                          alt={page.title}
                          className={`w-full h-32 sm:w-16 sm:h-16 rounded-lg object-cover border ${page.isPremium ? 'border-red-500 ring-2 ring-red-500/50' : 'border-border'
                            }`}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          {categoryIcons[page.category]}
                          <h3 className={`text-base sm:text-lg font-bold truncate ${page.isPremium ? 'text-red-600' : 'text-foreground'
                            }`}>
                            {page.title}
                          </h3>
                          {page.isPremium && (
                            <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[8px] sm:text-[10px] font-bold uppercase animate-pulse">
                              HOT
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {page.discount && (
                            <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] sm:text-xs font-medium">
                              {page.discount}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getPriorityColor(page.priority)}`}>
                            Priority: {page.priority}
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2 sm:line-clamp-none ${page.isPremium ? 'text-red-600 font-semibold' : 'text-muted-foreground'
                        }`}>
                        {page.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {page.changeFreq}
                          </span>
                          <span>Updated: {page.lastmod}</span>
                        </div>

                        <Button
                          variant={page.isPremium ? 'accent' : 'ghost'}
                          size="sm"
                          onClick={() => window.open(page.url, '_blank')}
                          className={`text-[10px] sm:text-xs w-full sm:w-auto ${page.isPremium
                            ? 'bg-red-500 hover:bg-red-600 text-white px-4 h-9 sm:h-8'
                            : 'hover:text-primary h-8'
                            }`}
                        >
                          {page.isPremium ? (
                            <span className="flex items-center justify-center gap-1">
                              <Crown className="h-3 w-3" />
                              {page.cta}
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              Visit
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Premium CTA Section */}
            <div className="mt-12 text-center">
              <Card className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 via-orange-500/5 to-yellow-500/10 border-2 border-red-500/30 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Crown className="h-8 w-8 text-red-500" />
                  <h3 className="text-2xl font-black text-red-600">🔥 PREMIUM OFFER ENDS SOON</h3>
                  <Crown className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-lg text-red-600 font-semibold mb-6">
                  Get lifetime premium access for just <span className="text-2xl font-black">$10</span> (Save $40 - 80% OFF)
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>VIP Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Premium Features</span>
                  </div>
                </div>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => window.open('https://ivisit.ng/early-access', '_blank')}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-bold rounded-xl"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Get Premium Now - Save 80%
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <p className="text-xs text-red-500 mt-4">
                  ⏰ Limited time offer - Don't miss out on $40 savings!
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
