"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

const productCategories = [
  {
    title: "Food Products",
    image: "/assets/images/food.webp",
    href: "#foods",
    description:
      "We distribute a wide range of premium food products from world-renowned brands, ensuring that quality nourishment is always within reach of Nigerian consumers.",
    brands: ["Mars", "Snickers", "Bounty", "Twix", "M&M's", "Maltesers", "Galaxy", "KitKat"],
  },
  {
    title: "Beverages",
    image: "/assets/images/beverage.webp",
    href: "#beverages",
    description:
      "Our beverage portfolio includes refreshing drinks from top international brands, delivering quality and taste to consumers across Nigeria.",
    brands: ["Lucozade", "Ribena", "Powerhouse", "Schweppes", "Coca-Cola", "Fanta", "Sprite", "Eva Water"],
  },
  {
    title: "Non-Food Products",
    image: "/assets/images/non-food.webp",
    href: "#non-foods",
    description:
      "From personal care to household essentials, our non-food product range covers everyday needs with trusted global brands.",
    brands: ["Nivea", "Gillette", "Duracell", "Dettol", "Durex", "Air Wick", "Mortein", "Harpic"],
  },
];

const foodProducts = [
  { name: "Mars Bar", description: "Classic chocolate bar with nougat and caramel", image: "/assets/images/foods/foods-1.jpg" },
  { name: "Snickers", description: "Packed with roasted peanuts, nougat, and caramel", image: "/assets/images/foods/foods-2.jpg" },
  { name: "Bounty", description: "Coconut filled chocolate bar", image: "/assets/images/foods/foods-3.jpg" },
  { name: "Twix", description: "Caramel and biscuit finger bars", image: "/assets/images/foods/foods-4.jpg" },
  { name: "M&M's", description: "Colorful chocolate buttons with a crisp shell", image: "/assets/images/foods/foods-5.jpg" },
  { name: "Galaxy", description: "Smooth and silky milk chocolate", image: "/assets/images/foods/foods-6.jpg" },
];

const beverageProducts = [
  { name: "Lucozade", description: "Energy drink for active lifestyles", image: "/assets/images/beverages/bev-1.jpg" },
  { name: "Ribena", description: "Blackcurrant juice drink rich in Vitamin C", image: "/assets/images/beverages/bev-2.jpg" },
  { name: "Powerhouse", description: "Refreshing energy and sports drink", image: "/assets/images/beverages/bev-3.jpg" },
  { name: "Schweppes", description: "Premium carbonated mixers and soft drinks", image: "/assets/images/beverages/bev-4.jpg" },
];

const nonFoodProducts = [
  { name: "Nivea", description: "Trusted skincare and personal care products", image: "/assets/images/non-foods/nonfood-1.jpg" },
  { name: "Gillette", description: "Premium grooming and shaving products", image: "/assets/images/non-foods/nonfood-2.jpg" },
  { name: "Duracell", description: "Long-lasting batteries for all devices", image: "/assets/images/non-foods/nonfood-3.jpg" },
  { name: "Dettol", description: "Hygiene and antiseptic products", image: "/assets/images/non-foods/nonfood-4.jpg" },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/foods/foods-1.jpg"
          alt="Our Products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Products
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Brands We Distribute
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Quality products from world-renowned brands, delivered across
              Nigeria with excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Portfolio
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Product Categories
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We distribute a comprehensive range of FMCG products from
              internationally recognized brands, ensuring Nigerian consumers
              have access to the best quality products.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <AnimatedSection key={category.title}>
                <Link
                  href={category.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm card-hover"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <h3 className="absolute bottom-4 left-6 text-2xl font-bebas text-white tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.brands.slice(0, 4).map((brand) => (
                        <span
                          key={brand}
                          className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full"
                        >
                          {brand}
                        </span>
                      ))}
                      {category.brands.length > 4 && (
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          +{category.brands.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Food Products Detail */}
      <section id="foods" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Food Products
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Premium Chocolate & Confectionery
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-gray-600 max-w-3xl">
              As one of the leading distributors of Mars International products
              in Nigeria, we bring world-class chocolate and confectionery
              brands to Nigerian consumers. Our partnership ensures authentic
              products reach every retail outlet across the nation.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodProducts.map((product) => (
              <AnimatedSection key={product.name}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bebas text-primary tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Beverages Detail */}
      <section id="beverages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Beverages
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Refreshing Drinks for Every Occasion
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-gray-600 max-w-3xl">
              Our beverage portfolio features some of the world&apos;s most
              popular drink brands. From energy drinks to fruit juices, we
              ensure that Nigerian consumers have access to refreshing and
              nutritious beverages.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beverageProducts.map((product) => (
              <AnimatedSection key={product.name}>
                <div className="bg-cream rounded-2xl overflow-hidden shadow-sm card-hover group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bebas text-primary tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Food Products Detail */}
      <section id="non-foods" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Non-Food Products
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Personal Care & Household Essentials
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-gray-600 max-w-3xl">
              Beyond food and beverages, we distribute a comprehensive range of
              personal care, grooming, and household products from globally
              trusted brands that consumers rely on every day.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nonFoodProducts.map((product) => (
              <AnimatedSection key={product.name}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bebas text-primary tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Interested in Our Products?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you are a retailer, distributor, or consumer looking for
            specific products, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Get in Touch <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>
    </>
  );
}
