import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const visits = [
  {
    id: 1,
    hospital: 'City General Hospital',
    doctor: 'Dr. Emily Johnson',
    specialty: 'Cardiology',
    date: '2023-07-15',
    time: '10:00 AM',
    type: 'Check-up',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 2,
    hospital: 'St. Mary\'s Medical Center',
    doctor: 'Dr. Michael Lee',
    specialty: 'Orthopedics',
    date: '2023-07-10',
    time: '2:30 PM',
    type: 'Follow-up',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 3,
    hospital: 'Emergency Care Unit',
    doctor: 'Dr. Sarah Parker',
    specialty: 'Emergency Medicine',
    date: '2023-07-05',
    time: '8:00 PM',
    type: 'Emergency',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=300&h=200',
  },
];

export default function Visits() {
  return (
    <div className="w-full p-6 sm:p-8 pt-24 md:pt-10">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
        Your Visits<span className="text-primary">.</span>
      </h1>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visits.map((visit) => (
          <Card key={visit.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={visit.image} 
                alt={visit.hospital}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-black text-white tracking-tight mb-1">{visit.hospital}</h3>
                <p className="text-sm font-light text-white/90 tracking-wide">{visit.specialty}</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${visit.doctor}`} />
                  <AvatarFallback className="text-sm font-black">{visit.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-black tracking-tight text-foreground">{visit.doctor}</h4>
                  <p className="text-sm font-light text-muted-foreground tracking-wide">{visit.type}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-light tracking-wide">{visit.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-light tracking-wide">{visit.time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-light tracking-wide">{visit.hospital}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant={visit.status === 'Upcoming' ? 'default' : 'secondary'}
                  className="text-xs font-light uppercase tracking-[0.15em]"
                >
                  {visit.status}
                </Badge>
                <Button variant="ghost" size="sm" className="group">
                  <span className="text-sm font-light tracking-wide">View Details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

