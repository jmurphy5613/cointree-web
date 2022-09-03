import styles from '../styles/ItemProfile.module.css'
import Navbar from '../components/navbar'


const ItemProfile = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles["main-content"]}>
                    <div className={styles.image} />
                    <div className={styles.info}>
                        <h3 className={styles.subtitle}>Tesla</h3>
                        <h1 className={styles.title}>Buying an Electric Vehicle <span style={{ color: '#0070f3' }}>#1567</span></h1>
                        <h4 className={styles.description}>This NFT was rewarded to anyone that bought and electric vehicle. This bounty was sponsored by Tesla and verrified on the Polygon POS blockchain.</h4>
                        <button className={styles["view-on-opensea"]}>View on OpenSea</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ItemProfile