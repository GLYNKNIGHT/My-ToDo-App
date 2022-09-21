import styles from '../App/App.module.css'

export default function List ({children}) {
    return <ul className={styles.list}>{children}</ul>
}