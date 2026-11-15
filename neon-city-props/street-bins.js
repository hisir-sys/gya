export function install(THREE, city) {
 const g=new THREE.Group();g.name='Public litter bins';const metal=new THREE.MeshStandardMaterial({color:'#52645e',metalness:.45,roughness:.65}),lid=new THREE.MeshStandardMaterial({color:'#c5a56d',metalness:.25});
 for(const [x,z] of [[-42,52],[52,8],[104,104],[-124,-20],[158,-148]]){const bin=new THREE.Mesh(new THREE.CylinderGeometry(.42,.48,1.15,12),metal);bin.position.set(x,.58,z);g.add(bin);const top=new THREE.Mesh(new THREE.CylinderGeometry(.46,.46,.12,12),lid);top.position.set(x,1.2,z);g.add(top)}
 city.add(g);return g;
}