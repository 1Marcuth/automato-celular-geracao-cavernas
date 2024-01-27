import { FC } from "react"

import Canvas from "../../components/canvas"

import styles from "./style.module.scss"

const HomePage: FC = () => {
    return (
        <div className={styles["home-page"]}>
            <Canvas/>
        </div>
    )
}

export default HomePage