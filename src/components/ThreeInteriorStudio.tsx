import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MaterialFinish, Scene3DConfig } from '../types';
import { Sparkles, RotateCw, Layers, Sun, Moon, Info, Eye } from 'lucide-react';

const MATERIAL_FINISHES: MaterialFinish[] = [
  {
    id: 'statuario-walnut',
    name: 'Statuario & Smoked Walnut',
    description: 'Italian Statuario marble with rich smoked walnut fluted paneling and brushed gold accents.',
    primaryColor: '#f0ede6',
    accentColor: '#362419',
    roughness: 0.25,
    metalness: 0.1,
    wallColor: '#2b231c',
    cabinetColor: '#251b14',
    accentMetalColor: '#d4af37',
  },
  {
    id: 'teak-champagne',
    name: 'Teak & Champagne Brass',
    description: 'Warm indigenous Assam teakwood with travertine textures and champagne satin metal.',
    primaryColor: '#8a5229',
    accentColor: '#d9c298',
    roughness: 0.35,
    metalness: 0.2,
    wallColor: '#241a12',
    cabinetColor: '#633b1c',
    accentMetalColor: '#e0c068',
  },
  {
    id: 'graphite-oak',
    name: 'Matte Graphite & European Oak',
    description: 'Ultra-matte anti-fingerprint charcoal surfaces with light architectural natural oak.',
    primaryColor: '#24272c',
    accentColor: '#bfa07e',
    roughness: 0.45,
    metalness: 0.15,
    wallColor: '#1c1f24',
    cabinetColor: '#1b1d22',
    accentMetalColor: '#a6a9b0',
  },
];

const SCENES: Scene3DConfig[] = [
  {
    id: 'living',
    title: 'Luxury Media Wall & Lounge',
    description: 'Fluted wood paneling, floating marble TV slab with concealed warm LED cove and gold chandelier.',
    cameraPos: [0, 2.5, 6],
    targetPos: [0, 1.8, 0],
  },
  {
    id: 'kitchen',
    title: 'Modular Kitchen & Island',
    description: 'Waterfall quartz island, matte cabinetry with Blum-grade soft-close hardware & pendant lighting.',
    cameraPos: [0, 3, 5.5],
    targetPos: [0, 1.5, 0],
  },
  {
    id: 'bedroom',
    title: 'Master Suite & Backlit Jali',
    description: 'Authentic Guwahati suite execution: custom backlit geometric CNC headboard & floor-to-ceiling wardrobe.',
    cameraPos: [0, 2.8, 5.8],
    targetPos: [0, 1.6, 0],
  },
];

export const ThreeInteriorStudio: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedScene, setSelectedScene] = useState<'living' | 'kitchen' | 'bedroom'>('living');
  const [selectedFinish, setSelectedFinish] = useState<MaterialFinish>(MATERIAL_FINISHES[0]);
  const [lightingMode, setLightingMode] = useState<'warm' | 'daylight' | 'mood'>('warm');
  const [isExploded, setIsExploded] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    currentMeshGroup: THREE.Group;
    lights: {
      ambient: THREE.AmbientLight;
      mainLight: THREE.DirectionalLight;
      coveLight: THREE.PointLight;
      spotLight: THREE.SpotLight;
      ceilingRings?: THREE.Group;
    };
    explodedObjects: { mesh: THREE.Object3D; originalPos: THREE.Vector3; explodedPos: THREE.Vector3 }[];
  } | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Test WebGL capability
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch {
      setIsWebGLSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1117);
    scene.fog = new THREE.FogExp2(0x0e1117, 0.05);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controls.target.set(0, 1.8, 0);

    // Lighting setup
    const ambient = new THREE.AmbientLight(0xffeedd, 0.6);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    const coveLight = new THREE.PointLight(0xffb84d, 2.0, 8);
    coveLight.position.set(0, 2.8, 0.5);
    scene.add(coveLight);

    const spotLight = new THREE.SpotLight(0xffecd2, 2.5);
    spotLight.position.set(0, 4.5, 2);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    const currentMeshGroup = new THREE.Group();
    scene.add(currentMeshGroup);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      currentMeshGroup,
      lights: { ambient, mainLight, coveLight, spotLight },
      explodedObjects: [],
    };

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !threeRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Scene Geometry whenever scene or finish changes
  useEffect(() => {
    if (!threeRef.current) return;
    const { scene, currentMeshGroup, camera, controls } = threeRef.current;

    // Clear previous room models
    while (currentMeshGroup.children.length > 0) {
      const obj = currentMeshGroup.children[0];
      currentMeshGroup.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }
    threeRef.current.explodedObjects = [];

    // Materials
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f2229,
      roughness: 0.3,
      metalness: 0.1,
    });

    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFinish.wallColor),
      roughness: 0.7,
      metalness: 0.05,
    });

    const primaryMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFinish.primaryColor),
      roughness: selectedFinish.roughness,
      metalness: selectedFinish.metalness,
    });

    const cabinetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFinish.cabinetColor),
      roughness: 0.4,
      metalness: 0.1,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFinish.accentMetalColor),
      roughness: 0.2,
      metalness: 0.85,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: lightingMode === 'warm' ? 0xffb347 : lightingMode === 'daylight' ? 0xffffff : 0xff9900,
    });

    // Room boundaries (Floor, Back Wall, Ceiling)
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    currentMeshGroup.add(floorMesh);

    const backWallGeo = new THREE.PlaneGeometry(8, 4.5);
    const backWallMesh = new THREE.Mesh(backWallGeo, wallMat);
    backWallMesh.position.set(0, 2.25, -2.5);
    backWallMesh.receiveShadow = true;
    currentMeshGroup.add(backWallMesh);

    const ceilingGeo = new THREE.PlaneGeometry(8, 8);
    const ceilingMesh = new THREE.Mesh(ceilingGeo, wallMat);
    ceilingMesh.position.set(0, 4.5, 0);
    ceilingMesh.rotation.x = Math.PI / 2;
    currentMeshGroup.add(ceilingMesh);

    // Room Specific Assets
    if (selectedScene === 'living') {
      // 1. Vertical Fluted Paneling on Wall
      const flutedGroup = new THREE.Group();
      for (let i = -3.2; i <= 3.2; i += 0.18) {
        const slatGeo = new THREE.BoxGeometry(0.08, 3.8, 0.06);
        const slatMesh = new THREE.Mesh(slatGeo, cabinetMat);
        slatMesh.position.set(i, 2.2, -2.42);
        slatMesh.castShadow = true;
        flutedGroup.add(slatMesh);
      }
      currentMeshGroup.add(flutedGroup);

      // 2. Large Italian Marble TV Slab
      const marbleSlabGeo = new THREE.BoxGeometry(3.6, 2.2, 0.08);
      const marbleSlabMesh = new THREE.Mesh(marbleSlabGeo, primaryMat);
      marbleSlabMesh.position.set(0, 2.3, -2.3);
      marbleSlabMesh.castShadow = true;
      marbleSlabMesh.receiveShadow = true;
      currentMeshGroup.add(marbleSlabMesh);

      // Backlit LED strip behind slab
      const glowSlabGeo = new THREE.BoxGeometry(3.7, 2.3, 0.02);
      const glowSlabMesh = new THREE.Mesh(glowSlabGeo, glowMat);
      glowSlabMesh.position.set(0, 2.3, -2.35);
      currentMeshGroup.add(glowSlabMesh);

      // Television Screen
      const tvScreenGeo = new THREE.BoxGeometry(2.4, 1.4, 0.04);
      const tvScreenMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.1, metalness: 0.8 });
      const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMat);
      tvScreen.position.set(0, 2.4, -2.22);
      currentMeshGroup.add(tvScreen);

      // 3. Floating Modular Media Console
      const consoleGeo = new THREE.BoxGeometry(4.2, 0.45, 0.55);
      const consoleMesh = new THREE.Mesh(consoleGeo, cabinetMat);
      consoleMesh.position.set(0, 0.65, -2.0);
      consoleMesh.castShadow = true;
      consoleMesh.receiveShadow = true;
      currentMeshGroup.add(consoleMesh);

      // Brass console trim
      const trimGeo = new THREE.BoxGeometry(4.22, 0.03, 0.56);
      const trimMesh = new THREE.Mesh(trimGeo, goldMat);
      trimMesh.position.set(0, 0.89, -2.0);
      currentMeshGroup.add(trimMesh);

      // Track exploded object
      threeRef.current.explodedObjects.push({
        mesh: consoleMesh,
        originalPos: new THREE.Vector3(0, 0.65, -2.0),
        explodedPos: new THREE.Vector3(0, 0.65, -1.3),
      });

      // 4. Circular Modern Chandelier Overhead
      const chandelierGroup = new THREE.Group();
      const ring1Geo = new THREE.TorusGeometry(0.9, 0.03, 16, 64);
      const ring1 = new THREE.Mesh(ring1Geo, goldMat);
      ring1.position.set(0, 3.6, 0);
      ring1.rotation.x = Math.PI / 2;
      chandelierGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(0.55, 0.025, 16, 64);
      const ring2 = new THREE.Mesh(ring2Geo, goldMat);
      ring2.position.set(0, 3.4, 0);
      ring2.rotation.x = Math.PI / 2;
      ring2.rotation.y = 0.2;
      chandelierGroup.add(ring2);
      currentMeshGroup.add(chandelierGroup);

      // 5. Plush Sectional Sofa & Brass Coffee Table
      const sofaBaseGeo = new THREE.BoxGeometry(3.6, 0.35, 1.3);
      const fabricMat = new THREE.MeshStandardMaterial({ color: 0x3b3a37, roughness: 0.9, metalness: 0.05 });
      const sofaBase = new THREE.Mesh(sofaBaseGeo, fabricMat);
      sofaBase.position.set(0, 0.22, 1.4);
      sofaBase.castShadow = true;
      currentMeshGroup.add(sofaBase);

      const sofaBackGeo = new THREE.BoxGeometry(3.6, 0.6, 0.35);
      const sofaBack = new THREE.Mesh(sofaBackGeo, fabricMat);
      sofaBack.position.set(0, 0.6, 1.85);
      sofaBack.castShadow = true;
      currentMeshGroup.add(sofaBack);

      // Round Coffee Table
      const tableTopGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.06, 32);
      const tableTop = new THREE.Mesh(tableTopGeo, primaryMat);
      tableTop.position.set(0, 0.38, 0);
      tableTop.castShadow = true;
      currentMeshGroup.add(tableTop);

      const tableBaseGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.35, 32);
      const tableBase = new THREE.Mesh(tableBaseGeo, goldMat);
      tableBase.position.set(0, 0.18, 0);
      tableBase.castShadow = true;
      currentMeshGroup.add(tableBase);
    } else if (selectedScene === 'kitchen') {
      // 1. Back Wall Kitchen Counter & Overhead Cabinets
      const lowerCabinetsGeo = new THREE.BoxGeometry(5.2, 0.9, 0.75);
      const lowerCabinets = new THREE.Mesh(lowerCabinetsGeo, cabinetMat);
      lowerCabinets.position.set(0, 0.45, -2.1);
      lowerCabinets.castShadow = true;
      lowerCabinets.receiveShadow = true;
      currentMeshGroup.add(lowerCabinets);

      const counterTopGeo = new THREE.BoxGeometry(5.24, 0.08, 0.78);
      const counterTop = new THREE.Mesh(counterTopGeo, primaryMat);
      counterTop.position.set(0, 0.94, -2.1);
      counterTop.castShadow = true;
      counterTop.receiveShadow = true;
      currentMeshGroup.add(counterTop);

      // Backsplash with tile texture color
      const backsplashGeo = new THREE.BoxGeometry(5.2, 0.85, 0.04);
      const backsplash = new THREE.Mesh(backsplashGeo, primaryMat);
      backsplash.position.set(0, 1.4, -2.46);
      backsplash.receiveShadow = true;
      currentMeshGroup.add(backsplash);

      // Upper Wall Cabinets
      const upperCabinetsGeo = new THREE.BoxGeometry(5.2, 1.1, 0.45);
      const upperCabinets = new THREE.Mesh(upperCabinetsGeo, cabinetMat);
      upperCabinets.position.set(0, 2.4, -2.25);
      upperCabinets.castShadow = true;
      currentMeshGroup.add(upperCabinets);

      // Under-cabinet LED strip
      const underLedGeo = new THREE.BoxGeometry(5.1, 0.03, 0.05);
      const underLed = new THREE.Mesh(underLedGeo, glowMat);
      underLed.position.set(0, 1.83, -2.2);
      currentMeshGroup.add(underLed);

      // 2. High-End Waterfall Kitchen Island
      const islandBaseGeo = new THREE.BoxGeometry(2.8, 0.92, 1.2);
      const islandBase = new THREE.Mesh(islandBaseGeo, cabinetMat);
      islandBase.position.set(0, 0.46, 0.2);
      islandBase.castShadow = true;
      islandBase.receiveShadow = true;
      currentMeshGroup.add(islandBase);

      const islandTopGeo = new THREE.BoxGeometry(3.0, 0.08, 1.25);
      const islandTop = new THREE.Mesh(islandTopGeo, primaryMat);
      islandTop.position.set(0, 0.96, 0.2);
      islandTop.castShadow = true;
      currentMeshGroup.add(islandTop);

      // Waterfall legs left & right
      const legGeo = new THREE.BoxGeometry(0.08, 0.96, 1.25);
      const leftLeg = new THREE.Mesh(legGeo, primaryMat);
      leftLeg.position.set(-1.46, 0.48, 0.2);
      currentMeshGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, primaryMat);
      rightLeg.position.set(1.46, 0.48, 0.2);
      currentMeshGroup.add(rightLeg);

      // Exploded tracking
      threeRef.current.explodedObjects.push({
        mesh: islandBase,
        originalPos: new THREE.Vector3(0, 0.46, 0.2),
        explodedPos: new THREE.Vector3(0, 0.46, 0.9),
      });

      // 3. Contemporary Kitchen Barstools
      [-0.7, 0.7].forEach((x) => {
        const stoolSeatGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 24);
        const stoolSeat = new THREE.Mesh(stoolSeatGeo, goldMat);
        stoolSeat.position.set(x, 0.68, 1.15);
        stoolSeat.castShadow = true;
        currentMeshGroup.add(stoolSeat);

        const stoolLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 12);
        const stoolLeg = new THREE.Mesh(stoolLegGeo, goldMat);
        stoolLeg.position.set(x, 0.33, 1.15);
        currentMeshGroup.add(stoolLeg);
      });

      // 4. Minimalist Linear Island Pendant Light
      const pendantRodGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.2, 12);
      const rod1 = new THREE.Mesh(pendantRodGeo, goldMat);
      rod1.position.set(-0.8, 3.8, 0.2);
      currentMeshGroup.add(rod1);

      const rod2 = new THREE.Mesh(pendantRodGeo, goldMat);
      rod2.position.set(0.8, 3.8, 0.2);
      currentMeshGroup.add(rod2);

      const linearBarGeo = new THREE.BoxGeometry(2.4, 0.06, 0.06);
      const linearBar = new THREE.Mesh(linearBarGeo, goldMat);
      linearBar.position.set(0, 3.2, 0.2);
      currentMeshGroup.add(linearBar);
    } else if (selectedScene === 'bedroom') {
      // MASTER SUITE (Verified Guwahati Project from Image 3 & 4)
      // 1. Glowing Backlit Geometric CNC Jali Headboard Feature
      const headboardPanelGeo = new THREE.BoxGeometry(3.6, 1.7, 0.08);
      const headboardPanel = new THREE.Mesh(headboardPanelGeo, primaryMat);
      headboardPanel.position.set(0, 2.2, -2.4);
      headboardPanel.castShadow = true;
      currentMeshGroup.add(headboardPanel);

      // Backlit glow behind CNC Panel
      const jaliGlowGeo = new THREE.BoxGeometry(3.7, 1.8, 0.02);
      const jaliGlow = new THREE.Mesh(jaliGlowGeo, glowMat);
      jaliGlow.position.set(0, 2.2, -2.45);
      currentMeshGroup.add(jaliGlow);

      // Circle mirror / feature inset (from client's photo)
      const mirrorGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
      const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.1, metalness: 0.9 });
      const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
      mirror.rotation.x = Math.PI / 2;
      mirror.position.set(1.0, 2.5, -2.34);
      currentMeshGroup.add(mirror);

      // 2. King Upholstered Bed
      const bedFrameGeo = new THREE.BoxGeometry(2.8, 0.45, 3.0);
      const bedFrameMat = new THREE.MeshStandardMaterial({ color: 0x3d414a, roughness: 0.85, metalness: 0.05 });
      const bedFrame = new THREE.Mesh(bedFrameGeo, bedFrameMat);
      bedFrame.position.set(0, 0.25, -0.6);
      bedFrame.castShadow = true;
      bedFrame.receiveShadow = true;
      currentMeshGroup.add(bedFrame);

      // Curved upholstered headboard cushion
      const headCushionGeo = new THREE.BoxGeometry(2.9, 0.85, 0.3);
      const headCushion = new THREE.Mesh(headCushionGeo, bedFrameMat);
      headCushion.position.set(0, 0.8, -2.1);
      headCushion.castShadow = true;
      currentMeshGroup.add(headCushion);

      // Mattress & Crisp White Bedding
      const mattressGeo = new THREE.BoxGeometry(2.5, 0.35, 2.7);
      const mattressMat = new THREE.MeshStandardMaterial({ color: 0xeeece8, roughness: 0.95 });
      const mattress = new THREE.Mesh(mattressGeo, mattressMat);
      mattress.position.set(0, 0.55, -0.6);
      mattress.castShadow = true;
      currentMeshGroup.add(mattress);

      // Pillows
      [-0.6, 0.6].forEach((x) => {
        const pillowGeo = new THREE.BoxGeometry(0.7, 0.18, 0.45);
        const pillow = new THREE.Mesh(pillowGeo, mattressMat);
        pillow.position.set(x, 0.8, -1.6);
        pillow.rotation.x = 0.2;
        currentMeshGroup.add(pillow);
      });

      // 3. Bedside Nightstands
      [-1.8, 1.8].forEach((x) => {
        const nightstandGeo = new THREE.BoxGeometry(0.65, 0.5, 0.5);
        const nightstand = new THREE.Mesh(nightstandGeo, cabinetMat);
        nightstand.position.set(x, 0.25, -2.0);
        nightstand.castShadow = true;
        currentMeshGroup.add(nightstand);

        // Bedside pendant/lamp
        const lampStemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.8, 12);
        const lampStem = new THREE.Mesh(lampStemGeo, goldMat);
        lampStem.position.set(x, 3.8, -2.0);
        currentMeshGroup.add(lampStem);

        const lampShadeGeo = new THREE.ConeGeometry(0.16, 0.25, 24);
        const lampShade = new THREE.Mesh(lampShadeGeo, goldMat);
        lampShade.position.set(x, 3.3, -2.0);
        currentMeshGroup.add(lampShade);
      });

      // 4. Floor-to-Ceiling Built-in Oak Wardrobe on Side
      const wardrobeGeo = new THREE.BoxGeometry(0.8, 4.4, 3.5);
      const wardrobe = new THREE.Mesh(wardrobeGeo, cabinetMat);
      wardrobe.position.set(-3.5, 2.2, -0.6);
      wardrobe.castShadow = true;
      wardrobe.receiveShadow = true;
      currentMeshGroup.add(wardrobe);

      // Sleek full-height brass handle
      const handleGeo = new THREE.BoxGeometry(0.03, 2.2, 0.03);
      const handle = new THREE.Mesh(handleGeo, goldMat);
      handle.position.set(-3.08, 1.8, -0.6);
      currentMeshGroup.add(handle);

      // Exploded tracking
      threeRef.current.explodedObjects.push({
        mesh: wardrobe,
        originalPos: new THREE.Vector3(-3.5, 2.2, -0.6),
        explodedPos: new THREE.Vector3(-2.8, 2.2, -0.6),
      });
    }

    // Set camera position smoothly to current scene's target
    const currentSceneConfig = SCENES.find((s) => s.id === selectedScene)!;
    camera.position.set(...currentSceneConfig.cameraPos);
    controls.target.set(...currentSceneConfig.targetPos);
    controls.update();
  }, [selectedScene, selectedFinish, lightingMode]);

  // Handle Exploded Modular View Animation
  useEffect(() => {
    if (!threeRef.current) return;
    const { explodedObjects } = threeRef.current;

    explodedObjects.forEach((item) => {
      if (isExploded) {
        item.mesh.position.lerp(item.explodedPos, 1);
      } else {
        item.mesh.position.lerp(item.originalPos, 1);
      }
    });
  }, [isExploded]);

  // Handle Auto Rotation
  useEffect(() => {
    if (!threeRef.current) return;
    threeRef.current.controls.autoRotate = isAutoRotate;
    threeRef.current.controls.autoRotateSpeed = 1.2;
  }, [isAutoRotate]);

  // Handle Lighting Mode Change
  useEffect(() => {
    if (!threeRef.current) return;
    const { lights } = threeRef.current;
    if (lightingMode === 'warm') {
      lights.ambient.color.setHex(0xffe6cc);
      lights.ambient.intensity = 0.6;
      lights.mainLight.color.setHex(0xfff5e6);
      lights.mainLight.intensity = 1.8;
      lights.coveLight.color.setHex(0xffb84d);
      lights.coveLight.intensity = 2.2;
    } else if (lightingMode === 'daylight') {
      lights.ambient.color.setHex(0xf0f5ff);
      lights.ambient.intensity = 0.8;
      lights.mainLight.color.setHex(0xffffff);
      lights.mainLight.intensity = 2.2;
      lights.coveLight.color.setHex(0xffffff);
      lights.coveLight.intensity = 1.0;
    } else if (lightingMode === 'mood') {
      lights.ambient.color.setHex(0x1a202c);
      lights.ambient.intensity = 0.3;
      lights.mainLight.color.setHex(0xffaa44);
      lights.mainLight.intensity = 1.2;
      lights.coveLight.color.setHex(0xff7700);
      lights.coveLight.intensity = 2.8;
    }
  }, [lightingMode]);

  const handleResetCamera = () => {
    if (!threeRef.current) return;
    const currentSceneConfig = SCENES.find((s) => s.id === selectedScene)!;
    threeRef.current.camera.position.set(...currentSceneConfig.cameraPos);
    threeRef.current.controls.target.set(...currentSceneConfig.targetPos);
    threeRef.current.controls.update();
  };

  return (
    <section id="studio-3d" className="relative py-16 lg:py-20 bg-[#090b0e] border-y border-[#d4af37]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] bg-[#d4af37]/10 rounded border border-[#d4af37]/20 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Architectural Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f4f2ee] font-serif-luxury text-balance">
            Customize Materials & Lighting in Real-Time 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Experience Interior Adda’s modular craft before execution. Rotate the room 360°, inspect factory joinery, switch Italian marble and wood finishes, and toggle ambient cove illumination.
          </p>
        </div>

        {/* 3D Visualizer Container */}
        <div className="relative rounded-2xl border border-[#d4af37]/25 overflow-hidden bg-[#0c0e12] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Top Toolbar: Scene Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#12161f]/90 backdrop-blur-md border-b border-white/10 z-20">
            {/* Room Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/5">
              {SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    selectedScene === scene.id
                      ? 'bg-gradient-to-r from-[#eed187] to-[#d4af37] text-[#0c0e12] font-semibold shadow'
                      : 'text-[#9fa6b2] hover:text-white'
                  }`}
                >
                  {scene.title.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  isAutoRotate
                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#ffd700]'
                    : 'bg-black/30 border-white/10 text-[#a3abb8] hover:text-white'
                }`}
                title="Toggle 360 Auto-Rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Auto-Rotate</span>
              </button>

              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  isExploded
                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#ffd700]'
                    : 'bg-black/30 border-white/10 text-[#a3abb8] hover:text-white'
                }`}
                title="Explode Modular Structure"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modular Inspect</span>
              </button>

              <button
                onClick={handleResetCamera}
                className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-black/30 border border-white/10 text-[#a3abb8] hover:text-white transition-all cursor-pointer"
                title="Reset Camera View"
              >
                Reset View
              </button>
            </div>
          </div>

          {/* 3D Canvas Mount Point */}
          <div className="relative w-full h-[520px] sm:h-[600px] select-none">
            {isWebGLSupported ? (
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#141822] to-[#0c0e12] text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-4">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">3D Architectural Preview</h3>
                <p className="text-sm text-[#9da5b3] max-w-md">
                  WebGL is currently disabled in your browser environment. Interior Adda provides full photorealistic 3D architectural renders with every consultation package.
                </p>
              </div>
            )}

            {/* Floating Overlay Hint */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md border border-white/10 text-xs text-[#cad0db]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span>Drag to orbit · Scroll to zoom · Pinch on mobile</span>
            </div>

            {/* Hotspot Craftsman Badges */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'hdhmr' ? null : 'hdhmr')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-md border border-[#d4af37]/40 text-xs text-[#e8e6e3] hover:border-[#ffd700] transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>HDHMR Marine Core</span>
              </button>
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'hardware' ? null : 'hardware')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-md border border-[#d4af37]/40 text-xs text-[#e8e6e3] hover:border-[#ffd700] transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Blum / Hettich Hardware</span>
              </button>
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'jali' ? null : 'jali')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-md border border-[#d4af37]/40 text-xs text-[#e8e6e3] hover:border-[#ffd700] transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Backlit Acoustic CNC Jali</span>
              </button>
            </div>

            {/* Hotspot Detail Modal / Popover */}
            {activeHotspot && (
              <div className="absolute bottom-16 left-4 right-4 sm:right-auto sm:max-w-sm z-20 p-4 bg-[#141822]/95 backdrop-blur-md rounded-xl border border-[#d4af37] shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[#ffd700] uppercase tracking-wider">
                      {activeHotspot === 'hdhmr' && 'Boiling Water-Proof HDHMR Core'}
                      {activeHotspot === 'hardware' && 'German Hydraulic Soft-Close Hardware'}
                      {activeHotspot === 'jali' && 'Precision CNC Cut Geometric Backlit Lattice'}
                    </h4>
                    <p className="text-xs text-[#b0b8c6] mt-1.5 leading-relaxed">
                      {activeHotspot === 'hdhmr' &&
                        'High Density High Moisture Resistance board designed specifically for humid climates like Assam. Termite-resistant and dimensionally stable for lifetime modular longevity.'}
                      {activeHotspot === 'hardware' &&
                        'Engineered with premium German soft-close tandem boxes and hydraulic hinges certified for 100,000 cycles with 10-year replacement warranty.'}
                      {activeHotspot === 'jali' &&
                        'Laser-calibrated architectural cut-work backed with frosted diffuser acrylic and 2700K warm gold cove LED strips, as verified in our Fatasil Charali executed bedroom.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-[#99a1b0] hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Customization Controls: Finishes & Atmosphere */}
          <div className="p-4 sm:p-6 bg-[#10141c] border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Finish Presets */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block mb-3">
                Material & Texture Palette
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {MATERIAL_FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedFinish.id === finish.id
                        ? 'bg-[#1b212c] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: finish.primaryColor }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white truncate">{finish.name.split('&')[0]}</div>
                      <div className="text-[10px] text-[#8e96a4] truncate">{finish.name.split('&')[1]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Atmosphere Mode */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block mb-3">
                Architectural Lighting Mood
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setLightingMode('warm')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    lightingMode === 'warm'
                      ? 'bg-[#2b1f14] border-[#d4af37] text-[#ffd700]'
                      : 'bg-black/30 border-white/5 text-[#9fa6b2] hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[#ffae42]" />
                  <span>Warm 2700K</span>
                </button>
                <button
                  onClick={() => setLightingMode('daylight')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    lightingMode === 'daylight'
                      ? 'bg-[#1b2433] border-[#7292c9] text-[#e0e9f8]'
                      : 'bg-black/30 border-white/5 text-[#9fa6b2] hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[#a8c5ff]" />
                  <span>Daylight 5500K</span>
                </button>
                <button
                  onClick={() => setLightingMode('mood')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    lightingMode === 'mood'
                      ? 'bg-[#24172e] border-[#b078d6] text-[#e8cbf8]'
                      : 'bg-black/30 border-white/5 text-[#9fa6b2] hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-[#cf8bf3]" />
                  <span>Mood Accent</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
