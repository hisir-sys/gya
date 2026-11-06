// Neon State visual overhaul: procedural PBR surfaces and instanced Kolkata facade detail.
// Keeps the existing world layout, mission coordinates, collision map and gameplay objects intact.
export function upgradeCityVisuals(THREE, city, buildings, renderer) {
  if (!city || !Array.isArray(buildings) || !buildings.length) return { buildings: 0, details: 0 };
  const maxAnisotropy = Math.min(8, renderer?.capabilities?.getMaxAnisotropy?.() || 1);
  const makeCanvasTexture = (paint) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d');
    paint(ctx);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAnisotropy;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  };
  const plasterMap = makeCanvasTexture(ctx => {
    ctx.fillStyle = '#b9a995'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 24000; i++) {
      const v = 95 + Math.random() * 105;
      ctx.fillStyle = 'rgba(' + v + ',' + (v * .91) + ',' + (v * .79) + ',' + (.025 + Math.random() * .09) + ')';
      const s = .5 + Math.random() * 2.4;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, s, s);
    }
    for (let y = 18; y < 512; y += 128) {
      ctx.fillStyle = 'rgba(48,39,32,.10)'; ctx.fillRect(0, y, 512, 2);
    }
  });
  const plasterBump = makeCanvasTexture(ctx => {
    ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 18000; i++) {
      const v = 90 + Math.random() * 76;
      ctx.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  });
  const facadeMaterial = new THREE.MeshStandardMaterial({
    color: '#c9b49a', map: plasterMap, bumpMap: plasterBump, bumpScale: .075,
    roughness: .94, metalness: .015
  });
  // Reuse generated facade materials but add physically based surface response.
  city.traverse(object => {
    if (!object.isMesh || !object.material || object.userData.visualOverhaul) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
        material.roughness = Math.max(material.roughness ?? .7, .62);
        if (material.color && material.color.r > .2 && material.color.g > .2 && material.color.b > .2 &&
            object.geometry?.type === 'BoxGeometry' && (object.geometry.parameters?.height || 0) > 8 && (object.geometry.parameters?.width || 0) > 10) {
          material.map = plasterMap;
          material.bumpMap = plasterBump;
          material.bumpScale = .035;
        }
        material.needsUpdate = true;
      }
    }
    object.userData.visualOverhaul = true;
  });

  const detailRoot = new THREE.Group();
  detailRoot.name = 'Kolkata facade detail · instanced';
  city.add(detailRoot);
  const addInstances = (geometry, material, transforms) => {
    if (!transforms.length) return null;
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    mesh.name = 'Instanced architectural detail';
    const dummy = new THREE.Object3D();
    transforms.forEach((t, index) => {
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(t.rx || 0, t.ry || 0, t.rz || 0);
      dummy.scale.set(t.sx || 1, t.sy || 1, t.sz || 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    detailRoot.add(mesh);
    return mesh;
  };
  const concrete = new THREE.MeshStandardMaterial({ color: '#8e887f', roughness: .96 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: '#343a3a', roughness: .58, metalness: .62 });
  const fadedMetal = new THREE.MeshStandardMaterial({ color: '#77766e', roughness: .72, metalness: .48 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#52717b', roughness: .18, metalness: .42, clearcoat: .8, clearcoatRoughness: .12 });
  const balconySlabs = [], balconyRails = [], acUnits = [], drainPipes = [], lintels = [], roofTanks = [];
  for (const b of buildings) {
    const floors = Math.max(2, Math.floor((b.h - 3) / 4.2));
    const cols = Math.max(2, Math.floor(b.w / 5.2));
    for (let row = 0; row < floors; row++) {
      const y = 3.1 + row * 4.05;
      if (y > b.h - 2) continue;
      for (let col = 0; col < cols; col++) {
        const x = b.x - b.w / 2 + 3.1 + col * ((b.w - 6.2) / Math.max(1, cols - 1));
        lintels.push({ x, y: y + 1.13, z: b.z + b.d / 2 + .27, sx: .92, sy: .055, sz: .09 });
        if (row > 0 && (col + row + Math.round(b.x)) % 3 !== 0) {
          balconySlabs.push({ x, y: y - 1.16, z: b.z + b.d / 2 + .52, sx: .98, sy: .075, sz: .52 });
          balconyRails.push({ x, y: y - .72, z: b.z + b.d / 2 + .76, sx: .92, sy: .045, sz: .045 });
          balconyRails.push({ x: x - .88, y: y - .93, z: b.z + b.d / 2 + .76, sx: .045, sy: .24, sz: .045 });
          balconyRails.push({ x: x + .88, y: y - .93, z: b.z + b.d / 2 + .76, sx: .045, sy: .24, sz: .045 });
          for (let rail = 0; rail < 4; rail++) balconyRails.push({
            x: x - .68 + rail * .45, y: y - .91, z: b.z + b.d / 2 + .76,
            sx: .025, sy: .19, sz: .025
          });
        }
        if ((col + row) % 2 === 0) acUnits.push({
          x: x + .63, y: y - .85, z: b.z + b.d / 2 + .34, sx: .34, sy: .25, sz: .22
        });
      }
    }
    drainPipes.push({ x: b.x - b.w / 2 + .72, y: b.h / 2, z: b.z + b.d / 2 + .27, sx: .055, sy: b.h / 2, sz: .055 });
    drainPipes.push({ x: b.x + b.w / 2 - .72, y: b.h / 2, z: b.z + b.d / 2 + .27, sx: .055, sy: b.h / 2, sz: .055 });
    roofTanks.push({ x: b.x + b.w * .22, y: b.h + 1.1, z: b.z - b.d * .16, sx: 1, sy: 1, sz: 1 });
  }
  addInstances(new THREE.BoxGeometry(1, 1, 1), concrete, balconySlabs);
  addInstances(new THREE.BoxGeometry(1, 1, 1), darkMetal, balconyRails);
  addInstances(new THREE.BoxGeometry(1, 1, 1), fadedMetal, acUnits);
  addInstances(new THREE.BoxGeometry(1, 1, 1), darkMetal, drainPipes);
  addInstances(new THREE.BoxGeometry(1, 1, 1), concrete, lintels);

  // Real-world scale street furniture: warm LED lanterns, poles and utility cross-arms.
  const streetFurniture = new THREE.Group();
  streetFurniture.name = 'Kolkata street furniture';
  city.add(streetFurniture);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: '#343b3d', roughness: .48, metalness: .72 });
  const lampMaterial = new THREE.MeshStandardMaterial({ color: '#ffe0a8', emissive: '#ffb45c', emissiveIntensity: 1.25, roughness: .24 });
  const lampGeometry = new THREE.BoxGeometry(.72, .16, .28);
  const poleGeometry = new THREE.CylinderGeometry(.09, .14, 7.2, 10);
  const positions = [];
  for (let x = -112; x <= 142; x += 42) {
    for (let z = -150; z <= 150; z += 42) {
      if (Math.abs(x % 52) < 15 && Math.abs(z % 52) < 15) continue;
      positions.push([x + 13, z + 13]);
    }
  }
  const poles = new THREE.InstancedMesh(poleGeometry, poleMaterial, positions.length);
  const lamps = new THREE.InstancedMesh(lampGeometry, lampMaterial, positions.length);
  const dummy = new THREE.Object3D();
  positions.forEach(([x, z], i) => {
    dummy.position.set(x, 3.6, z); dummy.updateMatrix(); poles.setMatrixAt(i, dummy.matrix);
    dummy.position.set(x + .45, 7.1, z); dummy.rotation.z = -.12; dummy.updateMatrix(); lamps.setMatrixAt(i, dummy.matrix);
  });
  poles.castShadow = true; lamps.castShadow = false;
  streetFurniture.add(poles, lamps);

  // Sharper material response on the existing road network without replacing its collision geometry.
  let roadMeshes = 0;
  city.traverse(object => {
    if (!object.isMesh || !object.material || object.material === facadeMaterial) return;
    const mats = Array.isArray(object.material) ? object.material : [object.material];
    if (mats.some(m => m.color && m.color.r < .22 && m.color.g < .24 && m.color.b < .28)) {
      for (const m of mats) if (m.roughness !== undefined) { m.roughness = .76; m.metalness = Math.min(m.metalness || 0, .12); }
      roadMeshes++;
    }
  });
  return { buildings: buildings.length, details: balconySlabs.length + balconyRails.length + acUnits.length + drainPipes.length + lintels.length, streetlights: positions.length, roadMeshes };
}

// Adds anatomy and garment structure to the existing player rig. Original animation pivots remain intact.
export function enhanceAvatar(THREE, avatar, shirtColor, box, mat) {
  if (!avatar || avatar.userData.realisticPass) return;
  avatar.userData.realisticPass = true;
  const skin = new THREE.MeshStandardMaterial({ color: '#b98263', roughness: .78 });
  const shirt = new THREE.MeshStandardMaterial({ color: shirtColor || '#4c7081', roughness: .88 });
  const pants = new THREE.MeshStandardMaterial({ color: '#26303a', roughness: .9 });
  const shoe = new THREE.MeshStandardMaterial({ color: '#171b20', roughness: .72 });
  const seam = new THREE.MeshStandardMaterial({ color: '#d5c7ad', roughness: .82 });
  // Preserve the four original pivot groups so the existing walk/run animation still drives the limbs.
  const pivots = avatar.children.filter(child => child.isGroup);
  avatar.children.filter(child => child.isMesh && child.geometry?.type === 'BoxGeometry').forEach(mesh => { mesh.visible = false; });
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.34, .66, 5, 12), shirt);
  torso.position.set(0, 1.72, 0); torso.scale.set(1.12, 1, .82); torso.castShadow = true; avatar.add(torso);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(.2, .055, 8, 18), seam);
  collar.position.set(0, 2.12, .015); collar.rotation.x = Math.PI / 2; avatar.add(collar);
  box(avatar, .12, .48, .035, seam, 0, 1.72, .29, false);
  box(avatar, .68, .075, .06, pants, 0, 1.28, .02, false);
  for (const y of [1.88, 1.7, 1.52]) {
    const button = new THREE.Mesh(new THREE.SphereGeometry(.025, 8, 6), seam);
    button.position.set(0, y, .325); avatar.add(button);
  }
  // Articulated capsule limbs replace the old rectangular blocks without changing their animation pivots.
  pivots.forEach((pivot, index) => {
    pivot.clear();
    const isArm = index < 2;
    const limb = new THREE.Mesh(
      new THREE.CapsuleGeometry(isArm ? .135 : .17, isArm ? .48 : .52, 5, 10),
      isArm ? shirt : pants
    );
    limb.position.y = isArm ? -.43 : -.39;
    limb.castShadow = true; limb.receiveShadow = true; pivot.add(limb);
    if (isArm) {
      const hand = new THREE.Mesh(new THREE.SphereGeometry(.125, 12, 10), skin);
      hand.position.set(0, -.82, .015); hand.castShadow = true; pivot.add(hand);
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(.135, .025, 6, 14), seam);
      cuff.position.y = -.76; cuff.rotation.x = Math.PI / 2; pivot.add(cuff);
    } else {
      box(pivot, .34, .16, .52, shoe, 0, -.77, .09, false);
      box(pivot, .35, .055, .54, seam, 0, -.85, .09, false);
    }
  });
  // Retain the original head and hair spheres, then add facial structure and ears.
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(.075, 10, 8), skin);
    ear.position.set(side * .335, 2.61, 0); avatar.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 6), new THREE.MeshStandardMaterial({ color: '#202329', roughness: .4 }));
    eye.position.set(side * .12, 2.64, .303); avatar.add(eye);
    const brow = box(avatar, .11, .025, .025, pants, side * .12, 2.71, .30, false);
    brow.rotation.z = side * -.08;
  }
  const nose = new THREE.Mesh(new THREE.SphereGeometry(.055, 8, 6), skin);
  nose.scale.set(.7, .85, 1.2); nose.position.set(0, 2.56, .34); avatar.add(nose);
  const hairline = new THREE.Mesh(new THREE.SphereGeometry(.35, 18, 10, 0, Math.PI * 2, 0, Math.PI * .25), pants);
  hairline.position.set(0, 2.77, .02); avatar.add(hairline);
}
