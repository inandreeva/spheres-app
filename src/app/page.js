"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PlanetViewer from "@/components/PlanetViewer"

// Planet data for information display
const planets = [
    {
        name: "Mercury",
        diameter: 4879,
        distance: 58,
        size: 0.8,
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
        size: 1.2,
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
        size: 1.3,
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
        size: 1.0,
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
        size: 3.0,
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
        size: 2.8,
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
        size: 2.0,
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
        size: 2.0,
        facts: [
            "Windiest planet (hurricane-force winds)",
            "Deep blue color from methane",
            "14 known moons",
            "Has Great Dark Spot",
            "Year: 165 Earth years",
        ],
    },
]

export default function Home() {
    // Currently selected planet
    const [selectedPlanet, setSelectedPlanet] = useState(0) // Start with Mercury

    const currentPlanet = planets[selectedPlanet]

    return (
        <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-transparent">
            {/* Planet Selection */}
            <Card className="w-full max-w-4xl p-3 mb-2 bg-transparent border-none shadow-none">
                <div className="flex flex-col gap-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-1">
                            Solar System Explorer
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Click on planets to learn more about them
                        </p>
                    </div>

                    {/* Planet Buttons */}
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
                        {planets.map((planet, index) => (
                            <Button
                                key={planet.name}
                                variant={
                                    selectedPlanet === index
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedPlanet(index)}
                                className="text-xs h-7 px-2"
                            >
                                {planet.name}
                            </Button>
                        ))}
                    </div>

                    {/* 3D Planet Viewer Component */}
                    <div className="w-full mt-4">
                        <PlanetViewer selectedPlanet={selectedPlanet} />
                    </div>

                    {/* Planet Information (without facts list) */}
                    <div className="mt-4 pt-3">
                        <div className="text-center space-y-3">
                            <h2 className="text-xl font-bold">
                                {currentPlanet.name}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {currentPlanet.diameter.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Diameter (km)
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {currentPlanet.distance}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Distance (M km)
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {currentPlanet.size.toFixed(1)}x
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Relative Size
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </main>
    )
}
