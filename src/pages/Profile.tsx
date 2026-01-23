import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/cards"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, User, Plus, Edit } from 'lucide-react';

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="w-full p-6 sm:p-8 pt-24 md:pt-10">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
        Your Profile<span className="text-primary">.</span>
      </h1>
      <div className="grid gap-12 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-black tracking-tight">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-2xl font-black">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-foreground">{user?.name}</h2>
                <p className="text-lg font-light text-muted-foreground tracking-wide">{user?.email}</p>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-light uppercase tracking-[0.15em] text-primary">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue={user?.name} className="pl-12 h-12 text-base" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-light uppercase tracking-[0.15em] text-primary">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue={user?.email} className="pl-12 h-12 text-base" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-light uppercase tracking-[0.15em] text-primary">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" className="pl-12 h-12 text-base" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-light uppercase tracking-[0.15em] text-primary">Address</Label>
                  <div className="relative">
                    <Edit className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input id="address" className="pl-12 h-12 text-base" />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="pt-8">
            <Button className="w-full py-6 text-lg font-black tracking-[0.2em] uppercase rounded-2xl">
              Update Profile
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user?.emergencyContacts?.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    <p className="text-sm">{contact.phoneNumber}</p>
                  </div>
                  <Button variant="ghost" size="md">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="accent" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Emergency Contact
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your medical history is private and secure. Only you and your authorized healthcare providers can access this information.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Allergies</li>
              <li>Medications</li>
              <li>Past Surgeries</li>
              <li>Chronic Conditions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="accent" className="w-full">View Full Medical History</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

