import styles from '../styles/App.module.css'
import Navbar from '../components/navbar';

const App = () => {

    const nftTransaction = {
        "id": "5",
        "block": "170384",
        "description": "Bought an electric vehicle",
        "amount": "100",
        "date": "2021-09-13",
        "company": "Tesla",
    }

    return (
        <>     
            <Navbar />   
            <div className={styles.container}>
                <h1 className={styles.title}>Live Feed</h1>
                <div className={styles.transaction}>
                    <h3 className={styles.block}>{nftTransaction.block}</h3>
                    <h3 className={styles.company}>{nftTransaction.company}</h3>
                    <h3 className={styles.amount}>${nftTransaction.amount}</h3>
                    <h3 className={styles.date}>{nftTransaction.date}</h3>
                </div>
            </div>
        </>

    )
}

export default App;