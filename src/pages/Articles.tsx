import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';
import { useSEO } from '@/hooks/useSEO';

export default function Articles() {
  useSEO({
    title: 'Knowledge Hub | Enterprise CRM, Cybersecurity & Networking Insights | VOIP CAT',
    description: 'Explore 12 in-depth articles on CRM implementation, cybersecurity best practices, network infrastructure, and digital transformation. Expert insights for enterprise technology leaders.',
    keywords: 'CRM knowledge hub, cybersecurity articles, network infrastructure guides, enterprise technology insights, digital transformation best practices, threat intelligence, cloud security',
    canonical: 'https://voipcat.com/articles',
    ogImage: 'https://voipcat.com/images/og-articles.png',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(articles.map(a => a.category)));
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const articleVariants = {
    collapsed: { height: 'auto', opacity: 1 },
    expanded: { height: 'auto', opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-16 md:py-24 border-b border-border"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Knowledge Hub
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore in-depth articles on CRM, cybersecurity, and networking. Stay informed about the latest trends and best practices in enterprise technology.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-6"
      >
        <div className="container">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All Articles
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </motion.section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:gap-8"
            >
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                    className="bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                    whileHover={{ y: -2 }}
                  >
                    {/* Article Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min read
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedArticle === article.id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>

                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    {/* Article Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Expanded Content */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: expandedArticle === article.id ? 1 : 0,
                        height: expandedArticle === article.id ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border mt-4">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p className="text-muted-foreground whitespace-pre-wrap text-justify">
                            {article.content}
                          </p>
                        </div>
                        <div className="mt-6 flex gap-3">
                          <Button className="btn-glow">
                            Read Full Article
                          </Button>
                          <Button variant="outline">
                            Share Article
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground mb-4">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 border-t border-border"
      >
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles, industry trends, and best practices delivered to your inbox.
          </p>
          <Button className="btn-glow">
            Subscribe Now
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
