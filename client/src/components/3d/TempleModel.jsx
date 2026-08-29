// Stylized procedural reconstruction — not an archaeological digital twin.
// Built from primitive geometry for hackathon prototype performance and licensing simplicity.

import React, { forwardRef, useMemo } from "react";
import * as THREE from "three";

// Approximate world-space anchor points for hotspot placement, matching (in spirit)
// the positions defined in hotspots.json elsewhere in the project.
export const TEMPLE_ANCHOR_POINTS = {
  "nandi-bull": { x: 1.8, y: 0.9, z: 2.2 },
  "main-vimana": { x: 0, y: 8.2, z: 0 },
  "vishnu-shrine": { x: 2.1, y: 1.9, z: -2.1 },
  "coastal-erosion": { x: 0, y: 0.4, z: 3.0 },
  "boundary-wall-carvings": { x: 3.0, y: 0.5, z: 0 },
};

// Number of tapering tiers that make up the main vimana tower.
const TOWER_TIERS = 5;
// Number of Nandi sculptures lining the inside of the courtyard wall.
const NANDI_COUNT = 8;

const TempleModel = forwardRef((_props, ref) => {
  // --- Materials (kept to exactly 2 instances to minimize draw calls) ---
  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#96795f",
        roughness: 0.75,
        metalness: 0,
      }),
    []
  );

  const weatheredMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7d6650",
        roughness: 0.8,
        metalness: 0,
      }),
    []
  );

  // --- Shared geometry for the Nandi row (single geometry, reused via instances) ---
  const nandiGeometry = useMemo(() => new THREE.BoxGeometry(0.32, 0.3, 0.42), []);

  // --- Tower tier layout: each tier smaller than the last, stacked to form a
  // stepped pyramid (vimana). Tier 0 sits directly on the base platform. ---
  const towerTiers = useMemo(() => {
    const tiers = [];
    let width = 3.5;
    let depth = 3.5;
    const tierHeight = 1.8;
    let y = 0.4 + tierHeight / 2; // start just above the base platform top
    for (let i = 0; i < TOWER_TIERS; i++) {
      tiers.push({ width, depth, height: tierHeight, y });
      y += tierHeight; // next tier sits on top of this one
      width *= 0.82; // shrink ~18% each tier
      depth *= 0.82;
    }
    return tiers;
  }, []);

  const topTier = towerTiers[towerTiers.length - 1];
  const finialY = topTier.y + topTier.height / 2 + 0.4;

  // --- Nandi row positions: evenly spaced along the inside of the +Z courtyard wall ---
  const nandiPositions = useMemo(() => {
    const positions = [];
    const spanStart = -2.4;
    const spanEnd = 2.4;
    const step = (spanEnd - spanStart) / (NANDI_COUNT - 1);
    for (let i = 0; i < NANDI_COUNT; i++) {
      positions.push([spanStart + i * step, 0.55, 2.3]);
    }
    return positions;
  }, []);

  return (
    <group ref={ref}>
      {/* --- Base platform: two stacked slabs, lower larger, upper smaller --- */}
      <mesh position={[0, 0.2, 0]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[6, 0.4, 6]} />
      </mesh>
      <mesh position={[0, 0.6, 0]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[5, 0.4, 5]} />
      </mesh>

      {/* --- Main vimana tower: stacked, progressively smaller tiers --- */}
      {towerTiers.map((tier, i) => (
        <group key={`tier-${i}`}>
          <mesh position={[0, tier.y, 0]} material={stoneMaterial} castShadow receiveShadow>
            <boxGeometry args={[tier.width, tier.height, tier.depth]} />
          </mesh>
          {/* Slight outward-flared lip at the base of each tier, suggesting cornice detail */}
          <mesh
            position={[0, tier.y - tier.height / 2 + 0.06, 0]}
            material={stoneMaterial}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[tier.width * 1.12, 0.12, tier.depth * 1.12]} />
          </mesh>
        </group>
      ))}

      {/* --- Finial atop the final tier --- */}
      <mesh position={[0, finialY, 0]} material={stoneMaterial} castShadow>
        <sphereGeometry args={[0.5, 12, 10]} />
      </mesh>

      {/* --- Secondary shrine volumes (Shiva / Vishnu shrines) attached to the tower base --- */}
      <mesh position={[2.4, 1.9, 0]} material={stoneMaterial} castShadow receiveShadow>
        <boxGeometry args={[2, 3, 2]} />
      </mesh>
      <mesh position={[0, 1.9, -2.4]} material={stoneMaterial} castShadow receiveShadow>
        <boxGeometry args={[2, 3, 2]} />
      </mesh>

      {/* --- Courtyard wall: four thin perimeter walls with a gap for an entrance --- */}
      {/* North wall (full) */}
      <mesh position={[0, 0.5, -3]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[6.2, 1, 0.2]} />
      </mesh>
      {/* South wall — split in two to leave a center entrance gap */}
      <mesh position={[-2.3, 0.5, 3]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1, 0.2]} />
      </mesh>
      <mesh position={[2.3, 0.5, 3]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1, 0.2]} />
      </mesh>
      {/* East wall */}
      <mesh position={[3, 0.5, 0]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.2, 1, 6.2]} />
      </mesh>
      {/* West wall */}
      <mesh position={[-3, 0.5, 0]} material={weatheredMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.2, 1, 6.2]} />
      </mesh>

      {/* --- Nandi row: shapes share one geometry and one material instance --- */}
      {nandiPositions.map((pos, i) => (
        <mesh
          key={`nandi-${i}`}
          position={pos}
          geometry={nandiGeometry}
          material={stoneMaterial}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
});

TempleModel.displayName = "TempleModel";

export default TempleModel;
