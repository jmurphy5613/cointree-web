import styles from '../styles/Navbar.module.css'
import { useEffect, useState } from 'react'

declare var window:any

const Navbar = () => {

    const [wallet, setWallet] = useState('')

    useEffect(() => {
        window.ethereum.request({method:'eth_requestAccounts'}).then((res:any) => {
            setWallet(res[0])
        })
    }, [])

    return (
        <div className={styles.container}>
            <h3 className={styles.subtitle}>Cointree</h3>
            <div>
                <a href='/search'>Companies</a>
            </div>
            <h2 className={styles.wallet}>{wallet}</h2>
        </div>
    )
}

export default Navbar