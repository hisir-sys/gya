export function install(THREE, city) {
 const g=new THREE.Group();g.name='Flower stall';g.position.set(-88,0,42);
 const wood=new THREE.MeshStandardMaterial({color:'#79563d'}),petals=['#e5a45b','#d47d83','#e8d7a0'].map(color=>new THREE.MeshStandardMaterial({color}));
 const base=new THREE.Mesh(new THREE.BoxGeometry(3.2,.9,1.8),wood);base.position.y=.45;g.add(base);
 for(let i=0;i<18;i++){const flower=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),petals[i%3]);flower.position.set(-1.3+(i%6)*.5,1.05+Math.floor(i/6)*.12,-.5+Math.floor(i/6)*.45);g.add(flower)}
 city.add(g);return g;
}