import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Typed from 'react-typed'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <h3 className={styles.subtitle}>Cointree</h3>
        <h1 className={styles.title}>
          Outsource carbon offsets using blockchain on {` `}
          <span className={styles.typed}>
            <Typed 
              strings={['Polygon', 'Ethereum', 'Bitcoin']}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </span>
        </h1>
        <button className={styles["connect-wallet"]}>Connect Wallet</button>
      </div>

    </div>
  )
}

export default Home
