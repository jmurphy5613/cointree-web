import styles from '../styles/Deposit.module.css'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { ethers } from 'ethers'


declare var window:any

const contractAddress = "0x335900Cc7c964b56a2F2550b61C33BDb7adD7dd7"

const Deposit = () => {

    const [amount, setAmount] = useState(0)

    const createTransaction = async () => {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(contractAddress);
            const stringAmount = amount.toString()
            const tx = await signer.sendTransaction({
                to: contractAddress,
                value: ethers.utils.parseEther(stringAmount)
            });
            console.log({ amount, contractAddress });
            console.log("tx", tx);
    } 

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Deposit</h1>
                <div className={styles.form}>
                    <input className={styles.input} type="text" placeholder="Company Name" />
                    <input onChange={(e) => {
                        setAmount(e.target.value)
                    }} className={styles.input} type="text" placeholder="Amount" />
                    <button onClick={createTransaction} className={styles.button}>Transfer</button>
                </div>
            </div>
        </>
    )
}

export default Deposit