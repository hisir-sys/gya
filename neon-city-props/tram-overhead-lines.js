export function install(THREE, city) {
 const g=new THREE.Group();g.name='Tram overhead catenary';
 const wire=new THREE.MeshBasicMaterial({color:'#46585a'});
 for(const z of [-150,-90,-30,30,90,150]){const a=new THREE.Vector3(-1,8,z),b=new THREE.Vector3(-1,8,z+30);const d=new THREE.Vector3().subVectors(b,a);const m=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,d.length(),5),wire);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());g.add(m)}
 city.add(g);return g;
}