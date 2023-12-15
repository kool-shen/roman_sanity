import styles from "./menu.module.css"
import Link from "next/link"

export default function Menu() {
  return (
    <div className={styles.mainContainer}>
    <Link href={"/"}>
    <h1>roman cadre</h1>
    </Link>
    <Link href={"/archi"}>
    <h1>architecture</h1>
    </Link>
    <Link href={"/photo"}>
    <h1>photographie</h1>
    </Link>
    <Link href={"/contact"}>
    <h1>contact</h1>
    </Link>
    </div>
  )
}
