<content>import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Ambulance, MapPin, Clock, Phone, AlertCircle, Star, ChevronRight, Shield } from 'lucide-react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  eta: string;
  rating: number;
  ambulances: number;
  type: 'Premium' | 'Standard';
  price: string;
  image: string;
}

export default function AmbulanceCall() {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<'Premium' | 'Standard'>('Premium');

  const hospitals = [
    {
      id: '1',
      name: 'City General Hospital',
      distance: '0.5 km',
      eta: '3 mins',
      rating: 4.8,
      ambulances: 3,
      type: 'Premium',
      price: '$150',
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: '2',
      name: "St. Mary's Medical Center",
      distance: '0.8 km',
      eta: '5 mins',
      rating: 4.9,
      ambulances: 2,
      type: 'Premium',
      price: '$180',
      image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: '3',
      name: 'Emergency Care Unit',
      distance: '1.0 km',
      eta: '6 mins',
      rating: 4.7,
      ambulances: 4,
      type: 'Standard',
      price: '$120',
      image: 'https://images.unsplash.com/photo-1626315869436-d6781ba69d6f?auto=format&fit=crop&q=80&w=300&h=200'
    }
  ];

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

  const handleEmergencyCall = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    // Here you would typically integrate with a real emergency service API
    console.log(`Emergency service requested from hospital ${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4yMjY3NiAwQzEuOTEzNzQgMCAyLjQ1MzUxIDAuNTM5NzczIDIuNDUzNTEgMS4yMjY3NkMyLjQ1MzUxIDEuOTEzNzQgMS45MTM3NCAyLjQ1MzUxIDEuMjI2NzYgMi40NTM1MUMwLjUzOTc3MyAyLjQ1MzUxIDAgMS45MTM3NCAwIDEuMjI2NzZDMCAwLjUzOTc3MyAwLjUzOTc3MyAwIDEuMjI2NzYgMFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-3 h-screen">
        {/* Map Section */}
        <div className="lg:col-span-2 h-full bg-card/50 backdrop-blur-sm relative">
          <img 
            src="https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-74.006,40.7128,13,0/1200x800?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNrZjBhZGxscTA4dGIyc3BldXpkeXVwbWUifQ.7F65M4ZR4oseXRcKFgXeLg"
            alt="Map"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        </div>

        {/* Service Selection Panel */}
        <animated.div 
          style={fadeIn} 
          className="h-full overflow-auto bg-card/50 backdrop-blur-sm border-l border-border"
        >
          <Container className="p-6 space-y-6">
            {/* Emergency Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-500/10 p-3 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-accent-500 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-foreground">Emergency Response</h2>
                  <p className="text-muted-foreground">Select service type</p>
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              {(['Premium', 'Standard'] as const).map((type) => (
                <Card
                  key={type}
                  onClick={() => setServiceType(type)}
                  className={`cursor-pointer p-4 ${
                    serviceType === type
                      ? 'ring-2 ring-accent-500'
                      : 'hover:bg-accent-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Shield className={`h-5 w-5 ${
                      serviceType === type ? 'text-accent-500' : 'text-muted-foreground'
                    }`} />
                    {type === 'Premium' && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-500/10 text-accent-500">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-foreground">{type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type === 'Premium' 
                      ? 'Priority response, specialized care'
                      : 'Basic emergency response'
                    }
                  </p>
                </Card>
              ))}
            </div>

            {/* Emergency Call Button */}
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="w-full bg-accent-600 text-white px-6 py-4 rounded-xl hover:bg-accent-500 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            >
              <Phone className="h-5 w-5" />
              <span>911</span>
            </button>

            {/* Available Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-muted-foreground">
                <h3 className="font-medium">Available Services</h3>
                <span className="text-sm">{hospitals.length} nearby</span>
              </div>

              {hospitals
                .filter(hospital => hospital.type === serviceType)
                .map((hospital) => (
                <Card
                  key={hospital.id}
                  className={`cursor-pointer ${
                    selectedHospital === hospital.id 
                      ? 'ring-2 ring-accent-500' 
                      : 'hover:bg-accent-500/5'
                  }`}
                  onClick={() => setSelectedHospital(hospital.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{hospital.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{hospital.rating}</span>
                      </div>
                    </div>
                    <span className="text-lg font-medium text-foreground">{hospital.price}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-accent-500" />
                      <span className="text-sm text-muted-foreground">{hospital.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-accent-500" />
                      <span className="text-sm text-muted-foreground">ETA: {hospital.eta}</span>
                    </div>
                  </div>
                  
                  {selectedHospital === hospital.id && (
                    <button 
                      onClick={() => handleEmergencyCall(hospital.id)}
                      className="w-full bg-accent-600 text-white px-4 py-3 rounded-lg hover:bg-accent-500 transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Ambulance className="h-5 w-5" />
                        <span className="font-medium">Request Now</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  )}
                </Card>
              ))}
            </div>
          </Container>
        </animated.div>
      </div>
    </div>
  );
}</content>