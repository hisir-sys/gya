// Neon State cinematic world pass.
// Procedural, deterministic-at-runtime architectural dressing for the existing Kolkata blockout.
// Keeps every gameplay collider, mission coordinate, vehicle controller and save key unchanged.
export function installCinematicWorldPass(THREE, city, buildings, renderer) {
  if (!THREE || !city || !Array.isArray(buildings) || !buildings.length) return { windows: 0, balconies: 0, rooftopProps: 0 };

  const maxAniso = Math.min(8, renderer?.capabilities?.getMaxAnisotropy?.() || 1);
  const makeCanvasTexture = (draw, size = 1024) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    draw(ctx, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAniso;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  // A layered plaster map breaks the flat, single-colour walls visible in the original blockout.
  const plaster = makeCanvasTexture((ctx, size) => {
    ctx.fillStyle = '#d0c9ba'; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 52000; i++) {
      const v = 115 + Math.random() * 125;
      const alpha = .018 + Math.random() * .075;
      ctx.fillStyle = 'rgba(' + v + ',' + (v * .97) + ',' + (v * .9) + ',' + alpha + ')';
      const r = .5 + Math.random() * 2.8;
      ctx.fillRect(Math.random() * size, Math.random() * size, r, r);
    }
    // Weathering and rain streaks collect under roof edges and window sills.
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * size, y = Math.random() * size * .72;
      const h = 12 + Math.random() * 180;
      const g = ctx.createLinearGradient(x, y, x + (Math.random() - .5) * 5, y + h);
      g.addColorStop(0, 'rgba(54,48,41,.16)');
      g.addColorStop(1, 'rgba(54,48,41,0)');
      ctx.fillStyle = g; ctx.fillRect(x, y, 1 + Math.random() * 3, h);
    }
    for (let y = 0; y < size; y += 128) {
      ctx.fillStyle = 'rgba(65,55,45,.045)'; ctx.fillRect(0, y, size, 2);
    }
  });
  const plasterBump = makeCanvasTexture((ctx, size) => {
    ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 42000; i++) {
      const v = 105 + Math.random() * 54;
      ctx.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
      ctx.fillRect(Math.random() * size, Math.random() * size, .7 + Math.random() * 2.4, .7 + Math.random() * 2.4);
    }
  });

  // Instanced geometry means the extra facade detail adds very few draw calls.
  const facadeRoot = new THREE.Group();
  facadeRoot.name = 'Cinematic Kolkata facades · instanced';
  city.add(facadeRoot);
  const frameMat = new THREE.MeshStandardMaterial({ color: '#d7c7a8', roughness: .82 });
  const darkFrameMat = new THREE.MeshStandardMaterial({ color: '#303a3a', roughness: .58, metalness: .52 });
  const balconyMat = new THREE.MeshStandardMaterial({ color: '#343b3b', roughness: .52, metalness: .62 });
  const glassMats = [
    new THREE.MeshPhysicalMaterial({ color: '#355a68', roughness: .17, metalness: .34, clearcoat: .9, clearcoatRoughness: .12 }),
    new THREE.MeshPhysicalMaterial({ color: '#6e8584', roughness: .22, metalness: .22, clearcoat: .72 }),
    new THREE.MeshPhysicalMaterial({ color: '#263e4b', roughness: .14, metalness: .4, clearcoat: 1 })
  ];
  const windowTransforms = glassMats.map(() => []);
  const frameTransforms = [];
  const sillTransforms = [];
  const balconyDecks = [];
  const balconyRails = [];
  const acTransforms = [];
  const pipeTransforms = [];
  const roofTrim = [];
  const addTransform = (list, x, y, z, sx, sy, sz, ry = 0) =>
    list.push({ x, y, z, sx, sy, sz, ry });

  const dummy = new THREE.Object3D();
  const addInstances = (geometry, material, transforms, name) => {
    if (!transforms.length) return;
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    mesh.name = name;
    transforms.forEach((t, i) => {
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(0, t.ry || 0, 0);
      dummy.scale.set(t.sx, t.sy, t.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    facadeRoot.add(mesh);
  };

  for (const b of buildings) {
    // Apply the textured plaster only to the main building mass, not signs or windows.
    const buildingGroup = city.children.find(o => o.isGroup &&
      Math.abs(o.position.x - b.x) < .01 && Math.abs(o.position.z - b.z) < .01);
    if (buildingGroup) {
      const body = buildingGroup.children.find(o => o.isMesh && o.geometry?.type === 'BoxGeometry' &&
        Math.abs((o.geometry.parameters?.width || 0) - b.w) < .01 &&
        Math.abs((o.geometry.parameters?.height || 0) - b.h) < .01 &&
        Math.abs((o.geometry.parameters?.depth || 0) - b.d) < .01);
      if (body && body.material?.isMeshStandardMaterial) {
        body.material.map = plaster;
        body.material.bumpMap = plasterBump;
        body.material.bumpScale = .045;
        body.material.roughness = .94;
        body.material.needsUpdate = true;
      }
    }

    const floors = Math.max(2, Math.floor((b.h - 3) / 4.2));
    const frontCols = Math.max(2, Math.floor(b.w / 5.2));
    const sideCols = Math.max(2, Math.floor(b.d / 5.2));
    const addWindow = (x, y, z, rotation, glassIndex, balcony) => {
      const width = 1.18, height = 1.72;
      const depth = .105;
      addTransform(windowTransforms[glassIndex], x, y, z, width, height, depth, rotation);
      // Four narrow frame pieces, plus a deep sill for real parallax and shadow.
      const horizontal = { x, y: y + height / 2 + .055, z, sx: width + .16, sy: .065, sz: .12, ry: rotation };
      const lower = { ...horizontal, y: y - height / 2 - .055 };
      frameTransforms.push(horizontal, lower);
      for (const side of [-1, 1]) frameTransforms.push({
        x: x + Math.cos(rotation) * side * (width / 2 + .045),
        y, z: z - Math.sin(rotation) * side * (width / 2 + .045),
        sx: .065, sy: height, sz: .12, ry: rotation
      });
      sillTransforms.push({ x, y: y - height / 2 - .13, z, sx: width + .32, sy: .11, sz: .42, ry: rotation });
      if (balcony) {
        const front = { x, y: y - .86, z: z + Math.cos(rotation) * .62, sx: 1.45, sy: .09, sz: 1.18, ry: rotation };
        balconyDecks.push(front);
        balconyRails.push({ x, y: y - .48, z: z + Math.cos(rotation) * 1.17, sx: 1.4, sy: .045, sz: .045, ry: rotation });
        for (const side of [-1, 1]) balconyRails.push({
          x: x + Math.cos(rotation) * side * .69, y: y - .66,
          z: z + Math.cos(rotation) * .88, sx: .045, sy: .34, sz: .045, ry: rotation
        });
        for (let rail = 0; rail < 5; rail++) balconyRails.push({
          x: x - Math.sin(rotation) * .55 + rail * .275 * Math.cos(rotation),
          y: y - .67, z: z + Math.cos(rotation) * 1.17,
          sx: .025, sy: .28, sz: .025, ry: rotation
        });
      }
    };

    for (let row = 0; row < floors; row++) {
      const y = 3.1 + row * 4.05;
      if (y > b.h - 2) continue;
      for (let col = 0; col < frontCols; col++) {
        const x = b.x - b.w / 2 + 3.1 + col * ((b.w - 6.2) / Math.max(1, frontCols - 1));
        // Existing front windows are retained; add depth, balconies and side/back facades.
        if (row > 0 && (col + row) % 2 === 0) {
          balconyDecks.push({ x, y: y - 1.13, z: b.z + b.d / 2 + .47, sx: 1.62, sy: .08, sz: .92 });
          balconyRails.push({ x, y: y - .72, z: b.z + b.d / 2 + .94, sx: 1.48, sy: .045, sz: .045 });
          for (let k = 0; k < 5; k++) balconyRails.push({ x: x - .58 + k * .29, y: y - .91, z: b.z + b.d / 2 + .94, sx: .025, sy: .22, sz: .025 });
        }
        if (col % 2 === 0) acTransforms.push({ x: x + .85, y: y - .8, z: b.z + b.d / 2 + .3, sx: .42, sy: .3, sz: .24 });
      }
      // Rear wall windows.
      for (let col = 0; col < frontCols; col++) {
        const x = b.x - b.w / 2 + 3.1 + col * ((b.w - 6.2) / Math.max(1, frontCols - 1));
        addWindow(x, y, b.z - b.d / 2 - .09, Math.PI, (row + col) % glassMats.length, false);
      }
      // Both long side walls get windows: the old blockout left these as huge blank slabs.
      for (let col = 0; col < sideCols; col++) {
        const z = b.z - b.d / 2 + 3.1 + col * ((b.d - 6.2) / Math.max(1, sideCols - 1));
        addWindow(b.x + b.w / 2 + .09, y, z, Math.PI / 2, (row + col + 1) % glassMats.length, row > 0 && col % 2 === 0);
        addWindow(b.x - b.w / 2 - .09, y, z, -Math.PI / 2, (row + col + 2) % glassMats.length, row > 0 && col % 2 === 1);
      }
    }

    // Kolkata roof silhouettes: parapets, tanks, satellite dishes, water pipes and service sheds.
    roofTrim.push({ x: b.x, y: b.h + .28, z: b.z + b.d / 2, sx: b.w + .3, sy: .45, sz: .28 });
    roofTrim.push({ x: b.x, y: b.h + .28, z: b.z - b.d / 2, sx: b.w + .3, sy: .45, sz: .28 });
    roofTrim.push({ x: b.x + b.w / 2, y: b.h + .28, z: b.z, sx: .28, sy: .45, sz: b.d + .3 });
    roofTrim.push({ x: b.x - b.w / 2, y: b.h + .28, z: b.z, sx: .28, sy: .45, sz: b.d + .3 });
    pipeTransforms.push({ x: b.x - b.w / 2 + .8, y: b.h / 2, z: b.z + b.d / 2 + .22, sx: .055, sy: b.h / 2, sz: .055 });
    pipeTransforms.push({ x: b.x + b.w / 2 - .8, y: b.h / 2, z: b.z + b.d / 2 + .22, sx: .055, sy: b.h / 2, sz: .055 });
  }

  addInstances(new THREE.BoxGeometry(1, 1, 1), glassMats[0], windowTransforms[0], 'Rear and side windows · blue glass');
  addInstances(new THREE.BoxGeometry(1, 1, 1), glassMats[1], windowTransforms[1], 'Rear and side windows · aged glass');
  addInstances(new THREE.BoxGeometry(1, 1, 1), glassMats[2], windowTransforms[2], 'Rear and side windows · dark glass');
  addInstances(new THREE.BoxGeometry(1, 1, 1), frameMat, frameTransforms, 'Window stone frames');
  addInstances(new THREE.BoxGeometry(1, 1, 1), frameMat, sillTransforms, 'Deep window sills');
  addInstances(new THREE.BoxGeometry(1, 1, 1), balconyMat, balconyDecks, 'Balcony decks');
  addInstances(new THREE.BoxGeometry(1, 1, 1), balconyMat, balconyRails, 'Balcony railings');
  addInstances(new THREE.BoxGeometry(1, 1, 1), darkFrameMat, acTransforms, 'Outdoor AC compressor units');
  addInstances(new THREE.BoxGeometry(1, 1, 1), darkFrameMat, pipeTransforms, 'Rainwater downpipes');
  addInstances(new THREE.BoxGeometry(1, 1, 1), frameMat, roofTrim, 'Roof parapets');

  // Aged asphalt response: use the existing road meshes and collision layout.
  const asphalt = makeCanvasTexture((ctx, size) => {
    ctx.fillStyle = '#66696b'; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 90000; i++) {
      const shade = 45 + Math.random() * 90;
      ctx.fillStyle = 'rgba(' + shade + ',' + shade + ',' + shade + ',' + (.025 + Math.random() * .09) + ')';
      const r = .4 + Math.random() * 2.2;
      ctx.fillRect(Math.random() * size, Math.random() * size, r, r);
    }
    for (let i = 0; i < 24; i++) {
      const x = Math.random() * size, y = Math.random() * size, w = 20 + Math.random() * 160, h = 3 + Math.random() * 12;
      ctx.fillStyle = 'rgba(20,23,26,.11)'; ctx.fillRect(x, y, w, h);
    }
    ctx.strokeStyle = 'rgba(25,27,29,.24)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * size, y = Math.random() * size;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10 + Math.random() * 45, y + 4 + Math.random() * 35); ctx.stroke();
    }
  }, 1024);
  city.traverse(object => {
    if (!object.isMesh || !object.material || !object.geometry?.parameters) return;
    const p = object.geometry.parameters;
    const isRoadSlab = p.height < .08 && p.width >= 12 && p.depth >= 12;
    if (isRoadSlab && object.material.roughness !== undefined) {
      object.material.map = asphalt;
      object.material.bumpMap = asphalt;
      object.material.bumpScale = .028;
      object.material.roughness = .92;
      object.material.needsUpdate = true;
    }
  });

  // Add small, varied roof service clutter using a single instanced batch.
  const roofBoxes = [];
  const roofUnits = [];
  buildings.forEach((b, index) => {
    const x = b.x + (index % 3 - 1) * b.w * .18;
    const z = b.z + (index % 2 ? 1 : -1) * b.d * .16;
    roofBoxes.push({ x, y: b.h + .72, z, sx: 2.8 + (index % 3) * .5, sy: 1.25, sz: 2.2 });
    roofUnits.push({ x: x + b.w * .16, y: b.h + 1.45, z: z + b.d * .12, sx: .8, sy: 1.4, sz: .8 });
  });
  const roofConcrete = new THREE.MeshStandardMaterial({ color: '#8e8b80', roughness: .95 });
  addInstances(new THREE.BoxGeometry(1, 1, 1), roofConcrete, roofBoxes, 'Rooftop utility sheds');
  const tankMat = new THREE.MeshStandardMaterial({ color: '#64716d', roughness: .7, metalness: .24 });
  const tanks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.5, .58, 1, 12), tankMat, roofUnits.length);
  tanks.name = 'Rooftop water tanks';
  roofUnits.forEach((t, i) => {
    dummy.position.set(t.x, t.y, t.z); dummy.scale.set(t.sx, t.sy, t.sz); dummy.updateMatrix(); tanks.setMatrixAt(i, dummy.matrix);
  });
  tanks.instanceMatrix.needsUpdate = true;
  facadeRoot.add(tanks);

  return {
    windows: windowTransforms.reduce((n, list) => n + list.length, 0),
    balconies: balconyDecks.length,
    rooftopProps: roofBoxes.length + roofUnits.length
  };
}
