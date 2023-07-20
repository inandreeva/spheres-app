"use client"
import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function Home() {
    // Set initial count to 1
    const [count, setCount] = useState(1)
    // Function to increase the count
    const increment = () => {
        if (count < 9) {
            setCount((prevCount) => prevCount + 1)
        }
    }
    // Function to decrease the count
    const decrement = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1)
        }
    }
    // Reference to canvas DOM element
    const canvasRef = useRef(null)

    useEffect(() => {
        // Creating the scene
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        const fov = 75
        const aspect = window.innerWidth / window.innerHeight
        const near = 0.1
        const far = 1000
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.z = 30
        const scene = new THREE.Scene()

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", onWindowResize, false)

        // Creating the sphere
        const radius = 1.5
        const widthSegments = 32
        const heightSegments = 32
        const sphereGeometry = new THREE.SphereGeometry(
            radius,
            widthSegments,
            heightSegments
        )
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x3f7b9d })

        // Remove all previous spheres
        while (scene.children.length > 0) {
            scene.remove(scene.children[0])
        }

        // Draw spheres according to count
        for (let i = 0; i < count; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            // Space position 3x3
            sphere.position.y = -(Math.floor(i / 3) * 5)
            sphere.position.x = ((i % 3) - 1) * 5
            // Add sphere
            scene.add(sphere)
        }

        renderer.render(scene, camera)
        return () => window.removeEventListener("resize", onWindowResize, false)
    }, [count])

    return (
        <main className="flex flex-col items-center p-24">
            <div className="flex items-center">
                <button className="p-8 text-5xl" onClick={decrement}>
                    -
                </button>
                <div className="p-6 text-3xl border rounded-md">
                    <span id="counter">{count}</span>
                </div>
                <button className="p-8 text-5xl" onClick={increment}>
                    +
                </button>
            </div>

            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </main>
    )
}
