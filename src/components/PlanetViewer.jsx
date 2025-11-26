"use client"
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import * as THREE from "three"

const PlanetViewer = ({ selectedPlanet }) => {
    const canvasRef = useRef(null)
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)
    const sceneRef = useRef(null)
    const textureLoaderRef = useRef(null)
    const updateRendererSizeRef = useRef(null)

    // Function to update renderer size
    const updateRendererSize = useCallback(() => {
        if (!canvasRef.current || !cameraRef.current || !rendererRef.current)
            return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const width = rect.width || window.innerWidth
        const height = rect.height || window.innerHeight

        if (!width || !height) return

        const aspectRatio = width / height

        // Update camera aspect ratio
        cameraRef.current.aspect = aspectRatio
        cameraRef.current.updateProjectionMatrix()

        // Update renderer size
        rendererRef.current.setSize(width, height)

        // Re-render if we have a scene
        if (sceneRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
    }, [])

    // Store function in ref
    useEffect(() => {
        updateRendererSizeRef.current = updateRendererSize
    }, [updateRendererSize])

    // Planet data
    const planets = [
        {
            name: "Mercury",
            diameter: 4879,
            distance: 58,
            color: 0xffd700,
            size: 0.8,
            texture: "/planets/2k_mercury.jpg",
            facts: [
                "Smallest planet in our solar system",
                "Closest planet to the Sun",
                "No atmosphere, extreme temperatures",
                "Year: 88 Earth days",
                "Day: 59 Earth days",
            ],
        },
        {
            name: "Venus",
            diameter: 12104,
            distance: 108,
            color: 0xffa500,
            size: 1.2,
            texture: "/planets/2k_venus_atmosphere.jpg",
            facts: [
                "Hottest planet in our solar system",
                "Thick, toxic atmosphere",
                "Similar size to Earth",
                "Rotates backwards",
                "Year: 225 Earth days",
            ],
        },
        {
            name: "Earth",
            diameter: 12756,
            distance: 150,
            color: 0x0080ff,
            size: 1.3,
            texture: "/planets/2k_earth_daymap.jpg",
            facts: [
                "Only planet known to harbor life",
                "70% water surface",
                "One moon (Luna)",
                "Year: 365.25 days",
                "Day: 24 hours",
            ],
        },
        {
            name: "Mars",
            diameter: 6792,
            distance: 228,
            color: 0xff4500,
            size: 1.0,
            texture: "/planets/2k_mars.jpg",
            facts: [
                "Known as the Red Planet",
                "Has the largest volcano in solar system",
                "Two small moons",
                "Year: 687 Earth days",
                "Thin atmosphere",
            ],
        },
        {
            name: "Jupiter",
            diameter: 142984,
            distance: 779,
            color: 0xffd700,
            size: 3.0,
            texture: "/planets/2k_jupiter.jpg",
            facts: [
                "Largest planet in our solar system",
                "Gas giant with Great Red Spot",
                "92 known moons",
                "Has rings",
                "Year: 12 Earth years",
            ],
        },
        {
            name: "Saturn",
            diameter: 120536,
            distance: 1434,
            color: 0xffa500,
            size: 2.8,
            texture: "/planets/2k_saturn.jpg",
            facts: [
                "Known for its prominent ring system",
                "Less dense than water",
                "83 known moons",
                "Has hexagonal storm at north pole",
                "Year: 29 Earth years",
            ],
        },
        {
            name: "Uranus",
            diameter: 51118,
            distance: 2873,
            color: 0x00ffff,
            size: 2.0,
            texture: "/planets/2k_uranus.jpg",
            facts: [
                "Rotates on its side (98 degrees)",
                "Ice giant with faint rings",
                "27 known moons",
                "Coldest planetary atmosphere",
                "Year: 84 Earth years",
            ],
        },
        {
            name: "Neptune",
            diameter: 49528,
            distance: 4495,
            color: 0x4169e1,
            size: 2.0,
            texture: "/planets/2k_neptune.jpg",
            facts: [
                "Windiest planet (hurricane-force winds)",
                "Deep blue color from methane",
                "14 known moons",
                "Has Great Dark Spot",
                "Year: 165 Earth years",
            ],
        },
    ]

    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize Three.js
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        rendererRef.current = renderer

        const scene = new THREE.Scene()
        scene.background = null
        sceneRef.current = scene

        // Camera setup - adjusted for larger planet
        const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000)
        camera.position.set(0, 0, 18) // Move back so 3x planet fits but stays large
        camera.lookAt(0, 0, 0) // Look directly at planet center
        cameraRef.current = camera

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)

        // Texture loader
        const textureLoader = new THREE.TextureLoader()
        textureLoaderRef.current = textureLoader

        return () => {
            // Cleanup
            if (rendererRef.current) {
                rendererRef.current.dispose()
            }
        }
    }, [])

    useEffect(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current)
            return

        const renderer = rendererRef.current
        const scene = sceneRef.current
        const camera = cameraRef.current

        // Clear previous objects
        const objectsToRemove = []
        scene.children.forEach((child) => {
            if (child !== camera && child.type !== "AmbientLight") {
                objectsToRemove.push(child)
            }
        })
        objectsToRemove.forEach((obj) => scene.remove(obj))

        // Get current planet
        const currentPlanet = planets[selectedPlanet]

        // Create planet - bigger size for more impressive view
        const radius = 6.6 // 3x bigger than before (was 2.2)
        const geometry = new THREE.SphereGeometry(radius, 64, 64)

        let material
        if (currentPlanet.texture && textureLoaderRef.current) {
            try {
                const texturePath = currentPlanet.texture.startsWith("/")
                    ? currentPlanet.texture
                    : "/" + currentPlanet.texture
                const texture = textureLoaderRef.current.load(
                    texturePath,
                    () => {
                        // Update size and re-render after texture loads
                        if (updateRendererSizeRef.current)
                            updateRendererSizeRef.current()
                        renderer.render(scene, camera)
                    },
                    (progress) => {
                        // console.log("📊 Loading progress for", currentPlanet.name, progress)
                    },
                    (error) => {
                        console.error(
                            "Texture failed to load for",
                            currentPlanet.name,
                            error
                        )
                        // Force re-render with fallback color
                        renderer.render(scene, camera)
                    }
                )

                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: false,
                })
                texture.colorSpace = THREE.SRGBColorSpace // Correct color space
            } catch (error) {
                console.warn(
                    `Failed to load texture for ${currentPlanet.name}:`,
                    error
                )
                material = new THREE.MeshBasicMaterial({
                    color: currentPlanet.color,
                    transparent: false,
                })
            }
        } else {
            material = new THREE.MeshBasicMaterial({
                color: currentPlanet.color,
                transparent: false,
            })
        }

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0) // Centered, camera adjusts for aspect ratio

        scene.add(mesh)

        // Add rotation animation
        const animate = () => {
            mesh.rotation.y += 0.005
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        // Add Saturn's rings if this is Saturn
        if (currentPlanet.name === "Saturn") {
            // Create ring geometry scaled for compact planet size
            const ringGeometry = new THREE.RingGeometry(3.0, 4.5, 64)

            // Try to load ring texture, fallback to procedural rings
            let ringMaterial
            try {
                const ringTexture = textureLoaderRef.current.load(
                    "/planets/2k_saturn_ring_alpha.png"
                )
                ringMaterial = new THREE.MeshBasicMaterial({
                    map: ringTexture,
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.DoubleSide,
                })
            } catch (error) {
                // Fallback: create gradient-like rings
                ringMaterial = new THREE.MeshBasicMaterial({
                    color: 0xc4a484,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide,
                })
            }

            const rings = new THREE.Mesh(ringGeometry, ringMaterial)
            rings.rotation.x = Math.PI / 2 // Rotate to be horizontal
            rings.rotation.z = 0.1 // Slight tilt for realism
            rings.position.set(0, 0, 0) // Same position as planet
            scene.add(rings)
        }

        // Force size update after rendering
        if (updateRendererSizeRef.current) {
            updateRendererSizeRef.current()
        }
    }, [selectedPlanet])

    // Update canvas size and camera aspect ratio after layout
    useLayoutEffect(() => {
        if (!updateRendererSizeRef.current) return

        // Initial update after layout
        updateRendererSizeRef.current()

        // Update on window resize
        const handleResize = () => {
            if (updateRendererSizeRef.current) {
                updateRendererSizeRef.current()
            }
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div className="flex-1 w-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                className="w-full h-full max-w-full max-h-full"
                style={{
                    display: "block",
                    background: "transparent",
                }}
            />
        </div>
    )
}

export default PlanetViewer
