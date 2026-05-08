import React, { useEffect, useRef } from 'react';
import { useOSStore } from '../../store/os';
import * as THREE from 'three';
import FOG from 'vanta/src/vanta.fog';
import NET from 'vanta/src/vanta.net';
import GLOBE from 'vanta/src/vanta.globe';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const BackgroundManager: React.FC = () => {
  const activeBackground = useOSStore(state => state.activeBackground);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [init, setInit] = React.useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (!vantaRef.current) return;

    // Destroy previous vanta effect
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    }

    if (activeBackground === 'vanta-net') {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x00f0ff,
        backgroundColor: 0x0a0e17,
        points: 15.00,
        maxDistance: 25.00,
        spacing: 20.00
      });
    } else if (activeBackground === 'vanta-fog') {
       vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE: THREE,
        highlightColor: 0x00f0ff,
        midtoneColor: 0xff00ff,
        lowlightColor: 0x121826,
        baseColor: 0x0a0e17,
        blurFactor: 0.90,
        zoom: 0.50,
        speed: 1.50
      });
    } else if (activeBackground === 'vanta-globe') {
       vantaEffect.current = GLOBE({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x00f0ff,
        color2: 0xff00ff,
        backgroundColor: 0x0a0e17,
        size: 1.2
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [activeBackground]);

  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-base-100">
      {/* Vanta Container */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full" />

      {/* tsParticles Container */}
      {init && activeBackground === 'particles' && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "#0a0e17" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: ["#00f0ff", "#ff00ff"] },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "bounce" },
              },
              number: { density: { enable: true }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};
