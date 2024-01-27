import PRNG from "./prng"

type CaveGeneratorProps = {
    seed: number
    width: number
    height: number
    density: number
    iterations: number
}

type CaveMap = number[][]

class CaveGenerator {
    public props: CaveGeneratorProps
    private prng: PRNG

    private constructor(props: CaveGeneratorProps) {
        this.props = props
        this.prng = new PRNG(this.props.seed)
    }

    public static generate(props: CaveGeneratorProps): CaveMap {
        const generator = new CaveGenerator(props)
        const { iterations } = generator.props

        const caveMap = generator.generateInitialMap()

        for (let i = 0; i < iterations; i++) {
            generator.iterateMap(caveMap)
        }

        return caveMap
    }

    private generateInitialMap(): CaveMap {
        const { width, height, density } = this.props
        const caveMap: CaveMap = [];

        for (let x = 0; x < width; x++) {
            caveMap[x] = [];
            for (let y = 0; y < height; y++) {
                let xyz = this.prng.next()
                caveMap[x][y] = xyz < density ? 0 : 1
            }
        }

        return caveMap
    }

    private iterateMap(caveMap: CaveMap): void {
        const { width, height } = this.props

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const wallCount = this.getNeighborsWalls(caveMap, x, y)
                caveMap[x][y] = wallCount > 4 ? 1 : 0
            }
        }
    }

    private getNeighborsWalls(cavesMap: CaveMap, x: number, y: number) {
        const { width, height } = this.props
        let wallCount = 0

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i !== x || j !== y) {
                    if (x + i < 0 || y + j < 0 || x + i >= width || y + j >= height) {
                        wallCount++
                    } else {
                        wallCount += cavesMap[x + i][y + j] ? 1 : 0
                    }
                }
            }
        }

        return wallCount
    }
}

export default CaveGenerator