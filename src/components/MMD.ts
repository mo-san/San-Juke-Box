import * as THREE from "three";

import { MMDLoader, MMDAnimationHelper, MeshSurfaceSampler } from "three-stdlib";
import { MmdModelData, MmdPoseData, MmdModelName, MmdMotionName } from "../@types/types";
import { modelFiles, motionFiles } from "../data/MmdModels";


class MMDHandler {
  loader = new MMDLoader();
  helper = new MMDAnimationHelper();

  /** the data of the all MMD models */
  mmdModels: Map<MmdModelName, MmdModelData>;

  protected poseObjects: MmdPoseData[] = [];

  constructor() {
    this.mmdModels = new Map(Array.from(modelFiles.keys()).map((name) =>
      [
        name,
        {
          name: name,
          url: modelFiles.get(name) as string,
          modelMesh: null,
          morphs: {},
          mortions: [],
          poseIndex: -1,
        }
      ]
    ));
  }

  loadMmdModel = async (modelName: MmdModelName) => {
    // if a model of the name is already loaded, return that
    const _mesh = this.findModelByName(modelName).modelMesh;
    if (_mesh) return _mesh;

    return await this.#_loadMmdModel(modelName);
  }

  #_loadMmdModel = async (modelName: MmdModelName): Promise<THREE.SkinnedMesh> => {
    const modelData = this.findModelByName(modelName);
    const mesh = await this.loader.loadAsync(modelData.url);
    mesh.name = modelName;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    modelData.modelMesh = mesh;
    this.helper.add(mesh, { animation: modelData.mortions.map((action) => action.getClip()) });
    return mesh;
  };

  loadMotion = async (modelName: MmdModelName, mesh: THREE.SkinnedMesh) => {
    await Promise.all(Array.from(motionFiles).map(async ([name, path]) =>
      new Promise((resolve) => {
        this.loader.loadAnimation(path, mesh, (animation) => {
          const mixer = this.helper.objects.get(mesh)!.mixer as THREE.AnimationMixer;
          // いったん全てのモーションを止める
          mixer.stopAllAction();

          animation.name = name;
          const action = mixer.clipAction(animation as THREE.AnimationClip);
          this.findModelByName(modelName).mortions.push(action);
          resolve(true);
        });
      })
    ));
  }

  loadPoses = (vpdFilePaths: string[]) => {
    vpdFilePaths.forEach(async (vpd) => {
      this.loader.loadVPD(vpd, false, (vpdObj) => this.poseObjects.push(vpdObj as MmdPoseData));
    });
  }

  findModelByName = (modelName: MmdModelName) => {
    return this.mmdModels.get(modelName) as MmdModelData;
  }

  findMotion = (modelName: MmdModelName, name: MmdMotionName) => {
    return this.findModelByName(modelName).mortions.find((action) => action.getClip().name === name) as THREE.AnimationAction;
  }

  setBpm = (modelName: MmdModelName, motioName: MmdMotionName, bpm: number) => {
    const motion = this.findMotion(modelName, motioName);
    motion.timeScale = Math.round(bpm / 120);
  }

  updatePose = (modelName: MmdModelName, index: number) => {
    const mesh = this.findModelByName(modelName).modelMesh;
    if (!mesh) return;
    if (index === -1) {
      mesh.pose();
    } else {
      this.helper.pose(mesh, this.poseObjects[index]);
    }
  }

  updateMorph = (modelName: MmdModelName, morphName: string, value: number) => {
    const model = this.findModelByName(modelName);
    if (!model.modelMesh || !model.modelMesh.morphTargetInfluences) return;

    const index = Object.keys(model.morphs).indexOf(morphName);
    model.modelMesh.morphTargetInfluences[index] = value;
  }

  blink = (modelName: MmdModelName, percentage: number) => {
    this.updateMorph(modelName, "まばたき", percentage);
  }

  mouthFlap = (modelName: MmdModelName, percentage: number) => {
    this.updateMorph(modelName, "あ", percentage);
  }

  getGeometryPosition(mesh: THREE.Mesh, flat: boolean) {
    /**
     * - Create an array used to store all points coordinates
     * - Create a dummy Vector to store the sampled coordinates
     * - Loop to sample a coordinate for each points
     * - Sample a random position in the torus
     * - Push the coordinates of the sampled coordinates into the array
     */
    const numParticles = 3000;
    const sampler = new MeshSurfaceSampler(mesh).build();
    const particlesPosition = new Float32Array(numParticles * 3);
    const newPosition = new THREE.Vector3();
    for (let i = 0; i < numParticles; i++) {
      sampler.sample(newPosition);
      particlesPosition.set([flat ? 0 : newPosition.x, flat ? 0 : newPosition.y, flat ? 0 : newPosition.z], i * 3);
    }

    return particlesPosition;
  }

  createSampler = (model: THREE.SkinnedMesh, modelName: MmdModelName) => {
    const color = {
      nendo_miku: [0, 0.882, 0.776],
      nendo_kaito: [0, 0.333, 0.678],
      nendo_meiko: [1.0, 0.117, 0.0],
      nendo_rin: [1.0, 0.984, 0.0],
      nendo_len: [1.0, 0.6, 0.0],
      nendo_luka: [1.0, 0.0, 0.866],
    };

    const vertexShaderForSampler = `
      attribute vec3 position;
      attribute vec3 secondPosition;
      uniform float progress;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      
      void main() {
        vec3 transit = mix(position, secondPosition, progress);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transit, 1.0 );
        gl_PointSize = 6.0;
      }
      `;

    const fragmentShaderForSampler = `
      precision mediump float;
      
      void main() {
        vec2 temp = gl_PointCoord - vec2(0.5);
        float f = dot(temp, temp);
        if (f > 0.25) discard;
        // gl_FragColor = vec4(0.879, 0.4, 0.4, 1.0);
        gl_FragColor = vec4(${color[modelName][0]}, ${color[modelName][1]}, ${color[modelName][2]}, 1.0);
      }`;

    const firstMesh = new THREE.Mesh(new THREE.SphereBufferGeometry().toNonIndexed(), new THREE.MeshBasicMaterial());
    const firstPos = this.getGeometryPosition(firstMesh, true);
    const secondPos = this.getGeometryPosition(model, false);

    const uniforms = {
      progress: { type: "f", value: 0.0 },
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShaderForSampler,
      fragmentShader: fragmentShaderForSampler,
      uniforms: uniforms,
    });

    /**
     * - Create a geometry for the points
     * - Define all points positions from the previously created array
     * - Define the matrial of the points
     * - Create an instance of points based on the geometry & material
     */
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(firstPos, 3));
    geometry.setAttribute("secondPosition", new THREE.Float32BufferAttribute(secondPos, 3));

    return new THREE.Points(geometry, material);
  }
}

export const MMD = new MMDHandler();
