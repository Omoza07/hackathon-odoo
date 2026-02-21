export interface Vehicle {
  id: string
  name: string
  licensePlate: string
  model: string
  year: number
  type: 'truck' | 'van' | 'car'
  status: 'active' | 'maintenance' | 'idle'
  fuelLevel: number
  mileage: number
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  location: { lat: number; lng: number }
  currentDriver?: string
  capacity: number
  utilization: number
  health: number
}

export interface Driver {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  status: 'active' | 'off-duty' | 'on-break'
  totalTrips: number
  totalMiles: number
  safetyScore: number
  rating: number
  tripsThisMonth: number
  accidents: number
  violations: number
  hoursWorked: number
}

export interface Trip {
  id: string
  vehicleId: string
  driverId: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  startLocation: { lat: number; lng: number; address: string }
  endLocation: { lat: number; lng: number; address: string }
  scheduledStart: string
  actualStart?: string
  estimatedEnd?: string
  actualEnd?: string
  distance: number
  estimatedDuration: number
  cargoType: string
  cargoWeight: number
  revenue: number
  efficiency: number
}

export interface MaintenanceAlert {
  id: string
  vehicleId: string
  type: 'oil-change' | 'tire-rotation' | 'inspection' | 'repair' | 'warning'
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  cost?: number
  createdAt: string
}

export interface Analytics {
  totalTrips: number
  completedTrips: number
  totalDistance: number
  averageEfficiency: number
  fuelCost: number
  revenue: number
  activeVehicles: number
  safetyIncidents: number
  maintenanceCost: number
  totalUtilization: number
}

export const vehicles: Vehicle[] = [
  {
    id: 'v001',
    name: 'Truck Delhi Express',
    licensePlate: 'DL-01-AA-1001',
    model: 'Tata 2523 TC',
    year: 2022,
    type: 'truck',
    status: 'active',
    fuelLevel: 85,
    mileage: 72900,
    lastMaintenanceDate: '2025-01-15',
    nextMaintenanceDate: '2025-04-15',
    location: { lat: 28.6139, lng: 77.209 },
    currentDriver: 'd001',
    capacity: 2500,
    utilization: 92,
    health: 95,
  },
  {
    id: 'v002',
    name: 'Van Mumbai Swift',
    licensePlate: 'MH-02-AB-2002',
    model: 'Ashok Leyland Dost',
    year: 2023,
    type: 'van',
    status: 'active',
    fuelLevel: 72,
    mileage: 45670,
    lastMaintenanceDate: '2025-01-20',
    nextMaintenanceDate: '2025-04-20',
    location: { lat: 19.0760, lng: 72.8777 },
    currentDriver: 'd002',
    capacity: 1200,
    utilization: 85,
    health: 98,
  },
  {
    id: 'v003',
    name: 'Truck Bangalore Premium',
    licensePlate: 'KA-03-AC-3003',
    model: 'Swaraj Mazda T3000',
    year: 2021,
    type: 'truck',
    status: 'maintenance',
    fuelLevel: 45,
    mileage: 99500,
    lastMaintenanceDate: '2024-12-10',
    nextMaintenanceDate: '2025-03-10',
    location: { lat: 12.9716, lng: 77.5946 },
    capacity: 2800,
    utilization: 0,
    health: 72,
  },
  {
    id: 'v004',
    name: 'Van Kolkata Connect',
    licensePlate: 'WB-04-AD-4004',
    model: 'Mahindra Bolero Pik-Up',
    year: 2023,
    type: 'van',
    status: 'active',
    fuelLevel: 91,
    mileage: 25180,
    lastMaintenanceDate: '2025-01-25',
    nextMaintenanceDate: '2025-04-25',
    location: { lat: 22.5726, lng: 88.3639 },
    currentDriver: 'd003',
    capacity: 1000,
    utilization: 78,
    health: 99,
  },
  {
    id: 'v005',
    name: 'Truck Hyderabad Fleet',
    licensePlate: 'TG-05-AE-5005',
    model: 'Force Traveller 3350',
    year: 2022,
    type: 'truck',
    status: 'idle',
    fuelLevel: 30,
    mileage: 62400,
    lastMaintenanceDate: '2025-01-10',
    nextMaintenanceDate: '2025-04-10',
    location: { lat: 17.3850, lng: 78.4867 },
    capacity: 2400,
    utilization: 0,
    health: 88,
  },
]

export const drivers: Driver[] = [
  {
    id: 'd001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@fleetflow.com',
    phone: '+91 98765 43210',
    licenseNumber: 'DL-2019-001',
    status: 'active',
    totalTrips: 342,
    totalMiles: 137400,
    safetyScore: 96,
    rating: 4.8,
    tripsThisMonth: 28,
    accidents: 0,
    violations: 0,
    hoursWorked: 480,
  },
  {
    id: 'd002',
    name: 'Priya Sharma',
    email: 'priya.sharma@fleetflow.com',
    phone: '+91 98765 43211',
    licenseNumber: 'DL-2018-045',
    status: 'active',
    totalTrips: 389,
    totalMiles: 164000,
    safetyScore: 98,
    rating: 4.9,
    tripsThisMonth: 32,
    accidents: 0,
    violations: 0,
    hoursWorked: 520,
  },
  {
    id: 'd003',
    name: 'Arun Patel',
    email: 'arun.patel@fleetflow.com',
    phone: '+91 98765 43212',
    licenseNumber: 'DL-2020-082',
    status: 'on-break',
    totalTrips: 156,
    totalMiles: 67700,
    safetyScore: 92,
    rating: 4.6,
    tripsThisMonth: 12,
    accidents: 1,
    violations: 0,
    hoursWorked: 320,
  },
  {
    id: 'd004',
    name: 'Neha Singh',
    email: 'neha.singh@fleetflow.com',
    phone: '+91 98765 43213',
    licenseNumber: 'DL-2017-034',
    status: 'off-duty',
    totalTrips: 421,
    totalMiles: 206800,
    safetyScore: 94,
    rating: 4.7,
    tripsThisMonth: 0,
    accidents: 0,
    violations: 1,
    hoursWorked: 0,
  },
  {
    id: 'd005',
    name: 'Vikram Desai',
    email: 'vikram.desai@fleetflow.com',
    phone: '+91 98765 43214',
    licenseNumber: 'DL-2021-056',
    status: 'active',
    totalTrips: 287,
    totalMiles: 122400,
    safetyScore: 89,
    rating: 4.5,
    tripsThisMonth: 25,
    accidents: 1,
    violations: 1,
    hoursWorked: 440,
  },
]

export const trips: Trip[] = [
  {
    id: 't001',
    vehicleId: 'v001',
    driverId: 'd001',
    status: 'in-progress',
    startLocation: {
      lat: 28.6139,
      lng: 77.209,
      address: 'Delhi Central Warehouse',
    },
    endLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: 'Ghaziabad Distribution Hub',
    },
    scheduledStart: '2025-02-21T08:00:00Z',
    actualStart: '2025-02-21T08:15:00Z',
    estimatedEnd: '2025-02-21T10:30:00Z',
    distance: 56,
    estimatedDuration: 2.5,
    cargoType: 'Electronics',
    cargoWeight: 2200,
    revenue: 8500,
    efficiency: 94,
  },
  {
    id: 't002',
    vehicleId: 'v002',
    driverId: 'd002',
    status: 'completed',
    startLocation: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Mumbai Central Hub',
    },
    endLocation: {
      lat: 19.2183,
      lng: 72.9781,
      address: 'Mumbai Navi Warehouse',
    },
    scheduledStart: '2025-02-21T06:00:00Z',
    actualStart: '2025-02-21T06:05:00Z',
    estimatedEnd: '2025-02-21T08:00:00Z',
    actualEnd: '2025-02-21T07:55:00Z',
    distance: 24,
    estimatedDuration: 2,
    cargoType: 'Furniture',
    cargoWeight: 1100,
    revenue: 5200,
    efficiency: 98,
  },
  {
    id: 't003',
    vehicleId: 'v004',
    driverId: 'd003',
    status: 'scheduled',
    startLocation: {
      lat: 22.5726,
      lng: 88.3639,
      address: 'Kolkata Warehouse',
    },
    endLocation: {
      lat: 22.6345,
      lng: 88.4405,
      address: 'Howrah Distribution Center',
    },
    scheduledStart: '2025-02-21T14:00:00Z',
    estimatedEnd: '2025-02-21T16:30:00Z',
    distance: 40,
    estimatedDuration: 2.5,
    cargoType: 'Perishables',
    cargoWeight: 850,
    revenue: 6000,
    efficiency: 0,
  },
]

export const maintenanceAlerts: MaintenanceAlert[] = [
  {
    id: 'ma001',
    vehicleId: 'v003',
    type: 'oil-change',
    severity: 'critical',
    description: 'Oil change overdue - scheduled maintenance required',
    dueDate: '2025-02-15',
    status: 'in-progress',
    cost: 4500,
    createdAt: '2025-02-10',
  },
  {
    id: 'ma002',
    vehicleId: 'v001',
    type: 'tire-rotation',
    severity: 'medium',
    description: 'Tire rotation recommended for even wear',
    dueDate: '2025-03-15',
    status: 'pending',
    cost: 6200,
    createdAt: '2025-02-20',
  },
  {
    id: 'ma003',
    vehicleId: 'v005',
    type: 'inspection',
    severity: 'high',
    description: 'Annual safety inspection required',
    dueDate: '2025-02-28',
    status: 'pending',
    cost: 8700,
    createdAt: '2025-02-01',
  },
  {
    id: 'ma004',
    vehicleId: 'v002',
    type: 'warning',
    severity: 'low',
    description: 'Brake fluid replacement scheduled',
    dueDate: '2025-04-01',
    status: 'pending',
    createdAt: '2025-02-15',
  },
]

export const analytics: Analytics = {
  totalTrips: 1247,
  completedTrips: 1198,
  totalDistance: 45700,
  averageEfficiency: 94.2,
  fuelCost: 425000,
  revenue: 2850000,
  activeVehicles: 3,
  safetyIncidents: 2,
  maintenanceCost: 195000,
  totalUtilization: 86,
}
