import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  varying float vElevation;
  varying float vDepth;

  void main() {
    vec3 pos = position;
    float e = sin(pos.x * 0.32 + uTime * 0.7) * cos(pos.z * 0.28 + uTime * 0.55) * 1.25;
    e += sin((pos.x + pos.z) * 0.16 + uTime * 0.35) * 0.7;
    pos.y += e;
    vElevation = e;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mv.z;
    gl_PointSize = uSize * (18.0 / max(vDepth, 0.1));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vElevation;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float circle = smoothstep(0.5, 0.08, d);
    float fade = smoothstep(44.0, 10.0, vDepth);
    vec3 deep = vec3(0.04, 0.22, 0.27);
    vec3 bright = vec3(0.22, 0.93, 1.0);
    vec3 color = mix(deep, bright, smoothstep(-1.7, 1.9, vElevation));

    gl_FragColor = vec4(color, circle * fade * 0.9);
  }
`;

/** Generative particle-wave field behind the hero. ~zero network cost vs a 27MB video. */
const ThreeHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL: the CSS gradient backdrop stays
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      200
    );
    camera.position.set(0, 5.5, 15);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    mount.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 70 : 120;
    const rows = isMobile ? 44 : 64;
    const spacing = 0.55;

    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i++] = (x - cols / 2) * spacing;
        positions[i++] = 0;
        positions[i++] = (z - rows / 2) * spacing;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: (isMobile ? 2.6 : 3.2) * Math.min(window.devicePixelRatio, 2) },
      },
    });

    const points = new THREE.Points(geometry, material);
    points.position.y = -1.5;
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const tick = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (5.5 - mouse.y * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.5, -2);
      renderer.render(scene, camera);
      if (running) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const setRunning = (value: boolean) => {
      if (value === running) return;
      running = value;
      if (running) {
        clock.start();
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    io.observe(mount);

    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
};

export default ThreeHero;
