import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto p-8 pt-20 md:pt-10">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 flex-row">
              <Avatar className="w-14 h-14">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-wrap'>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue={user?.phoneNumber} />
              </div>
              <Button>Update Profile</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {user?.emergencyContacts?.map((contact, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                <p>{contact.phoneNumber}</p>
              </div>
            ))}
            <Button className="mt-4">Add Emergency Contact</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

