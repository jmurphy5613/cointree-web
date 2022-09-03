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
            <h3 className={styles.subtitle}>CoinTree</h3>
            <div>
                <a href="/">Home</a>
                <a href='/search' style={{ marginLeft: '1rem' }}>Search</a>
                <a href='/companies' style={{ marginLeft: '1rem' }}>Companies</a>
                <a href='/deposit' style={{ marginLeft: '1rem' }}>Deposit</a>
            </div>
            <h2 className={styles.wallet}>{wallet.substring(0, 7)}...</h2>
        </div>
    )
}

export default Navbar