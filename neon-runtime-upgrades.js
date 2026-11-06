/**
 * Neon State runtime upgrades.
 * Lightweight browser-side weather and renderer telemetry. All effects are optional
 * and degrade cleanly when WebGL capabilities are limited.
 */
export function createWeatherSystem(THREE, scene, roadMaterial) {
  const count = 520;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 110;
    positions[i * 3 + 1] = Math.random() * 42;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 110;
    speeds[i] = 24 + Math.random() * 18;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const rainMaterial = new THREE.PointsMaterial({
    color: '#c9e6f4', size: 0.075, transparent: true,
    opacity: 0.48, depthWrite: false, sizeAttenuation: true
  });
  const rain = new THREE.Points(geometry, rainMaterial);
  rain.frustumCulled = false;
  rain.visible = false;
  scene.add(rain);

  const puddleMaterial = new THREE.MeshPhysicalMaterial({
    color: '#25343d', roughness: 0.12, metalness: 0.24,
    clearcoat: 1, clearcoatRoughness: 0.06,
    transparent: true, opacity: 0.58, depthWrite: false
  });
  const puddleGeometry = new THREE.CircleGeometry(1, 12);
  const puddles = new THREE.InstancedMesh(puddleGeometry, puddleMaterial, 56);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 56; i++) {
    const axis = i % 2 === 0;
    const lane = (Math.floor(i / 2) % 7 - 3) * 52;
    const along = (Math.floor(i / 14) - 1.5) * 78 + (i % 7) * 5;
    dummy.position.set(axis ? lane + (i % 3 - 1) * 2.2 : along, -0.012, axis ? along : lane + (i % 3 - 1) * 2.2);
    dummy.rotation.set(-Math.PI / 2, 0, (i % 5) * 0.31);
    dummy.scale.set(0.65 + (i % 4) * 0.38, 0.32 + (i % 3) * 0.18, 1);
    dummy.updateMatrix();
    puddles.setMatrixAt(i, dummy.matrix);
  }
  puddles.visible = false;
  puddles.frustumCulled = false;
  scene.add(puddles);

  const original = {
    roughness: roadMaterial.roughness,
    metalness: roadMaterial.metalness,
    clearcoat: roadMaterial.clearcoat,
    clearcoatRoughness: roadMaterial.clearcoatRoughness
  };
  let mode = 'CLEAR';
  let elapsed = 0;

  function setWeather(next) {
    mode = ['CLEAR', 'RAIN', 'FOG'].includes(next) ? next : 'CLEAR';
    rain.visible = mode === 'RAIN';
    puddles.visible = mode === 'RAIN';
    if (mode === 'RAIN') {
      roadMaterial.roughness = 0.3;
      roadMaterial.metalness = 0.16;
      roadMaterial.clearcoat = 0.82;
      roadMaterial.clearcoatRoughness = 0.08;
      roadMaterial.needsUpdate = true;
      if (scene.fog) scene.fog.density = Math.max(scene.fog.density, 0.0038);
    } else {
      roadMaterial.roughness = original.roughness;
      roadMaterial.metalness = original.metalness;
      roadMaterial.clearcoat = original.clearcoat ?? 0;
      roadMaterial.clearcoatRoughness = original.clearcoatRoughness ?? 0.1;
      roadMaterial.needsUpdate = true;
      if (mode === 'FOG' && scene.fog) scene.fog.density = 0.006;
    }
    return mode;
  }

  function update(dt, focus) {
    if (mode !== 'RAIN') return;
    elapsed += dt;
    rain.position.set(focus?.x || 0, 0, focus?.z || 0);
    const attribute = geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      positions[j] += dt * 2.1;
      positions[j + 1] -= speeds[i] * dt;
      positions[j + 2] += dt * 0.8;
      if (positions[j + 1] < 0) {
        positions[j] = (Math.random() - 0.5) * 110;
        positions[j + 1] = 30 + Math.random() * 14;
        positions[j + 2] = (Math.random() - 0.5) * 110;
      }
    }
    attribute.needsUpdate = true;
    rainMaterial.opacity = 0.38 + Math.sin(elapsed * 2.2) * 0.035;
  }

  return {
    setWeather,
    update,
    get mode() { return mode; },
    dispose() {
      scene.remove(rain, puddles);
      geometry.dispose();
      rainMaterial.dispose();
      puddleGeometry.dispose();
      puddleMaterial.dispose();
      setWeather('CLEAR');
    }
  };
}

export function createPerformanceMonitor(renderer, onSample) {
  renderer.info.autoReset = false;
  let elapsed = 0;
  let frames = 0;
  let frameTimeTotal = 0;
  let frameTimeMax = 0;
  let last = null;
  const samples = [];
  const gl = renderer.getContext();
  const limits = {
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
    maxTextureUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
    deviceMemoryGB: navigator.deviceMemory || null,
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    renderer: gl.getParameter(gl.RENDERER) || 'WebGL'
  };

  function endFrame(frameDelta) {
    const info = renderer.info;
    frames += 1;
    elapsed += frameDelta;
    frameTimeTotal += frameDelta * 1000;
    frameTimeMax = Math.max(frameTimeMax, frameDelta * 1000);
    last = {
      fps: 0,
      frameTimeMs: 0,
      maxFrameTimeMs: 0,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      pixelRatio: renderer.getPixelRatio(),
      quality: document.documentElement.dataset.graphicsQuality || 'HIGH'
    };
    if (elapsed >= 2) {
      last.fps = frames / elapsed;
      last.frameTimeMs = frameTimeTotal / frames;
      last.maxFrameTimeMs = frameTimeMax;
      samples.push({ ...last, timestamp: Date.now() });
      if (samples.length > 30) samples.shift();
      onSample?.(last);
      frames = 0;
      elapsed = 0;
      frameTimeTotal = 0;
      frameTimeMax = 0;
    }
    info.reset();
  }

  window.__neonStatePerfReport = () => ({
    capturedAt: new Date().toISOString(),
    hardware: limits,
    latest: last,
    samples: samples.slice()
  });
  return { endFrame, get latest() { return last; } };
}
