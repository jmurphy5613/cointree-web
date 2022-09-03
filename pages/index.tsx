import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Typed from 'react-typed'
import { useState } from 'react'
import { useRouter } from 'next/router'

declare var window:any

const Home: NextPage = () => {

  const router = useRouter()

  const [walletConnected, setWalletConnected] = useState(false)

  const connectWallet = async () => {
    console.log('hey')
    if(!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    let provider = window.ethereum;
    if(typeof provider != 'undefined') {
      await provider.request({ method: 'eth_requestAccounts' }).then(async() => {
        setWalletConnected(true);
      })
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <h3 className={styles.subtitle}>Cointree</h3>
        <h1 className={styles.title}>
          Outsource carbon offsets using blockchain on {` `}
          <span className={styles.typed}>
            <Typed 
              strings={['Polygon', 'Ethereum']}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </span>
        </h1>
        {walletConnected ? <button className={styles["connect-wallet"]} onClick={() => router.push('/livefeed')}>Open App</button> : <button className={styles["connect-wallet"]} onClick={connectWallet}>Connect Wallet</button>}
      </div>

    </div>
  )
}

export default Home
