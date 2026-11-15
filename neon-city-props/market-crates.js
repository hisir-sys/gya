export function install(THREE, city) {
 const g=new THREE.Group();g.name='Market produce crates';g.position.set(58,0,59);
 const wood=new THREE.MeshStandardMaterial({color:'#8a6748',roughness:.95}),produce=['#bd7650','#8b9a56','#d4b15d'].map(color=>new THREE.MeshStandardMaterial({color}));
 for(let i=0;i<6;i++){const x=(i%3)*.9,y=Math.floor(i/3)*.65;const c=new THREE.Mesh(new THREE.BoxGeometry(.78,.58,.72),wood);c.position.set(x,y+.3,0);g.add(c);for(let n=0;n<5;n++){const p=new THREE.Mesh(new THREE.SphereGeometry(.12,7,6),produce[(i+n)%3]);p.position.set(x-.25+(n%3)*.23,y+.65,.1);g.add(p)}}
 city.add(g);return g;
}