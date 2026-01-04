'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

/* ---------- FIX LEAFLET ICONS ---------- */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ---------- TYPES ---------- */
type Employee = {
  id: string;
  name: string;
  role: string;
  country: string;
  bio: string;
  image: string;
  lat: number;
  lng: number;
};

/* ---------- DATA ---------- */
const employees: Employee[] = [
  {
    id: 'yash',
    name: 'Yash Kumar',
    role: 'Founder',
    country: 'Stockholm, Sweden',
    bio: '5+ years of experience in Growth Marketing Ex-Amazon, Tata Group',
    image: '/team/yash1.jpeg',
    lat: 59.3293,     
    lng: 18.0686,
  },
  {
    id: 'Kjartan ',
    name: 'Kjartan Monstad',
    role: 'Co-Founder',
    country: 'Norway',
    bio: '2+ years of experience working in Top Nordic Banks',
    image: '/team/Kjartan.png',
    lat: 59.9139,     
    lng: 10.7522,
  },
  {
  id: 'india',
  name: 'Umarfarook Gurramkonda',
  role: 'Machine Learning Engineer',
  country: 'India',
  bio: 'Machine Learning Engineer with 1+ years of experience in designing, developing, and deploying scalable machine learning solutions for real-world business problems.',
  image: '/team/umar.jpg',
  lat: 15.9129,   
  lng: 79.7400,
},

 {
  id: 'maharashtra',
  name: 'Yash Malviya',
  role: 'Machine Learning Engineer',
  country: 'India',
  bio: 'Served as a Machine Learning Engineer, contributing to data-driven model development, experimentation, and deployment of intelligent systems.',
  image: '/team/Dhruv.png',
  lat: 19.7515,   
  lng: 75.7139,
},
{
  id: 'Taha',
  name: 'Taha Ansari',
  role: 'Marketing Strategist',
  country: 'United Arab Emirates',
  bio: 'The mind behind the message - turning data, creativity, and insight into strategies that make Hypeon.AI impossible to ignore.',
  image: '/team/Taha.png',
  lat: 25.2048,   // Dubai latitude
  lng: 55.2708,   // Dubai longitude
},
{
  id: 'Doaa',
  name: 'Doaa Kamal',
  role: 'Marketing Strategist',
  country: 'United Arab Emirates',
  bio: 'Leading Hypeon’s digital marketing vision, turning insight and innovation into scalable growth',
  image: '/team/Taha.png',
  lat: 25.2048,   // Dubai latitude
  lng: 55.2708,   // Dubai longitude
},
{
  id: 'aditya',
  name: 'Aditya Karer',
  role: 'Product Manager',
  country: 'Sweden',
  bio: 'Building products that solve real problems, scale with purpose, and deliver measurable value.',
  image: '/team/Aditya.png',
  lat: 59.3293,   // Stockholm latitude
  lng: 18.0686,   // Stockholm longitude
},

{
  id: 'xinyi',
  name: 'Xinyi Lu',
  role: 'Business Data Analyst ',
  country: 'Sweden',
  bio: 'Experience working with e-commerce and consumer platform data to support product, growth, and operational insights.',
  image: '/team/xinyi.jpeg',
  lat: 60.1282,   // Sweden (country-level center)
  lng: 18.6435,
}

];
/* ---------- OFFSET NEARBY MARKERS ---------- */
function getOffsetPosition(
  emp: Employee,
  index: number
): [number, number] {
  // Offset only for dense regions (like Sweden)
  if (emp.country === 'Sweden') {
    const OFFSET = 0.35;
    return [
      emp.lat + index * OFFSET,
      emp.lng + index * OFFSET,
    ];
  }

  return [emp.lat, emp.lng];
}


/* ---------- CUSTOM PHOTO PIN ---------- */
function employeePin(emp: Employee) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        transform: translateY(-4px);
        font-family: Inter, system-ui;
      ">
        <div style="
          position: relative;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg,#ec4899,#f43f5e);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 12px 28px rgba(236,72,153,.38);
          border: 2.5px solid #fff;
        ">
          <div style="
            position:absolute;
            inset:5px;
            background:white;
            border-radius:50%;
            overflow:hidden;
            transform: rotate(45deg);
          ">
            <img src="${emp.image}" style="width:100%;height:100%;object-fit:cover;" />
          </div>
        </div>

        <div style="
          margin-top:8px;
          background:rgba(255,255,255,.95);
          padding:6px 12px;
          border-radius:14px;
          text-align:center;
          box-shadow:0 10px 30px rgba(15,23,42,.12);
          white-space:nowrap;
        ">
          <div style="font-size:13px;font-weight:600;color:#0f172a;">
            ${emp.name}
          </div>
          <div style="font-size:11px;color:#64748b;">
            ${emp.country}
          </div>
        </div>
      </div>
    `,
    iconSize: [96, 110],
    iconAnchor: [48, 100],
    popupAnchor: [0, -100],
  });
}

/* ---------- MAP CONTROLLER ---------- */
function MapController({
  active,
  markerRefs,
}: {
  active: Employee | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!active) {
      map.flyTo([20, 0], 2, { duration: 1.2 });
      return;
    }

    map.flyTo([active.lat, active.lng], 5, { duration: 1.4 });

    map.once('moveend', () => {
      markerRefs.current[active.id]?.openPopup();
    });
  }, [active, map, markerRefs]);

  return null;
}

/* ---------- COMPONENT ---------- */
export default function TeamGlobalMap() {
  const [active, setActive] = useState<Employee | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({}); 

  return (
    <section className="py-32 bg-gradient-to-br from-pink-50/40 via-white to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-slate-900">
            Team Behind <span className="text-pink-600">HypeOn AI</span>
          </h2>
          <p className="mt-4 text-slate-600">
            A globally distributed team building the decision layer for e-commerce.
          </p>
        </div>

        <div className="relative h-[520px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
          <MapContainer
  center={[20, 0]}
  zoom={2}
  scrollWheelZoom={false}
  attributionControl={false}   
  style={{ height: '100%', width: '100%' }}
>

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap & CartoDB"
            />

            <MapController active={active} markerRefs={markerRefs} />

            {employees.map((emp, index) => {
  const [lat, lng] = getOffsetPosition(emp, index);

  return (
    <Marker
      key={emp.id}
      position={[lat, lng]}
      icon={employeePin(emp)}
      ref={(ref) => {
        if (ref) markerRefs.current[emp.id] = ref;
      }}
      eventHandlers={{ click: () => setActive(emp) }}
    >
      {active?.id === emp.id && (
        <Popup closeButton={false} autoClose={false}>
          <div className="relative w-64">
            <button
              onClick={() => setActive(null)}
              className="absolute right-2 top-2 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <Image
                src={emp.image}
                alt={emp.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-slate-900">
                  {emp.name}
                </p>
                <p className="text-xs text-slate-500">
                  {emp.role}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {emp.bio}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {emp.country}
            </p>
          </div>
        </Popup>
      )}
    </Marker>
  );
})}

          </MapContainer>
        </div>
      </div>
    </section>
  );
}
