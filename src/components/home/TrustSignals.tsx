import { Ambulance, BedDouble, CheckCircle2, MapPinned } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

const nextSteps = [
  {
    label: 'We find the nearest available help'
  },
  {
    label: 'Your location is shared automatically'
  },
  {
    label: 'You can track arrival in real time'
  }
];

const helpCards = [
  {
    icon: <Ambulance className="h-6 w-6" />,
    label: 'Request an ambulance',
    description: 'Start help from your phone.'
  },
  {
    icon: <BedDouble className="h-6 w-6" />,
    label: 'Choose a hospital bed',
    description: 'See where you can go next.'
  },
  {
    icon: <MapPinned className="h-6 w-6" />,
    label: 'Share your location',
    description: 'Help responders find you faster.'
  }
];

export default function TrustSignals() {
  return (
    <Section id="help" className="min-h-0 bg-secondary/20 py-16 sm:py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">What happens next</p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.05em] text-foreground leading-[0.95]">
              Built for urgent moments.
            </h2>
            <p className="mt-4 text-lg sm:text-xl font-light text-muted-foreground leading-relaxed">
              Clear steps. No confusion.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {nextSteps.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-2xl bg-background/[0.65] px-5 py-4 text-sm font-medium text-foreground shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                <span>{step.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {helpCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[2rem] bg-background/60 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:shadow-[0_30px_70px_rgba(0,0,0,0.24)] sm:p-8"
              >
                <div className="inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  {card.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{card.label}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
