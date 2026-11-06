import { EffectComposer, RenderPass, EffectPass, BloomEffect, SSAOEffect } from 'postprocessing';

export function createGameEffects({ renderer, scene, camera }) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const ssao = new SSAOEffect(camera, {
    samples: 16,
    rings: 4,
    distanceThreshold: 0.08,
    distanceFalloff: 0.015,
    rangeThreshold: 0.0001,
    rangeFalloff: 0.0001,
    luminanceInfluence: 0.7,
    radius: 10,
    bias: 0.025
  });
  const bloom = new BloomEffect({
    intensity: 0.48,
    luminanceThreshold: 0.82,
    luminanceSmoothing: 0.18,
    mipmapBlur: true
  });
  const ssaoPass = new EffectPass(camera, ssao);
  const bloomPass = new EffectPass(camera, bloom);
  composer.addPass(ssaoPass);
  composer.addPass(bloomPass);

  let quality = 'HIGH';
  function setQuality(next) {
    quality = next;
    ssaoPass.enabled = next === 'ULTRA' || next === 'EXTREME';
    bloomPass.enabled = next !== 'PERFORMANCE';
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
  }
  function resize() {
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
  }
  setQuality(quality);
  return {
    render() { composer.render(); },
    setQuality,
    resize,
    dispose() { composer.dispose(); }
  };
}
