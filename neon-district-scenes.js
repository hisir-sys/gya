// Procedural landmarks for the four new explorable Kolkata districts.
export function buildNewDistrictScenes(THREE, scene, city, buildings, box, mat, regions) {
  if (!THREE || !scene || !city || !Array.isArray(buildings)) return [];
  const built = [];
  const addWalk = (x, z, width, depth, color) => {
    const mesh = box(city, width, .12, depth, mat(color, .96), x, -.04, z, false);
    mesh.receiveShadow = true;
  };
  const addBlock = (x, z, width, depth, height, color) => {
    const mesh = box(city, width, height, depth, mat(color, .9), x, height / 2, z, true);
    buildings.push({ x, z, w: width, d: depth, h: height });
    return mesh;
  };
  for (const region of regions) {
    const { x, z, id, palette, accent } = region;
    if (id === 'kumartuli') {
      addWalk(x, z, 54, 54, '#8d806c');
      for (let n = 0; n < 6; n++) {
        const a = n * Math.PI / 3;
        addBlock(x + Math.cos(a) * 28, z + Math.sin(a) * 28, 9, 8, 10 + (n % 3) * 2, palette[n % palette.length]);
      }
      const courtyard = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 6.4, .35, 24), mat('#b98b65', .94));
      courtyard.position.set(x, .12, z); city.add(courtyard);
      for (let n = 0; n < 4; n++) {
        const sculpture = new THREE.Mesh(new THREE.ConeGeometry(1.15, 3.4, 8), mat('#c58f70', .98));
        sculpture.position.set(x - 4.5 + n * 3, 1.9, z + 1.5); city.add(sculpture);
      }
    } else if (id === 'sector-v') {
      addWalk(x, z, 58, 58, '#68777d');
      for (let n = 0; n < 4; n++) {
        const bx = x - 25 + n * 16;
        const tower = addBlock(bx, z + (n % 2 ? 24 : -24), 10, 10, 25 + (n % 3) * 6, palette[n % palette.length]);
        tower.material = new THREE.MeshPhysicalMaterial({ color: palette[n % palette.length], roughness: .2, metalness: .28, clearcoat: .9, transparent: true, opacity: .96 });
        const crown = box(city, 10.6, .45, 10.6, mat(accent, .35, .2), bx, tower.position.y + tower.geometry.parameters.height / 2, tower.position.z, false);
        crown.material.emissive?.set?.(accent);
      }
      const plaza = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, .25, 32), mat('#a9b8bb', .62, .12));
      plaza.position.set(x, .08, z); city.add(plaza);
    } else if (id === 'south-lakes') {
      addWalk(x, z, 58, 58, '#9b927d');
      const lake = new THREE.Mesh(new THREE.CircleGeometry(17, 48), new THREE.MeshPhysicalMaterial({ color: '#477f83', roughness: .16, metalness: .16, clearcoat: 1, clearcoatRoughness: .08 }));
      lake.rotation.x = -Math.PI / 2; lake.position.set(x, .015, z); city.add(lake);
      for (let n = 0; n < 12; n++) {
        const a = n * Math.PI / 6;
        const post = box(city, .18, 1.2, .18, mat('#625c4d', .85), x + Math.cos(a) * 19, .6, z + Math.sin(a) * 19, false);
        post.rotation.y = -a;
      }
      for (const side of [-1, 1]) {
        addBlock(x + side * 29, z - 22, 8, 7, 8, palette[side < 0 ? 0 : 1]);
        addBlock(x + side * 29, z + 22, 8, 7, 8, palette[2]);
      }
    } else if (id === 'eco-park') {
      addWalk(x, z, 60, 60, '#78906e');
      const pond = new THREE.Mesh(new THREE.CircleGeometry(18, 48), new THREE.MeshPhysicalMaterial({ color: '#4b8586', roughness: .2, metalness: .1, clearcoat: .8 }));
      pond.rotation.x = -Math.PI / 2; pond.position.set(x, .02, z); city.add(pond);
      for (let n = 0; n < 5; n++) {
        const a = n * Math.PI * 2 / 5;
        const tree = new THREE.Group();
        tree.position.set(x + Math.cos(a) * 27, 0, z + Math.sin(a) * 27);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.35, .55, 4.2, 8), mat('#6c5946', .96));
        trunk.position.y = 2.1; tree.add(trunk);
        const crown = new THREE.Mesh(new THREE.SphereGeometry(3.1, 12, 9), mat('#65875b', .98));
        crown.position.y = 5.2; crown.scale.y = .8; tree.add(crown); city.add(tree);
      }
      const sculpture = new THREE.Mesh(new THREE.TorusKnotGeometry(3.2, .65, 96, 12), new THREE.MeshStandardMaterial({ color: accent, metalness: .42, roughness: .3 }));
      sculpture.position.set(x, 5, z); city.add(sculpture);
    }
    built.push({ id, center: { x, z } });
  }
  return built;
}
