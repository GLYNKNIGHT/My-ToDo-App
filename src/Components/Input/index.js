import styles from '../App/App.module.css'

export default function Input ({onChange}){
return <input className={styles.input} type="text" placeholder="New Task" onInput={onChange}/>

}