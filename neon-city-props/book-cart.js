export function install(THREE, city) {
 const g=new THREE.Group();g.name='College Street book cart';g.position.set(5,0,-132);
 const wood=new THREE.MeshStandardMaterial({color:'#79553a',roughness:.92}),paper=['#b9a17b','#879c9c','#b67a62'].map(color=>new THREE.MeshStandardMaterial({color,roughness:.95}));
 const deck=new THREE.Mesh(new THREE.BoxGeometry(2.4,.18,1.3),wood);deck.position.y=.9;g.add(deck);
 for(let i=0;i<9;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.18,.75,.82),paper[i%3]);b.position.set(-.95+i*.24,1.35,0);g.add(b)}
 for(const x of [-.8,.8]){const w=new THREE.Mesh(new THREE.TorusGeometry(.32,.06,8,18),wood);w.position.set(x,.38,.5);w.rotation.y=Math.PI/2;g.add(w)}
 city.add(g);return g;
}