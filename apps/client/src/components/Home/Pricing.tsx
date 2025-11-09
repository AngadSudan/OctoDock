"use client";
import React, { useRef, useId, useEffect } from "react";
import type { CSSProperties } from "react";
import { animate, useMotionValue } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import { Check, X, Zap, Shield, Cpu } from "lucide-react";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResponsiveImage {
  src: string;
  alt?: string;
  srcSet?: string;
}

interface AnimationConfig {
  preview?: boolean;
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  type?: "preset" | "custom";
  presetIndex?: number;
  customImage?: ResponsiveImage;
  sizing?: "fill" | "stretch";
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  if (fromLow === fromHigh) {
    return toLow;
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  const instanceId = `shadowoverlay-${cleanId}`;
  return instanceId;
};

function CyberpunkPricingCard({
  tier,
  price,
  description,
  features,
  highlighted = false,
  icon: Icon,
  link,
}: {
  tier: string;
  price: string;
  description: string;
  features: { text: string; included: boolean }[];
  highlighted?: boolean;
  icon: any;
  link?: string;
}) {
  const router = useNavigate();
  const handleClick = () => {
    if (link) {
      router("/payment-checkout" + link);
    }
  };
  return (
    <div className={cn("relative group", highlighted && "scale-105 z-10")}>
      {/* Glow effect for highlighted card */}
      {highlighted && (
        <div className="absolute inset-0 bg-red-400/20 rounded-xl blur-xl animate-pulse" />
      )}

      <div
        className={cn(
          "relative bg-black/80 backdrop-blur-md border rounded-xl p-8 transition-all duration-500",
          highlighted
            ? "border-red-400/60 shadow-lg shadow-red-400/25"
            : "border-red-400/30 hover:border-red-400/50"
        )}
      >
        {/* Status indicator */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "p-2 rounded-lg border transition-colors duration-300",
                highlighted
                  ? "bg-red-400/10 border-red-400/40"
                  : "bg-red-400/5 border-red-400/20"
              )}
            >
              <Icon
                size={24}
                className={cn(
                  "transition-colors duration-300",
                  highlighted ? "text-red-400" : "text-red-400/70"
                )}
              />
            </div>
            <div>
              <div className="text-red-400/70 font-mono text-xs tracking-wider">
                TIER
              </div>
              <div
                className={cn(
                  "font-mono text-lg font-bold tracking-wide transition-colors duration-300",
                  highlighted ? "text-red-400" : "text-red-400/80"
                )}
              >
                {tier}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              highlighted ? "bg-red-400 animate-pulse" : "bg-red-400/50"
            )}
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <div onClick={handleClick} className="flex items-baseline space-x-2">
            <span className="text-5xl font-bold text-white">{price}</span>
            {price !== "FREE" && (
              <span className="text-gray-400 font-mono text-sm">/month</span>
            )}
          </div>
          <div className="text-gray-400 font-mono text-sm mt-2">
            {description}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className={cn(
            "w-full py-3 px-6 rounded-lg font-mono text-sm font-bold tracking-wide transition-all duration-300 mb-8",
            highlighted
              ? "bg-red-400 text-black hover:bg-red-500 shadow-lg shadow-red-400/25"
              : "bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 hover:border-red-400/50"
          )}
        >
          {highlighted ? "UPGRADE NOW" : "SELECT TIER"}
        </button>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={cn(
                  "mt-0.5 rounded-full p-0.5",
                  feature.included ? "bg-red-400/20" : "bg-gray-700/20"
                )}
              >
                {feature.included ? (
                  <Check size={14} className="text-red-400" />
                ) : (
                  <X size={14} className="text-gray-600" />
                )}
              </div>
              <span
                className={cn(
                  "font-mono text-sm leading-relaxed",
                  feature.included ? "text-gray-300" : "text-gray-600"
                )}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-400/20 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-400/20 rounded-bl-lg" />
      </div>
    </div>
  );
}

export default function Pricing({
  sizing = "fill",
  color = "#ef4444",
  animation = { scale: 50, speed: 50 },
  noise = { opacity: 0.15, scale: 1 },
  style,
  className,
}: ShadowOverlayProps) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

  const displacementScale = animation
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0;
  const animationDuration = animation
    ? mapRange(animation.speed, 1, 100, 1000, 50)
    : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }

      hueRotateMotionValue.set(0);
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        ease: "linear",
        delay: 0,
        onUpdate: (value: number) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute("values", String(value));
          }
        },
      });

      return () => {
        if (hueRotateAnimation.current) {
          hueRotateAnimation.current.stop();
        }
      };
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  const pricingData = [
    {
      tier: "BASIC",
      price: "FREE",
      description: "Personal projects & exploration",
      icon: Zap,
      highlighted: false,
      features: [
        { text: "Core functionality access", included: true },
        { text: "Community support", included: true },
        { text: "Basic analytics", included: true },
        { text: "Advanced integrations", included: false },
        { text: "Priority processing", included: false },
        { text: "Team collaboration", included: false },
      ],
    },
    {
      tier: "PRO",
      price: "$29",
      description: "Teams & production deployments",
      icon: Shield,
      highlighted: true,
      link: "?plan=pro",
      features: [
        { text: "All Basic features", included: true },
        { text: "Advanced integrations", included: true },
        { text: "Priority processing", included: true },
        { text: "Team collaboration (5 users)", included: true },
        { text: "Advanced analytics", included: true },
        { text: "24/7 dedicated support", included: false },
      ],
    },
    {
      tier: "ENTERPRISE",
      price: "$99",
      description: "Large-scale operations",
      icon: Cpu,
      highlighted: false,
      link: "?plan=enterprise",
      features: [
        { text: "All Pro features", included: true },
        { text: "Unlimited team members", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Custom integrations", included: true },
        { text: "SLA guarantee", included: true },
        { text: "On-premise deployment", included: true },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-black",
        className
      )}
      style={style}
    >
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={`${id}-noise`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.6 * (noise?.scale || 1)}
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          {animationEnabled && (
            <filter id={`${id}-animation`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="2"
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  dur={`${animationDuration / 1000}s`}
                  values="0.01;0.02;0.01"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale={displacementScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feColorMatrix
                ref={feColorMatrixRef}
                type="hueRotate"
                values="0"
              />
            </filter>
          )}
        </defs>
      </svg>

      {/* Animated filter overlay */}
      {animationEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: `url(#${id}-animation)`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-4 py-2">
              <div className="text-red-400 font-mono text-sm tracking-[0.2em]">
                ▲ PRICING MATRIX ▲
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-mono tracking-tight">
            SYSTEM ACCESS
          </h1>

          <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>

          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-4 py-2">
              <div className="text-red-400/70 font-mono text-xs">
                SYS.STATUS
              </div>
              <div className="text-red-400 font-mono text-sm font-bold">
                OPERATIONAL
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-4 py-2">
              <div className="text-red-400/70 font-mono text-xs">
                USERS.ACTIVE
              </div>
              <div className="text-red-400 font-mono text-sm font-bold">
                10.2K
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.map((plan, index) => (
            <CyberpunkPricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Footer text */}
        <div className="text-center mt-16">
          <div className="text-red-400/60 font-mono text-sm tracking-[0.2em] animate-pulse">
            ▼ SECURE PAYMENT PROCESSING ▼
          </div>
        </div>
      </div>

      {/* Noise overlay */}
      {noise && noise.opacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: `url(#${id}-noise)`,
            opacity: noise.opacity,
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
          }
        }

        .cn {
          /* Utility function placeholder */
        }
      `}</style>
    </div>
  );
}
