import React from 'react';
import { Calendar, Clock, MapPin, Activity, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/cards"
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
    <div className="container mx-auto p-8 pt-20 md:pt-10">
      <h1 className="text-3xl font-bold mb-6">Your Visits</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visits.map((visit) => (
          <Card key={visit.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img src={visit.image} alt={visit.hospital} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{visit.hospital}</CardTitle>
                  <CardDescription>{visit.type}</CardDescription>
                </div>
                <Badge 
                  variant={visit.status === 'Upcoming' ? 'default' : 'secondary'}
                >
                  {visit.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${visit.doctor}`} />
                    <AvatarFallback>{visit.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{visit.doctor}</p>
                    <p className="text-xs text-muted-foreground">{visit.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{visit.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{visit.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{visit.hospital}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="accent" className="w-full">
                <Activity className="mr-2 h-4 w-4" /> View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

