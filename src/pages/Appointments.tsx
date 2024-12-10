import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cards"
import { Badge } from "@/components/ui/badge"

const visits = [
  {
    id: 1,
    hospital: 'City General Hospital',
    date: '2023-07-15',
    time: '10:00 AM',
    type: 'Check-up',
    status: 'Upcoming',
  },
  {
    id: 2,
    hospital: 'St. Mary\'s Medical Center',
    date: '2023-07-10',
    time: '2:30 PM',
    type: 'Follow-up',
    status: 'Completed',
  },
  {
    id: 3,
    hospital: 'Emergency Care Unit',
    date: '2023-07-05',
    time: '8:00 PM',
    type: 'Emergency',
    status: 'Completed',
  },
];

export default function Visits() {
  return (
    <div className="container mx-auto p-8 pt-20 md:pt-10">
      <h1 className="text-2xl font-bold mb-6">Your Visits</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visits.map((visit) => (
          <Card key={visit.id}>
            <CardHeader>
              <CardTitle>{visit.hospital}</CardTitle>
              <CardDescription>{visit.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} />
                <span>{visit.date}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} />
                <span>{visit.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{visit.hospital}</span>
              </div>
              <Badge 
                className="mt-2" 
                variant={visit.status === 'Upcoming' ? 'default' : 'secondary'}
              >
                {visit.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

