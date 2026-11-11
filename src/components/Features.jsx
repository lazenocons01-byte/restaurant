import React from 'react';
import {
  Sprout,
  ChefHat,
  Wine,
  BellRing,
  Truck,
  Heart,
  Sparkles,
  Award,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Sprout size={24} />,
      title: 'Farm-Fresh Ingredients',
      desc: 'We partner with organic regional farms and import DOP certified Italian cheeses and oils weekly.',
    },
    {
      icon: <ChefHat size={24} />,
      title: 'Master Italian Chefs',
      desc: 'Our culinary masters bring decades of heritage from Florence, Bologna, and Naples to your plate.',
    },
    {
      icon: <Wine size={24} />,
      title: 'Curated Wine Cellar',
      desc: 'Sommelier-selected collection of over 200 rare Italian vintages and prestigious European appellations.',
    },
    {
      icon: <BellRing size={24} />,
      title: 'Warm Italian Hospitality',
      desc: 'From custom dietary accommodations to personalized celebrations, every detail is handled with grace.',
    },
    {
      icon: <Truck size={24} />,
      title: 'Express Doorstep Delivery',
      desc: 'Experience our restaurant-caliber courses in your own dining room, sealed and delivered piping hot.',
    },
    {
      icon: <Heart size={24} />,
      title: 'Dietary Conscious',
      desc: 'Artisanal gluten-free hand-cut pastas, organic vegan risottos, and nut-allergy certified stations.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Private Dining & Events',
      desc: 'Intimate wine-cellar rooms and full-scale banquet services with bespoke tasting menus.',
    },
    {
      icon: <Award size={24} />,
      title: 'Michelin Recognized',
      desc: 'Consistently distinguished for culinary precision, service excellence, and dedication to terroir.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">
            The <em>La Bella</em> Experience
          </h2>
          <p className="section-desc">
            We are committed to delivering more than just a meal — we craft an unforgettable sensory voyage.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

