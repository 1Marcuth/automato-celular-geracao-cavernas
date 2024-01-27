import { FC, useEffect, useState, useRef } from "react"
import CaveGenerator from "../../utils/canve-generator"

import styles from "./style.module.scss"

const Canvas: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (!canvas || !ctx) return

        canvas.width = 1280
        canvas.height = 720

        const caveNoise = CaveGenerator.generate({
            seed: 123,
            height: 720,
            width: 1280,
            density: .43,
            iterations: 10
        })

        for (let i = 0; i < caveNoise.length; i++) {
            for (let j = 0; j < caveNoise[i].length; j++) {
                const color = caveNoise[i][j] === 0 ? "#fff" : "#000"
                ctx.fillStyle = color
                ctx.fillRect(i, j, 1, 1)
            }
        }
    }, [canvasRef])

    return (
        <div className={styles["canvas-container"]}>
            <canvas ref={canvasRef}>

            </canvas>
        </div>
    )
}

export default Canvas