import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import styles from '../styles/Authorize.module.css'
import { ethers } from "ethers"
import { vaultAddress } from "../utils/addresses"
import Vault from "../public/Vault.json"
import NFTContract from '../public/CoinTreeNFT.json'
import { nftMarketAddress } from "../utils/addresses"
import { jobImage } from "../utils/images"


declare var window:any

type job = {
    amount: string,
    wallet: string,
    jobDescription: string,
    id: number
}

const Authorize = () => {

    const [currentCompany, setCurrentCompany] = useState<string>()
    const [approvedJobs, setApprovedJobs] = useState<Array<job>>([{amount: '0', wallet: '0', jobDescription: '0', id: 0}])
    const [jobIndex, setJobIndex] = useState<number>(0)

    useEffect(() => {
        // axios.get('https://jobs-cointree.herokuapp.com/job/get-all').then((e) => {
        //     setApprovedJobs(e.data)
        // })
        setApprovedJobs([
            {
                amount: '0.05',
                wallet: '0x760008c96E2B9fEf761A1d33013DEf4DB1469771',
                jobDescription: 'Solar Panel Installation',
                id: 0
            },
            {
                amount: '0.03',
                wallet: '0x760008c96E2B9fEf761A1d33013DEf4DB1469771',
                jobDescription: 'Bought Electric Vehicle',
                id: 1
            },
            {
                amount: '0.01',
                wallet: '0x760008c96E2B9fEf761A1d33013DEf4DB1469771',
                jobDescription: 'Bought Electric Vehicle',
                id: 2
            }
        ])
        getRandomCompany()
    }, [])

    const getRandomCompany = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)
        const companies = await contract.getCompanies()

        for(const company of companies) {
            const address = await contract.getCompanyAddress(company)
            if(address.toLowerCase() === window.ethereum.selectedAddress.toLowerCase()) {
                setCurrentCompany(company)
                console.log(company)
                break
            }
        }

    }

    const mint = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftMarketAddress, NFTContract.abi, signer)
        const description = `This is a reward for ${approvedJobs[jobIndex].jobDescription} provide by ${currentCompany}. All powered by the polygon POS network.`
        const image = jobImage(approvedJobs[jobIndex].jobDescription)
        const to = approvedJobs[jobIndex].wallet
        await contract.mint(to, description, image, currentCompany)
    }

    const createTransaction = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaultAddress, Vault.abi, signer)
        
        contract.distribute('hi', approvedJobs[jobIndex].wallet, {value: ethers.utils.parseEther(approvedJobs[jobIndex].amount)})
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Validating As {currentCompany}</h1>
                <div className={styles["content-container"]}>
                    <h1 className={styles.header}>Price: {approvedJobs[jobIndex].amount}</h1>
                    <h1 className={styles.header}>Wallet: {approvedJobs[jobIndex].wallet}</h1>
                    <h1 className={styles.header}>Job Description: {approvedJobs[jobIndex].jobDescription}</h1>
                </div>
                <div className={styles["button-container"]}>
                    <button className={styles.reject} onClick={() => {
                        // axios.post(`https://jobs-cointree.herokuapp.com/job/delete/${approvedJobs[jobIndex].id}`)
                        setJobIndex(jobIndex + 1)
                    }}>Reject</button>
                    <button className={styles.accept} onClick={() => {
                        // axios.post(`https://jobs-cointree.herokuapp.com/job/delete/${approvedJobs[jobIndex].id}`)
                        // setJobIndex(jobIndex + 1)
                        setJobIndex(jobIndex + 1)
                        createTransaction()
                        mint()
                    }}>Accept</button>
                </div>
            </div>
        </>

    )
}

export default Authorize