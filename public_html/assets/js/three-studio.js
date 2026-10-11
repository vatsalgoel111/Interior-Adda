/**
 * Interior Adda — Vanilla Three.js Interactive 3D Studio for Hostinger
 * Zero build-step / Zero bundler dependency
 */

(function () {
  'use strict';

  var container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Verify Three.js loaded from CDN
  if (typeof THREE === 'undefined') {
    container.innerHTML = '<div style="padding:2rem;text-align:center;color:#888;">3D WebGL library loading...</div>';
    return;
  }

  var width = container.clientWidth;
  var height = container.clientHeight;

  // Scene, Camera, Renderer
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1117);
  scene.fog = new THREE.FogExp2(0x0e1117, 0.05);

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
  camera.position.set(0, 2.5, 6);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // OrbitControls
  var controls;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
  } else {
    // Fallback basic orbit control mock
    controls = {
      enableDamping: true,
      dampingFactor: 0.05,
      update: function () {},
      target: new THREE.Vector3(0, 1.8, 0),
      autoRotate: false,
    };
  }
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.05;
  controls.minDistance = 2.5;
  controls.maxDistance = 10;
  controls.target.set(0, 1.8, 0);

  // Lighting
  var ambient = new THREE.AmbientLight(0xffeedd, 0.6);
  scene.add(ambient);

  var mainLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
  mainLight.position.set(4, 6, 4);
  mainLight.castShadow = true;
  scene.add(mainLight);

  var coveLight = new THREE.PointLight(0xffb84d, 2.0, 8);
  coveLight.position.set(0, 2.8, 0.5);
  scene.add(coveLight);

  var currentMeshGroup = new THREE.Group();
  scene.add(currentMeshGroup);

  // States
  var currentScene = 'living';
  var currentFinish = 'statuario';
  var currentLighting = 'warm';
  var isExploded = false;
  var explodedObjects = [];

  // Material Palette Configs
  var FINISH_CONFIGS = {
    statuario: {
      wallColor: 0x2b231c,
      primaryColor: 0xf0ede6,
      cabinetColor: 0x251b14,
      accentMetalColor: 0xd4af37,
      roughness: 0.25,
      metalness: 0.1,
    },
    teak: {
      wallColor: 0x241a12,
      primaryColor: 0x8a5229,
      cabinetColor: 0x633b1c,
      accentMetalColor: 0xe0c068,
      roughness: 0.35,
      metalness: 0.2,
    },
    graphite: {
      wallColor: 0x1c1f24,
      primaryColor: 0x24272c,
      cabinetColor: 0x1b1d22,
      accentMetalColor: 0xa6a9b0,
      roughness: 0.45,
      metalness: 0.15,
    },
  };

  function buildRoom() {
    // Clear previous room models
    while (currentMeshGroup.children.length > 0) {
      var obj = currentMeshGroup.children[0];
      currentMeshGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(function (m) { m.dispose(); });
        else obj.material.dispose();
      }
    }
    explodedObjects = [];

    var cfg = FINISH_CONFIGS[currentFinish];

    var floorMat = new THREE.MeshStandardMaterial({ color: 0x1f2229, roughness: 0.3, metalness: 0.1 });
    var wallMat = new THREE.MeshStandardMaterial({ color: cfg.wallColor, roughness: 0.7 });
    var primaryMat = new THREE.MeshStandardMaterial({ color: cfg.primaryColor, roughness: cfg.roughness, metalness: cfg.metalness });
    var cabinetMat = new THREE.MeshStandardMaterial({ color: cfg.cabinetColor, roughness: 0.4 });
    var goldMat = new THREE.MeshStandardMaterial({ color: cfg.accentMetalColor, roughness: 0.2, metalness: 0.85 });
    var glowMat = new THREE.MeshBasicMaterial({ color: currentLighting === 'warm' ? 0xffb347 : (currentLighting === 'daylight' ? 0xffffff : 0xff8800) });

    // Floor, Back Wall & Ceiling
    var floorGeo = new THREE.PlaneGeometry(8, 8);
    var floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    currentMeshGroup.add(floorMesh);

    var backWallGeo = new THREE.PlaneGeometry(8, 4.5);
    var backWallMesh = new THREE.Mesh(backWallGeo, wallMat);
    backWallMesh.position.set(0, 2.25, -2.5);
    backWallMesh.receiveShadow = true;
    currentMeshGroup.add(backWallMesh);

    var ceilingGeo = new THREE.PlaneGeometry(8, 8);
    var ceilingMesh = new THREE.Mesh(ceilingGeo, wallMat);
    ceilingMesh.position.set(0, 4.5, 0);
    ceilingMesh.rotation.x = Math.PI / 2;
    currentMeshGroup.add(ceilingMesh);

    if (currentScene === 'living') {
      // Fluted wood paneling slats
      var flutedGroup = new THREE.Group();
      for (var i = -3.2; i <= 3.2; i += 0.2) {
        var slatGeo = new THREE.BoxGeometry(0.08, 3.8, 0.06);
        var slatMesh = new THREE.Mesh(slatGeo, cabinetMat);
        slatMesh.position.set(i, 2.2, -2.42);
        flutedGroup.add(slatMesh);
      }
      currentMeshGroup.add(flutedGroup);

      // Italian marble TV slab
      var slabGeo = new THREE.BoxGeometry(3.6, 2.2, 0.08);
      var slab = new THREE.Mesh(slabGeo, primaryMat);
      slab.position.set(0, 2.3, -2.3);
      currentMeshGroup.add(slab);

      // Backlit cove halo
      var haloGeo = new THREE.BoxGeometry(3.7, 2.3, 0.02);
      var halo = new THREE.Mesh(haloGeo, glowMat);
      halo.position.set(0, 2.3, -2.35);
      currentMeshGroup.add(halo);

      // Television Screen
      var tvGeo = new THREE.BoxGeometry(2.4, 1.4, 0.04);
      var tvMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.1 });
      var tv = new THREE.Mesh(tvGeo, tvMat);
      tv.position.set(0, 2.4, -2.22);
      currentMeshGroup.add(tv);

      // Floating Media Console
      var consoleGeo = new THREE.BoxGeometry(4.2, 0.45, 0.55);
      var consoleMesh = new THREE.Mesh(consoleGeo, cabinetMat);
      consoleMesh.position.set(0, 0.65, -2.0);
      currentMeshGroup.add(consoleMesh);

      // Brass trim
      var trimGeo = new THREE.BoxGeometry(4.22, 0.03, 0.56);
      var trim = new THREE.Mesh(trimGeo, goldMat);
      trim.position.set(0, 0.89, -2.0);
      currentMeshGroup.add(trim);

      explodedObjects.push({
        mesh: consoleMesh,
        original: new THREE.Vector3(0, 0.65, -2.0),
        exploded: new THREE.Vector3(0, 0.65, -1.3),
      });

      // Circular Ring Chandelier Overhead
      var ringGeo = new THREE.TorusGeometry(0.85, 0.03, 16, 64);
      var ring = new THREE.Mesh(ringGeo, goldMat);
      ring.position.set(0, 3.5, 0);
      ring.rotation.x = Math.PI / 2;
      currentMeshGroup.add(ring);

      // Lounge Sofa & Round Coffee Table
      var sofaGeo = new THREE.BoxGeometry(3.6, 0.35, 1.3);
      var sofa = new THREE.Mesh(sofaGeo, new THREE.MeshStandardMaterial({ color: 0x3b3a37, roughness: 0.9 }));
      sofa.position.set(0, 0.22, 1.4);
      currentMeshGroup.add(sofa);

      var tableTopGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.06, 32);
      var tableTop = new THREE.Mesh(tableTopGeo, primaryMat);
      tableTop.position.set(0, 0.38, 0);
      currentMeshGroup.add(tableTop);

      var tableBaseGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.35, 32);
      var tableBase = new THREE.Mesh(tableBaseGeo, goldMat);
      tableBase.position.set(0, 0.18, 0);
      currentMeshGroup.add(tableBase);

      camera.position.set(0, 2.5, 6);
      controls.target.set(0, 1.8, 0);
    } else if (currentScene === 'kitchen') {
      // Modular Kitchen Counter & Overhead
      var lowerGeo = new THREE.BoxGeometry(5.2, 0.9, 0.75);
      var lower = new THREE.Mesh(lowerGeo, cabinetMat);
      lower.position.set(0, 0.45, -2.1);
      currentMeshGroup.add(lower);

      var counterGeo = new THREE.BoxGeometry(5.24, 0.08, 0.78);
      var counter = new THREE.Mesh(counterGeo, primaryMat);
      counter.position.set(0, 0.94, -2.1);
      currentMeshGroup.add(counter);

      var upperGeo = new THREE.BoxGeometry(5.2, 1.1, 0.45);
      var upper = new THREE.Mesh(upperGeo, cabinetMat);
      upper.position.set(0, 2.4, -2.25);
      currentMeshGroup.add(upper);

      // Waterfall Island
      var islandGeo = new THREE.BoxGeometry(2.8, 0.92, 1.2);
      var island = new THREE.Mesh(islandGeo, cabinetMat);
      island.position.set(0, 0.46, 0.2);
      currentMeshGroup.add(island);

      var islandTopGeo = new THREE.BoxGeometry(3.0, 0.08, 1.25);
      var islandTop = new THREE.Mesh(islandTopGeo, primaryMat);
      islandTop.position.set(0, 0.96, 0.2);
      currentMeshGroup.add(islandTop);

      // Waterfall Legs
      var legGeo = new THREE.BoxGeometry(0.08, 0.96, 1.25);
      var legL = new THREE.Mesh(legGeo, primaryMat);
      legL.position.set(-1.46, 0.48, 0.2);
      currentMeshGroup.add(legL);

      var legR = new THREE.Mesh(legGeo, primaryMat);
      legR.position.set(1.46, 0.48, 0.2);
      currentMeshGroup.add(legR);

      explodedObjects.push({
        mesh: island,
        original: new THREE.Vector3(0, 0.46, 0.2),
        exploded: new THREE.Vector3(0, 0.46, 0.9),
      });

      // Linear Pendant
      var barGeo = new THREE.BoxGeometry(2.4, 0.06, 0.06);
      var bar = new THREE.Mesh(barGeo, goldMat);
      bar.position.set(0, 3.2, 0.2);
      currentMeshGroup.add(bar);

      camera.position.set(0, 3, 5.5);
      controls.target.set(0, 1.5, 0);
    } else if (currentScene === 'bedroom') {
      // MASTER BEDROOM SUITE (Guwahati Executed Project)
      // Backlit Geometric CNC Headboard Panel
      var headboardGeo = new THREE.BoxGeometry(3.6, 1.7, 0.08);
      var headboard = new THREE.Mesh(headboardGeo, primaryMat);
      headboard.position.set(0, 2.2, -2.4);
      currentMeshGroup.add(headboard);

      var jaliGlowGeo = new THREE.BoxGeometry(3.7, 1.8, 0.02);
      var jaliGlow = new THREE.Mesh(jaliGlowGeo, glowMat);
      jaliGlow.position.set(0, 2.2, -2.45);
      currentMeshGroup.add(jaliGlow);

      // Circular Mirror Inset
      var mirrorGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
      var mirror = new THREE.Mesh(mirrorGeo, new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.1, metalness: 0.9 }));
      mirror.rotation.x = Math.PI / 2;
      mirror.position.set(1.0, 2.5, -2.34);
      currentMeshGroup.add(mirror);

      // King Bed
      var bedGeo = new THREE.BoxGeometry(2.8, 0.45, 3.0);
      var bed = new THREE.Mesh(bedGeo, new THREE.MeshStandardMaterial({ color: 0x3d414a, roughness: 0.85 }));
      bed.position.set(0, 0.25, -0.6);
      currentMeshGroup.add(bed);

      var mattressGeo = new THREE.BoxGeometry(2.5, 0.35, 2.7);
      var mattress = new THREE.Mesh(mattressGeo, new THREE.MeshStandardMaterial({ color: 0xeeece8, roughness: 0.95 }));
      mattress.position.set(0, 0.55, -0.6);
      currentMeshGroup.add(mattress);

      // Floor-to-Ceiling Wardrobe on Side Wall
      var wardrobeGeo = new THREE.BoxGeometry(0.8, 4.4, 3.5);
      var wardrobe = new THREE.Mesh(wardrobeGeo, cabinetMat);
      wardrobe.position.set(-3.5, 2.2, -0.6);
      currentMeshGroup.add(wardrobe);

      var handleGeo = new THREE.BoxGeometry(0.03, 2.2, 0.03);
      var handle = new THREE.Mesh(handleGeo, goldMat);
      handle.position.set(-3.08, 1.8, -0.6);
      currentMeshGroup.add(handle);

      explodedObjects.push({
        mesh: wardrobe,
        original: new THREE.Vector3(-3.5, 2.2, -0.6),
        exploded: new THREE.Vector3(-2.8, 2.2, -0.6),
      });

      camera.position.set(0, 2.8, 5.8);
      controls.target.set(0, 1.6, 0);
    }

    controls.update();
  }

  // Initial Build
  buildRoom();

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Lerp exploded positions
    for (var j = 0; j < explodedObjects.length; j++) {
      var item = explodedObjects[j];
      var target = isExploded ? item.exploded : item.original;
      item.mesh.position.lerp(target, 0.15);
    }

    renderer.render(scene, camera);
  }
  animate();

  // Resize Listener
  window.addEventListener('resize', function () {
    if (!container) return;
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // UI Event Bindings
  // 1. Room Switcher Tabs
  var roomButtons = document.querySelectorAll('[data-room-tab]');
  roomButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      roomButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentScene = btn.getAttribute('data-room-tab');
      buildRoom();
    });
  });

  // 2. Material Finish Presets
  var materialButtons = document.querySelectorAll('[data-finish-btn]');
  materialButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      materialButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFinish = btn.getAttribute('data-finish-btn');
      buildRoom();
    });
  });

  // 3. Lighting Mood Presets
  var lightingButtons = document.querySelectorAll('[data-lighting-btn]');
  lightingButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      lightingButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentLighting = btn.getAttribute('data-lighting-btn');
      if (currentLighting === 'warm') {
        ambient.color.setHex(0xffeedd);
        ambient.intensity = 0.6;
        mainLight.color.setHex(0xfff5e6);
        coveLight.color.setHex(0xffb84d);
        coveLight.intensity = 2.0;
      } else if (currentLighting === 'daylight') {
        ambient.color.setHex(0xf0f5ff);
        ambient.intensity = 0.8;
        mainLight.color.setHex(0xffffff);
        coveLight.color.setHex(0xffffff);
        coveLight.intensity = 1.0;
      } else if (currentLighting === 'mood') {
        ambient.color.setHex(0x1a202c);
        ambient.intensity = 0.3;
        mainLight.color.setHex(0xffaa44);
        coveLight.color.setHex(0xff7700);
        coveLight.intensity = 2.8;
      }
      buildRoom();
    });
  });

  // 4. Modular Inspect / Explode Toggle
  var explodeBtn = document.getElementById('btn-explode-3d');
  if (explodeBtn) {
    explodeBtn.addEventListener('click', function () {
      isExploded = !isExploded;
      explodeBtn.classList.toggle('active', isExploded);
    });
  }

  // 5. Auto-Rotate Toggle
  var rotateBtn = document.getElementById('btn-rotate-3d');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', function () {
      controls.autoRotate = !controls.autoRotate;
      controls.autoRotateSpeed = 1.2;
      rotateBtn.classList.toggle('active', controls.autoRotate);
    });
  }

  // 6. Reset Camera
  var resetBtn = document.getElementById('btn-reset-3d');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      buildRoom();
    });
  }

  // 7. Hotspot Tooltip Popups
  var hotspotChips = document.querySelectorAll('[data-hotspot-target]');
  var popup = document.getElementById('hotspot-popup-box');
  var popupTitle = document.getElementById('hotspot-popup-title');
  var popupText = document.getElementById('hotspot-popup-text');

  var HOTSPOT_DATA = {
    hdhmr: {
      title: 'Action TESA HDHMR Marine Core',
      text: 'High-density moisture-resistant core board engineered for Assam’s humid climate. Boiling water-proof and borer-resistant for lifetime modular stability.',
    },
    hardware: {
      title: 'Blum & Hettich German Hardware',
      text: 'Hydraulic soft-close hinges and tandem boxes tested to 100,000 smooth cycles. Backed by a 10-year manufacturer replacement warranty.',
    },
    jali: {
      title: 'Backlit Geometric CNC Jali Lattice',
      text: 'Laser-cut architectural pattern backlit with 2700K warm gold cove LED profiles, as executed in our Fatasil Charali master suite.',
    },
  };

  hotspotChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-hotspot-target');
      if (HOTSPOT_DATA[key] && popup && popupTitle && popupText) {
        popupTitle.textContent = HOTSPOT_DATA[key].title;
        popupText.textContent = HOTSPOT_DATA[key].text;
        popup.classList.add('active');
      }
    });
  });

  var popupClose = document.getElementById('hotspot-popup-close');
  if (popupClose && popup) {
    popupClose.addEventListener('click', function () {
      popup.classList.remove('active');
    });
  }
})();
