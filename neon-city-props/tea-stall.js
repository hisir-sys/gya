export function install(THREE, city) {
 const g=new THREE.Group();g.name='Kolkata tea stall';g.position.set(28,0,-72);
 const wood=new THREE.MeshStandardMaterial({color:'#80583d',roughness:.9}),tin=new THREE.MeshStandardMaterial({color:'#8d9690',metalness:.55,roughness:.7}),tea=new THREE.MeshStandardMaterial({color:'#bd874c',roughness:.3});
 const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;g.add(m)};
 add(new THREE.BoxGeometry(4,1.8,2),wood,0,.9,0);add(new THREE.BoxGeometry(4.4,.16,2.4),tin,0,2,0);for(let x=-1.2;x<=1.2;x+=.8)add(new THREE.CylinderGeometry(.12,.12,.08,12),tea,x,1.95,.3);
 city.add(g);return g;
}