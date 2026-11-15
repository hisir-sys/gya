export function install(THREE, city) {
 const g=new THREE.Group();g.name='Striped market awning';g.position.set(52,0,54);
 const colors=['#a34e3e','#e4d1a7'].map(color=>new THREE.MeshStandardMaterial({color,roughness:.85}));
 for(let i=0;i<8;i++){const panel=new THREE.Mesh(new THREE.BoxGeometry(.9,.12,2.5),colors[i%2]);panel.position.set(-3.15+i*.9,3.7,0);panel.rotation.x=-.12;g.add(panel)}
 city.add(g);return g;
}