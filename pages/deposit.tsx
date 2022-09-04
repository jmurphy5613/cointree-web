import styles from '../styles/Deposit.module.css'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { ethers } from 'ethers'
import Vault from '../public/Vault.json'
import { vaultAddress } from '../utils/addresses'

declare var window:any


const Deposit = () => {

    const [amount, setAmount] = useState(0)
    const [companyName, setCompanyName] = useState('')

    const deposit = async () => {
        if(!window.ethereum) {
            alert('Please install MetaMask')
            return
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)

        contract.createCompany(companyName, {value: ethers.utils.parseEther(amount.toString())})
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Deposit</h1>
                <div className={styles.form}>
                    <input className={styles.input} onChange={(e) => {
                        setCompanyName(e.target.value)
                    }} type="text" placeholder="Company Name" />
                    <input onChange={(e) => {
                        setAmount(e.target.value)
                    }} className={styles.input} type="text" placeholder="Amount" />
                    <button onClick={deposit} className={styles.button}>Transfer</button>
                </div>
            </div>
        </>
    )
}

export default Deposit