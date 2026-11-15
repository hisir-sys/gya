export function install(THREE, city) {
 const g=new THREE.Group();g.name='Bus shelter';g.position.set(66,0,18);
 const frame=new THREE.MeshStandardMaterial({color:'#344b4a',metalness:.45,roughness:.55}),glass=new THREE.MeshPhysicalMaterial({color:'#8eb6b5',transparent:true,opacity:.22,roughness:.15});
 const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);g.add(m)};
 add(new THREE.BoxGeometry(7,.18,2.8),frame,0,3,0);for(const x of [-3.3,3.3])add(new THREE.BoxGeometry(.12,3,.12),frame,x,1.5,0);
 add(new THREE.BoxGeometry(6,2.2,.06),glass,0,1.6,-1.2);add(new THREE.BoxGeometry(5,.16,.6),frame,0,1,0);city.add(g);return g;
}