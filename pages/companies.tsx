import styles from '../styles/Companies.module.css'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { vaultAddress } from '../utils/addresses'
import Vault from '../public/Vault.json'


declare var window:any


const Companies = () => {

    // const companies = [
    //     {
    //         name: 'Google',
    //         balance: '90'
    //     },
    // ]

    const [searchValue, setSearchValue] = useState('')
    const [companies, setCompanies] = useState<Array<string>>([])
    const [balances, setBalances] = useState<Array<string>>([])
    const [accountBalance, setAccountBalance] = useState<string>()
    const [currentMaticPrice, setCurrenctMaticPrice] = useState<number>(0)

    useEffect(() => {
        if(!window.ethereum) {
            return;
        }
        getAccountBalance()
        getCompanies()
        getCurrentEtherPrice()
    }, [])

    const getCompanies = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)
        const companies = await contract.getCompanies()
        setCompanies(companies)
        await getCompanyBalances(companies)
    }

    const getCompanyBalances = async (companies:string) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)

        const tempBalances = []
        for(const company of companies) {
            const balance = await contract.getBalanceByName(company)
            let balanceString = ethers.utils.formatEther(balance.toString())
            tempBalances.push(balanceString)
        }
        setBalances(tempBalances)
    }

    const getAccountBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)

        const balance = await contract.getContractBalance()
        setAccountBalance(ethers.utils.formatEther(balance))
    }

    const getCurrentEtherPrice = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        const data = await response.json()
        setCurrenctMaticPrice(data.ethereum.usd)
    }

    const filteredCompanies = companies.filter((company) => {
        return company.toLowerCase().includes(searchValue.toLowerCase())
    })

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>{accountBalance} Ether Locked</h1>
                <input onChange={(e) => setSearchValue(e.target.value)} className={styles.input} placeholder='Company' />
                <div className={styles.grid}>
                    {filteredCompanies.map((company, index) => {
                        return (
                            <div key={index} className={styles["grid-item"]}>
                                <h1 className={styles.name}>{company}</h1>
                                <h2 className={styles.bal}>${parseFloat(balances[index])*currentMaticPrice}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Companies