import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarRange, ChevronRight, Layers3, Sparkles, Users2, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';

const stats = [
  { label: 'Tasks shipped', value: '1.2k+' },
  { label: 'Team adoption', value: '96%' },
  { label: 'Faster delivery', value: '3.4x' },
  { label: 'Weekly uptime', value: '99.98%' }
];

const featureCards = [
  {
    icon: Workflow,
    title: 'Structured workflow',
    text: 'Move work from idea to delivery with a smooth workflow that feels premium on every screen.'
  },
  {
    icon: Layers3,
    title: 'Flexible organization',
    text: 'Projects, tasks, comments, labels, and team views are laid out for real collaboration at scale.'
  },
  {
    icon: BarChart3,
    title: 'High-signal analytics',
    text: 'Visualize completion rate, overdue work, activity, and weekly momentum with motion-rich panels.'
  },
  {
    icon: Users2,
    title: 'Built for teams',
    text: 'Role-based permissions, assignments, and activity streams make it feel like a modern SaaS product.'
  }
];

const stories = [
  {
    title: 'Plan the work',
    kicker: 'Strategy layer',
    copy: 'Capture projects with deadlines, scope, and ownership in a presentation-grade interface.',
    meta: ['Project cards', 'Deadline tracking', 'Member assignment'],
    gradient: 'from-primary via-secondary to-accent'
  },
  {
    title: 'Move it forward',
    kicker: 'Execution layer',
    copy: 'Kanban, table, and calendar views let your team work the way it wants without losing structure.',
    meta: ['Drag and drop', 'Status workflow', 'Real-time feel'],
    gradient: 'from-secondary via-sky-500 to-primary'
  },
  {
    title: 'See the outcome',
    kicker: 'Analytics layer',
    copy: 'Completion trends, overdue risk, and productivity charts keep the leadership view instantly clear.',
    meta: ['Completion rate', 'Weekly progress', 'Activity feed'],
    gradient: 'from-accent via-orange-400 to-primary'
  }
];

const carousel = [
  {
    title: 'Unified workspace',
    subtitle: 'Projects, tasks, and team signals in one flow.',
    glow: 'from-primary/40 to-secondary/20',
    metrics: ['24 active tasks', '8 due today', '4 risks flagged']
  },
  {
    title: 'Smooth task motion',
    subtitle: 'The UI reacts to focus, hover, and scroll like a premium product.',
    glow: 'from-secondary/35 to-cyan-300/15',
    metrics: ['Drag enabled', 'Micro-interactions', 'Skeleton states']
  },
  {
    title: 'Decision-ready analytics',
    subtitle: 'The dashboard turns raw work into readable product and team insights.',
    glow: 'from-accent/35 to-orange-300/15',
    metrics: ['Charts', 'Trends', 'Activity']
  }
];

function AnimatedPreview({ index }: { index: number }) {
  const active = carousel[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.title}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[color-mix(in_srgb,hsl(var(--card))_88%,transparent)] p-6 shadow-glow"
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80 blur-3xl', active.glow)} />
        <div className="relative space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-fg/50">Live preview</div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{active.title}</h3>
            </div>
            <div className="rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-fg/60">Auto slideshow</div>
          </div>
          <p className="max-w-md text-sm leading-6 text-fg/65">{active.subtitle}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {active.metrics.map(metric => (
              <Card key={metric} className="border-white/10 bg-card/75 p-4 text-sm font-medium">
                {metric}
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 text-xs text-fg/55">
                <span>Workflow board</span>
                <span>Live</span>
              </div>
              <div className="space-y-3 p-4">
                {['Kickoff docs', 'Design review', 'Release notes'].map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * itemIndex }}
                    className="rounded-2xl border border-border/70 bg-muted/50 px-4 py-3"
                  >
                    <div className="text-sm font-medium">{item}</div>
                    <div className="mt-1 h-2 rounded-full bg-gradient-to-r from-primary/70 via-secondary/70 to-accent/70" />
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="relative overflow-hidden p-0">
              <div className="h-full bg-gradient-to-br from-white/0 via-white/0 to-white/10 p-4">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[color-mix(in_srgb,hsl(var(--card))_82%,transparent)] p-4">
                  <div className="flex items-center justify-between text-xs text-fg/60">
                    <span>Velocity</span>
                    <span>+18.4%</span>
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    {[52, 66, 48, 74, 84, 72].map((height, barIndex) => (
                      <motion.div
                        key={height}
                        initial={{ scaleY: 0.4, opacity: 0.4 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.05 * barIndex }}
                        className="flex-1 origin-bottom rounded-t-2xl bg-gradient-to-t from-primary to-secondary"
                        style={{ height }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-border/70 bg-muted/50 px-4 py-3 text-sm text-fg/70">
                    Animated progress and metrics feel alive as the card changes.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % carousel.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.22]" />
      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <header className="glass-panel sticky top-4 z-30 mb-8 flex items-center justify-between rounded-[2rem] px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Ethara AI</div>
              <div className="text-xs text-fg/60">Team Task Manager SaaS</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/signup"><Button>Start free</Button></Link>
          </div>
        </header>

        <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-fg/75 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Startup-grade task management for modern teams
            </div>
            <h1 className="font-display mt-6 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Run projects with the clarity of Linear and the flexibility of Notion.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fg/70">
              Ethara AI combines clean collaboration, flexible task tracking, live analytics, and a premium glassmorphism interface into one polished workspace that feels like a complete product, not a starter template.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/signup"><Button size="lg" className="gap-2">Launch workspace <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/dashboard"><Button variant="outline" size="lg">View demo dashboard</Button></Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(stat => (
                <Card key={stat.label} className="surface-elevated p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-fg/45">{stat.label}</div>
                  <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }} className="relative">
            <Card className="surface-strong overflow-hidden border-white/10 p-0">
              <div className="border-b border-border/70 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 px-6 py-4">
                <div className="text-sm font-medium">Launch dashboard</div>
                <div className="text-xs text-fg/55">A premium overview of team momentum</div>
              </div>
              <div className="space-y-5 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="surface-elevated border-white/10 p-4">
                    <div className="text-xs text-fg/60">Tasks completed</div>
                    <div className="mt-2 text-3xl font-semibold">128</div>
                    <div className="mt-3 h-2 rounded-full bg-muted">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                    </div>
                  </Card>
                  <Card className="surface-elevated border-white/10 p-4">
                    <div className="text-xs text-fg/60">Active projects</div>
                    <div className="mt-2 text-3xl font-semibold">12</div>
                    <div className="mt-3 h-2 rounded-full bg-muted">
                      <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-secondary to-accent" />
                    </div>
                  </Card>
                </div>
                <Card className="surface-elevated border-white/10 p-4">
                  <div className="flex items-center justify-between text-sm text-fg/65">
                    <span>Scroll-driven showcase</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Dynamic</span>
                  </div>
                  <div className="mt-4 h-48 overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.28),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.18),rgba(15,23,42,0.06))]">
                    <div className="flex h-full items-end gap-3 p-4">
                      {[42, 60, 48, 74, 68, 84, 56].map((height, index) => (
                        <motion.div
                          key={height}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.15 }}
                          className="flex-1 rounded-t-3xl bg-gradient-to-t from-primary/75 via-secondary/65 to-accent/70 shadow-lg shadow-primary/20"
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Card className="surface-elevated border-white/10 p-3 text-xs">Todo<br /><span className="text-lg font-semibold">24</span></Card>
                  <Card className="surface-elevated border-white/10 p-3 text-xs">In Progress<br /><span className="text-lg font-semibold">18</span></Card>
                  <Card className="surface-elevated border-white/10 p-3 text-xs">Overdue<br /><span className="text-lg font-semibold">4</span></Card>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="py-10 lg:py-16">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.3em] text-fg/45">Scroll story</div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">A homepage that keeps unfolding as you scroll.</h2>
              <p className="max-w-xl text-sm leading-7 text-fg/65">
                Instead of a short hero, the front page now behaves like a product walkthrough: each section introduces a different visual rhythm, with motion, layered cards, and a slideshow-style showcase that keeps changing in place.
              </p>
              <div className="space-y-3">
                {stories.map((story, index) => (
                  <motion.div
                    key={story.title}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="surface-elevated rounded-[1.5rem] border border-border bg-card/80 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-fg/45">{story.kicker}</div>
                        <div className="mt-2 text-xl font-semibold">{story.title}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-fg/40" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-fg/65">{story.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {story.meta.map(item => (
                        <span key={item} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-fg/65">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <Card className="border-white/10 p-5 shadow-glow">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-fg/45">Slideshow</div>
                    <div className="mt-2 text-lg font-semibold">Product visuals that keep shifting</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-fg/50">
                    <CalendarRange className="h-4 w-4" />
                    Auto rotating
                  </div>
                </div>
                <AnimatedPreview index={activeSlide} />
                <div className="mt-4 flex gap-2">
                  {carousel.map((slide, index) => (
                    <button
                      key={slide.title}
                      onClick={() => setActiveSlide(index)}
                      className={cn('h-2 flex-1 rounded-full transition-all', index === activeSlide ? 'bg-primary' : 'bg-border')}
                      aria-label={`Show ${slide.title}`}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-fg/45">Design system</div>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Every section behaves like a polished SaaS surface.</h2>
            </div>
            <div className="hidden max-w-md text-sm leading-6 text-fg/60 md:block">
              Glass panels, gradients, scroll reveals, animated cards, and responsive spacing create the feel of a complete modern frontend.
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <Card className="surface-elevated h-full p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-fg/65">{feature.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="py-10 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -24 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
              <Card className="surface-strong overflow-hidden border-white/10 p-0">
                <div className="bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 px-6 py-5">
                  <div className="text-sm font-medium">Activity pulse</div>
                  <div className="text-xs text-fg/55">A motion-rich activity strip that makes the homepage feel alive.</div>
                </div>
                <div className="space-y-4 p-6">
                  {['Ava moved auth protection to In Progress', 'Noah reviewed the launch hero section', 'Maya approved analytics cards for release'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className="surface-elevated rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-fg/70"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 24 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
                <Card className="surface-strong h-full border-white/10 p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-fg/45">Final impression</div>
                  <h2 className="font-display mt-2 text-3xl font-bold tracking-tight">Built to feel like a product recruiters would remember.</h2>
                <p className="mt-4 text-sm leading-7 text-fg/65">
                  The landing page now reads more like a real SaaS homepage: it scrolls longer, introduces multiple visual moods, changes focus as you move, and ends with a clear call to action.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/signup"><Button size="lg" className="gap-2">Create workspace <ArrowRight className="h-4 w-4" /></Button></Link>
                  <Link to="/dashboard"><Button variant="outline" size="lg">Open dashboard</Button></Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
