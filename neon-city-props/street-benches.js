export function install(THREE, city) {
 const g=new THREE.Group();g.name='Maidan park benches';
 const wood=new THREE.MeshStandardMaterial({color:'#806044',roughness:.88}),iron=new THREE.MeshStandardMaterial({color:'#343c3c',metalness:.65,roughness:.5});
 for(const [x,z] of [[76,112],[94,104],[108,120],[-80,118]]){const b=new THREE.Group();b.position.set(x,0,z);const seat=new THREE.Mesh(new THREE.BoxGeometry(3,.16,.65),wood);seat.position.y=.8;b.add(seat);const back=new THREE.Mesh(new THREE.BoxGeometry(3,.85,.14),wood);back.position.set(0,1.25,-.25);b.add(back);for(const sx of [-1.2,1.2]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.12,.8,.12),iron);leg.position.set(sx,.4,0);b.add(leg)}g.add(b)}
 city.add(g);return g;
}