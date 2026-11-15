export function install(THREE, city) {
 const g=new THREE.Group();g.name='Tram stop shelter';g.position.set(8,0,-86);
 const metal=new THREE.MeshStandardMaterial({color:'#344b4a',metalness:.55,roughness:.5}),roof=new THREE.MeshStandardMaterial({color:'#b77b51',roughness:.75});
 const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;g.add(m)};
 add(new THREE.BoxGeometry(8,.22,2.8),roof,0,3.1,0);for(const x of [-3.6,3.6])add(new THREE.BoxGeometry(.14,3,.14),metal,x,1.5,0);
 add(new THREE.BoxGeometry(6,.12,.5),metal,0,1.2,-.8);city.add(g);return g;
}