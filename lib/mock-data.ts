/* ================= INTERFACES ================= */

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

/* ================= VEHICLES ================= */

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
    location: { lat: 19.076, lng: 72.8777 },
    currentDriver: 'd001',
    capacity: 1200,
    utilization: 85,
    health: 98,
  }
]

/* ================= DRIVERS ================= */

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
  }
]

/* ================= TRIPS ================= */

export const trips: Trip[] = [
  {
    id: 't001',
    vehicleId: 'v001',
    driverId: 'd001',
    status: 'scheduled',
    startLocation: { lat: 28.6139, lng: 77.209, address: 'Delhi Warehouse' },
    endLocation: { lat: 19.076, lng: 72.8777, address: 'Mumbai Hub' },
    scheduledStart: '2026-02-22T08:00:00Z',
    estimatedEnd: '2026-02-23T02:00:00Z',
    distance: 1400,
    estimatedDuration: 18,
    cargoType: 'Electronics',
    cargoWeight: 1200,
    revenue: 85000,
    efficiency: 93,
  }
]

/* ================= MAINTENANCE ================= */

export const maintenanceAlerts: MaintenanceAlert[] = [
  {
    id: 'm001',
    vehicleId: 'v001',
    type: 'oil-change',
    severity: 'medium',
    description: 'Engine oil replacement due',
    dueDate: '2026-03-01',
    status: 'pending',
    cost: 6000,
    createdAt: '2026-02-18',
  }
]

/* ================= ANALYTICS ================= */

export const analytics: Analytics = {
  totalTrips: 1247,
  completedTrips: 1198,
  totalDistance: 45700,
  averageEfficiency: 94.2,
  fuelCost: 425000,
  revenue: 2850000,
  activeVehicles: 2,
  safetyIncidents: 2,
  maintenanceCost: 195000,
  totalUtilization: 86,
}