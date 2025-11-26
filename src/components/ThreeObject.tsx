import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useAnimations,
} from '@react-three/drei'
import * as THREE from 'three'
import { useSpotifyPlaying } from '../hooks/useSpotifyPlaying'

interface ThreeObjectProps {
  themeId: 'brutalism' | 'liquidGlass'
}

interface RotatingObjectProps {
  modelPath: string
}

function RotatingObject({ modelPath }: RotatingObjectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(modelPath)
  const { actions, mixer } = useAnimations(animations, groupRef)

  // Set up clipping plane to show more of the model
  useEffect(() => {
    if (scene) {
      // Create a clipping plane that cuts off only the very bottom - show most of the body
      // Normal pointing up (0, 1, 0) with constant to clip below y = -2.5 (very low, near feet)
      const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.5)

      // Apply clipping to all meshes in the scene
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Enable clipping
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.clippingPlanes = [clippingPlane]
                mat.clipShadows = true
              })
            } else {
              child.material.clippingPlanes = [clippingPlane]
              child.material.clipShadows = true
            }
          }
        }
      })
    }
  }, [scene])

  // Play and loop animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play all available animations and loop them
      Object.values(actions).forEach((action) => {
        if (action) {
          action.setLoop(THREE.LoopRepeat, Infinity)
          action.timeScale = 0.5 // Slow down animation to 50% speed
          action.play()
        }
      })
    }
  }, [actions])

  useFrame((_, delta) => {
    // Update animation mixer - this is crucial for animations to play
    if (mixer) {
      mixer.update(delta)
    }
  })

  if (!scene) {
    return null
  }

  return (
    <group
      ref={groupRef}
      position={[0, -1.65, 0]} // Adjusted to center the model better vertically
    >
      <primitive object={scene} />
    </group>
  )
}

// Helper function to create a canvas texture with a pattern
function createPatternTexture(
  baseColor: string,
  patternType:
    | 'diagonal'
    | 'grid'
    | 'dots'
    | 'checkerboard'
    | 'circles'
    | 'hexagons'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  // Base color
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 512, 512)

  switch (patternType) {
    case 'diagonal':
      // Diagonal stripes with pink
      ctx.strokeStyle = '#FF6F91'
      ctx.lineWidth = 8
      for (let i = -512; i < 512; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + 512, 512)
        ctx.stroke()
      }
      // Add grid overlay
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 2
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 512)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(512, i)
        ctx.stroke()
      }
      break

    case 'grid':
      // Bold grid pattern
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 4
      for (let i = 0; i < 512; i += 48) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 512)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(512, i)
        ctx.stroke()
      }
      // Add colored squares
      ctx.fillStyle = '#2EC4B6'
      ctx.fillRect(64, 64, 96, 96)
      ctx.fillRect(352, 352, 96, 96)
      ctx.fillStyle = '#FF6F91'
      ctx.fillRect(352, 64, 96, 96)
      ctx.fillRect(64, 352, 96, 96)
      break

    case 'dots':
      // Dot pattern
      ctx.fillStyle = '#111'
      for (let x = 0; x < 512; x += 48) {
        for (let y = 0; y < 512; y += 48) {
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      // Add colored circles
      ctx.fillStyle = '#FFB6C1'
      ctx.beginPath()
      ctx.arc(128, 128, 32, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#2EC4B6'
      ctx.beginPath()
      ctx.arc(384, 384, 40, 0, Math.PI * 2)
      ctx.fill()
      break

    case 'checkerboard': {
      // Checkerboard pattern
      const squareSize = 32
      for (let x = 0; x < 512; x += squareSize) {
        for (let y = 0; y < 512; y += squareSize) {
          if ((x / squareSize + y / squareSize) % 2 === 0) {
            ctx.fillStyle = '#FF6F91'
            ctx.fillRect(x, y, squareSize, squareSize)
          } else {
            ctx.fillStyle = '#2EC4B6'
            ctx.fillRect(x, y, squareSize, squareSize)
          }
        }
      }
      // Add border
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 4
      ctx.strokeRect(0, 0, 512, 512)
      break
    }

    case 'circles':
      // Concentric circles
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 3
      for (let r = 32; r < 256; r += 32) {
        ctx.beginPath()
        ctx.arc(256, 256, r, 0, Math.PI * 2)
        ctx.stroke()
      }
      // Fill some circles
      ctx.fillStyle = '#FFB6C1'
      ctx.beginPath()
      ctx.arc(128, 128, 48, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#2EC4B6'
      ctx.beginPath()
      ctx.arc(384, 384, 56, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#FF6F91'
      ctx.beginPath()
      ctx.arc(256, 128, 40, 0, Math.PI * 2)
      ctx.fill()
      break

    case 'hexagons': {
      // Hexagon pattern
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 3
      const hexSize = 40
      for (let y = 0; y < 512; y += hexSize * 1.5) {
        for (let x = 0; x < 512; x += hexSize * Math.sqrt(3)) {
          const offsetX =
            (y / (hexSize * 1.5)) % 2 === 0 ? 0 : (hexSize * Math.sqrt(3)) / 2
          drawHexagon(ctx, x + offsetX, y, hexSize)
        }
      }
      // Fill some hexagons
      ctx.fillStyle = '#2EC4B6'
      drawHexagon(ctx, 128, 128, hexSize, true)
      ctx.fillStyle = '#FF6F91'
      drawHexagon(ctx, 384, 256, hexSize, true)
      break
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

// Helper to draw hexagon
function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  fill = false
) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const hx = x + size * Math.cos(angle)
    const hy = y + size * Math.sin(angle)
    if (i === 0) {
      ctx.moveTo(hx, hy)
    } else {
      ctx.lineTo(hx, hy)
    }
  }
  ctx.closePath()
  if (fill) {
    ctx.fill()
  } else {
    ctx.stroke()
  }
}

function BrutalistBackground() {
  const cylinderRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!cylinderRef.current) return

    // Create the diagonal stripes pattern (first texture)
    const texture = createPatternTexture('#FCEE4B', 'diagonal')

    // Adjust texture repeat for better wrapping around cylinder
    texture.repeat.set(4, 2)

    // Apply texture to cylinder
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide, // Render inside the cylinder
    })
    cylinderRef.current.material = material
  }, [])

  return (
    <mesh ref={cylinderRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[4, 4, 8, 64, 1, true]} />
    </mesh>
  )
}

export function ThreeObject({ themeId }: ThreeObjectProps) {
  // Check if music is playing to determine which model to use
  const isMusicPlaying = useSpotifyPlaying()
  // Use model_animated_2.glb when music is playing, model_animated_3.glb by default
  const modelPath = isMusicPlaying
    ? '/model_animated_2.glb'
    : '/model_animated_3.glb'

  return (
    <div className="relative h-full w-full rounded-[1.5rem] border-[3px] border-black bg-white shadow-[8px_8px_0_0_#111] sm:rounded-[2.5rem] sm:border-4 sm:shadow-[18px_18px_0_0_#111] overflow-hidden">
      <Canvas
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          alpha: false,
          localClippingEnabled: true,
        }}
        onCreated={({ gl }) => {
          if (themeId === 'brutalism') {
            gl.setClearColor('#FCEE4B', 1)
          } else {
            gl.setClearColor('#000000', 1)
          }
        }}>
        {/* Camera adjusted to show more vertical area while maintaining current size */}
        <PerspectiveCamera makeDefault position={[0, 0, 1.35]} fov={20} />

        {/* Improved lighting setup */}
        <ambientLight intensity={themeId === 'brutalism' ? 1.2 : 0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} />
        <pointLight position={[0, 5, 0]} intensity={0.6} />
        {themeId === 'liquidGlass' && (
          <spotLight
            position={[0, 8, 2]}
            angle={0.4}
            penumbra={0.5}
            intensity={1.2}
            castShadow
          />
        )}
        {themeId === 'brutalism' && <BrutalistBackground />}
        {/* Use key prop to force re-mount when model changes for smooth switching */}
        <RotatingObject key={modelPath} modelPath={modelPath} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Label - yellow badge, positioned at bottom right */}
      {themeId === 'brutalism' && (
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-10">
          <div className="inline-block rounded-md border-[2.5px] border-black bg-[#FCEE4B] px-1.5 py-0.5 text-[0.6rem] font-black uppercase tracking-wider text-[#111] shadow-[3px_3px_0_0_#111] sm:text-xs sm:px-2 sm:py-1">
            Drag to Rotate
          </div>
        </div>
      )}

      {themeId === 'liquidGlass' && (
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-10">
          <div className="inline-block rounded-md border border-white/40 bg-amber-400/30 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-amber-50 backdrop-blur-sm shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:text-xs sm:px-2 sm:py-1">
            Drag to Rotate
          </div>
        </div>
      )}
    </div>
  )
}
